import { NextRequest, NextResponse } from 'next/server'
import { autocompleteLocation } from '@/lib/api/zylaClient'

// Map common property type words to category IDs used by the explore page
const TYPE_TO_CATEGORY: Record<string, string> = {
  apartment: '4',
  apartments: '4',
  flat: '4',
  flats: '4',
  villa: '3',
  villas: '3',
  townhouse: '16',
  townhouses: '16',
  penthouse: '14',
  penthouses: '14',
  office: '6',
  offices: '6',
  shop: '5',
  shops: '5',
}

function parsePrice(text: string): { minPrice?: number; maxPrice?: number } {
  const t = text.toLowerCase()
  const m = t.match(/(under|below|less than)\s*(\d+(?:\.\d+)?)\s*(m|million|k|thousand|aed)?/i)
  if (m) {
    const value = parseFloat(m[2])
    const unit = (m[3] || 'aed').toLowerCase()
    const factor = unit.startsWith('m') ? 1_000_000 : unit.startsWith('k') || unit.includes('thousand') ? 1_000 : 1
    return { maxPrice: Math.round(value * factor) }
  }

  const range = t.match(/(\d+(?:\.\d+)?)\s*(m|million|k|thousand)?\s*(?:to|-)\s*(\d+(?:\.\d+)?)\s*(m|million|k|thousand)?/i)
  if (range) {
    const v1 = parseFloat(range[1])
    const u1 = (range[2] || 'aed').toLowerCase()
    const f1 = u1.startsWith('m') ? 1_000_000 : u1.startsWith('k') || u1.includes('thousand') ? 1_000 : 1
    const v2 = parseFloat(range[3])
    const u2 = (range[4] || 'aed').toLowerCase()
    const f2 = u2.startsWith('m') ? 1_000_000 : u2.startsWith('k') || u2.includes('thousand') ? 1_000 : 1
    return { minPrice: Math.round(v1 * f1), maxPrice: Math.round(v2 * f2) }
  }

  const around = t.match(/around\s*(\d+(?:\.\d+)?)\s*(m|million|k|thousand)?/i)
  if (around) {
    const v = parseFloat(around[1])
    const u = (around[2] || 'aed').toLowerCase()
    const f = u.startsWith('m') ? 1_000_000 : u.startsWith('k') || u.includes('thousand') ? 1_000 : 1
    const val = Math.round(v * f)
    return { minPrice: Math.max(0, Math.round(val * 0.8)), maxPrice: Math.round(val * 1.2) }
  }

  return {}
}

function parseBedrooms(text: string): number | undefined {
  const m = text.toLowerCase().match(/(\d+)\s*(br|bed|beds|bedroom|bedrooms|bhk)/i)
  return m ? parseInt(m[1]) : undefined
}

function parsePurpose(text: string): 'for-sale' | 'for-rent' | undefined {
  const t = text.toLowerCase()
  if (t.includes('rent') || t.includes('rental') || t.includes('lease')) return 'for-rent'
  if (t.includes('buy') || t.includes('purchase') || t.includes('sale') || t.includes('for sale')) return 'for-sale'
  return undefined
}

function parseType(text: string): string | undefined {
  const t = text.toLowerCase()
  for (const key of Object.keys(TYPE_TO_CATEGORY)) {
    if (t.includes(key)) return TYPE_TO_CATEGORY[key]
  }
  return undefined
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()
    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query string required' }, { status: 400 })
    }

    const text = query.trim()
    const purpose = parsePurpose(text)
    const category = parseType(text)
    const rooms = parseBedrooms(text)
    const price = parsePrice(text)

    // Try to find a city/location via autocomplete
    let location: string | undefined
    let locationExternalID: string | undefined
    try {
      const candidates = await autocompleteLocation(text)
      if (candidates && candidates.length > 0) {
        location = candidates[0].name
        locationExternalID = candidates[0].externalID
      }
    } catch {}

    // Build explore URL
    const params = new URLSearchParams()
    if (location) params.append('location', location)
    if (purpose) params.append('purpose', purpose)
    if (category) params.append('category', category)
    if (rooms) params.append('rooms', String(rooms))
    if (price.minPrice) params.append('minPrice', String(price.minPrice))
    if (price.maxPrice) params.append('maxPrice', String(price.maxPrice))
    params.append('page', '0')
    params.append('sort', 'date-desc')

    const url = `/explore?${params.toString()}`

    const summaryParts = [] as string[]
    if (rooms) summaryParts.push(`${rooms} bedroom`)
    if (category) {
      const typeName = Object.entries(TYPE_TO_CATEGORY).find(([, id]) => id === category)?.[0] || 'properties'
      summaryParts.push(typeName.replace(/s$/, 's'))
    } else {
      summaryParts.push('properties')
    }
    if (purpose) summaryParts.push(purpose === 'for-rent' ? 'for rent' : 'for sale')
    if (location) summaryParts.push(`in ${location}`)
    if (price.maxPrice) summaryParts.push(`under AED ${price.maxPrice.toLocaleString()}`)

    const summary = summaryParts.join(' ')

    return NextResponse.json({
      success: true,
      summary,
      url,
      filters: {
        location,
        locationExternalID,
        purpose,
        category,
        rooms,
        ...price,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to parse query' }, { status: 500 })
  }
}


