'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FormEvent, useState } from 'react'

interface ComingSoonProps {
  title?: string
}

export default function ComingSoon({ title = 'Feature Launch in Progress' }: ComingSoonProps) {
  const [email, setEmail] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setEmail('')
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0E14] text-white px-6 py-20">
      {/* Gradient mesh + glow accents */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(63,255,167,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(255,159,71,0.12),_transparent_60%)]" />
        <div className="absolute -top-40 -left-20 w-80 h-80 bg-[#3FFFA7]/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-10 w-64 h-64 bg-[#FF9F47]/20 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(120deg,_rgba(255,255,255,0.15)_1px,_transparent_1px),linear-gradient(-120deg,_rgba(255,255,255,0.15)_1px,_transparent_1px)] bg-[length:140px_140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-3xl w-full text-center space-y-8"
      >
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          >
            <Image
              src="/full logo.png"
              alt="VirtuXYZ"
              width={500}
              height={500}
              priority
              className="h-24 w-auto object-contain drop-shadow-[0_18px_55px_rgba(63,255,167,0.5)]"
            />
          </motion.div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            A New Experience Is Coming
          </h1>
          <p className="text-lg md:text-xl text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
            We’re building something powerful behind the scenes. Check back soon for the full experience.
          </p>
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-block h-0.5 rounded-full bg-gradient-to-r from-[#3FFFA7] via-white to-[#FF9F47]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#3FFFA7] to-[#FF9F47] px-12 py-4 text-base font-semibold text-black shadow-[0_25px_45px_rgba(63,255,167,0.35)] transition duration-300 hover:translate-y-0.5 hover:shadow-[0_20px_50px_rgba(255,159,71,0.35)]"
          >
            Back to Home
          </Link>
        </motion.div>

        <p className="text-xs tracking-wide text-[#6B7280]">
          © 2025 VirtuXYZ – Smart Real Estate, Powered by AI
        </p>
      </motion.div>
    </div>
  )
}

