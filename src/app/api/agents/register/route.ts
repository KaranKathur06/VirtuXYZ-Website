import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { Resend } from 'resend'

import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function generatePassword(length = 16) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*'
  let out = ''
  const bytes = crypto.randomBytes(length)
  for (let i = 0; i < length; i++) out += alphabet[bytes[i] % alphabet.length]
  return out
}

function getEnvList(value: string | undefined) {
  return (value ?? '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const firstName = String(formData.get('firstName') ?? '').trim()
    const middleName = String(formData.get('middleName') ?? '').trim()
    const lastName = String(formData.get('lastName') ?? '').trim()
    const phoneNumber = String(formData.get('phoneNumber') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim().toLowerCase()
    const companyName = String(formData.get('companyName') ?? '').trim()
    const photo = formData.get('profilePhoto')

    if (!firstName || !lastName || !phoneNumber || !email || !companyName) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
    }

    if (!(photo instanceof File)) {
      return NextResponse.json({ error: 'Profile photo is required.' }, { status: 400 })
    }

    const maxBytes = Number(process.env.UPLOAD_MAX_BYTES ?? '5242880')
    if (!Number.isFinite(maxBytes) || maxBytes <= 0) {
      return NextResponse.json({ error: 'Upload configuration error.' }, { status: 500 })
    }

    const allowedMimeTypes = getEnvList(process.env.UPLOAD_ALLOWED_MIME_TYPES)
    if (allowedMimeTypes.length > 0 && !allowedMimeTypes.includes(photo.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only JPG/PNG allowed.' }, { status: 400 })
    }

    if (photo.size > maxBytes) {
      return NextResponse.json({ error: 'File too large.' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email already registered.' }, { status: 409 })
    }

    const uploadDir = process.env.UPLOAD_DIR ?? 'public/uploads'
    const absoluteUploadDir = path.join(process.cwd(), uploadDir)
    await fs.mkdir(absoluteUploadDir, { recursive: true })

    const originalExt = path.extname(photo.name || '')
    const safeExt = originalExt && originalExt.length <= 10 ? originalExt : photo.type === 'image/png' ? '.png' : '.jpg'
    const fileName = `${crypto.randomUUID()}${safeExt}`

    const arrayBuffer = await photo.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const absoluteFilePath = path.join(absoluteUploadDir, fileName)
    await fs.writeFile(absoluteFilePath, buffer)

    const profilePhotoUrl = `/${uploadDir.replace(/^public\//, '').replace(/^public\\/, '').replace(/\\/g, '/')}/${fileName}`

    const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ')

    const password = generatePassword(18)
    const passwordHash = await bcrypt.hash(password, 12)

    let slugBase = slugify(`${firstName}-${lastName}`)
    if (!slugBase) slugBase = crypto.randomUUID()

    let slug = slugBase
    for (let i = 0; i < 5; i++) {
      const exists = await prisma.agentProfile.findUnique({ where: { slug } })
      if (!exists) break
      slug = `${slugBase}-${crypto.randomBytes(2).toString('hex')}`
    }

    const user = await prisma.user.create({
      data: {
        name: fullName,
        email,
        role: 'AGENT',
        passwordHash,
        agentProfile: {
          create: {
            firstName,
            middleName: middleName || null,
            lastName,
            phoneNumber,
            companyName,
            profilePhotoUrl,
            slug,
            status: 'PENDING',
          },
        },
      },
      include: { agentProfile: true },
    })

    const resendKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL

    if (resendKey && fromEmail) {
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: 'Your VirtuXYZ Agent Portal Credentials',
        text: `Hi ${firstName},\n\nYour VirtuXYZ agent account has been created.\n\nLogin email: ${email}\nTemporary password: ${password}\n\nLogin here: ${process.env.AGENT_LOGIN_URL ?? 'https://virtuxyz.com/agent-portal'}\n\nStatus: PENDING approval\n\n- VirtuXYZ`,
      })
    }

    return NextResponse.json({
      ok: true,
      agent: {
        id: user.agentProfile?.id,
        slug: user.agentProfile?.slug,
        status: user.agentProfile?.status,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Registration failed.' }, { status: 500 })
  }
}
