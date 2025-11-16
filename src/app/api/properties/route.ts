import { NextRequest, NextResponse } from 'next/server'

// Secure API proxy for UAE Housing Search API
// This keeps the API key on the server side

// Force dynamic rendering - this route uses searchParams
export const dynamic = 'force-dynamic';

const UAE_HOUSING_API_BASE = 'https://zylalabs.com/api/6111/uae+housing+search+api'
const API_KEY = process.env.UAE_HOUSING_API_KEY

export async function GET(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // Extract query parameters
    const searchParams = request.nextUrl.searchParams
    const city = searchParams.get('city')
    const propertyType = searchParams.get('propertyType')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const bedrooms = searchParams.get('bedrooms')
    const bathrooms = searchParams.get('bathrooms')
    const listingType = searchParams.get('listingType')
    const searchQuery = searchParams.get('searchQuery')
    const page = searchParams.get('page') || '1'
    const pageSize = searchParams.get('pageSize') || '12'

    // Build API URL with query parameters
    const apiUrl = new URL(`${UAE_HOUSING_API_BASE}/search`)
    
    if (city) apiUrl.searchParams.append('city', city)
    if (propertyType) apiUrl.searchParams.append('property_type', propertyType)
    if (minPrice) apiUrl.searchParams.append('min_price', minPrice)
    if (maxPrice) apiUrl.searchParams.append('max_price', maxPrice)
    if (bedrooms) apiUrl.searchParams.append('bedrooms', bedrooms)
    if (bathrooms) apiUrl.searchParams.append('bathrooms', bathrooms)
    if (listingType) apiUrl.searchParams.append('listing_type', listingType)
    if (searchQuery) apiUrl.searchParams.append('query', searchQuery)
    apiUrl.searchParams.append('page', page)
    apiUrl.searchParams.append('page_size', pageSize)

    // Make request to UAE Housing Search API
    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('UAE Housing API Error:', errorText)
      
      // Return mock data as fallback for development
      return NextResponse.json({
        properties: generateMockProperties(),
        total: 50,
        page: parseInt(page),
        pageSize: parseInt(pageSize),
        hasMore: true,
        isMockData: true
      })
    }

    const data = await response.json()
    
    // Transform API response to our format
    const transformedData = {
      properties: transformProperties(data.results || data.properties || []),
      total: data.total || data.count || 0,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      hasMore: data.has_more || data.hasMore || false,
      isMockData: false
    }

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Properties API Error:', error)
    
    // Return mock data as fallback
    return NextResponse.json({
      properties: generateMockProperties(),
      total: 50,
      page: 1,
      pageSize: 12,
      hasMore: true,
      isMockData: true,
      error: 'Using mock data - API unavailable'
    })
  }
}

// Transform API response to our property format
function transformProperties(apiProperties: any[]): any[] {
  return apiProperties.map((prop: any) => ({
    id: prop.id || prop.listing_id || Math.random().toString(36).substr(2, 9),
    title: prop.title || prop.name || 'Property in UAE',
    description: prop.description || prop.details || '',
    price: parseFloat(prop.price || prop.amount || 0),
    currency: prop.currency || 'AED',
    location: {
      city: prop.city || prop.location?.city || 'Dubai',
      area: prop.area || prop.location?.area || prop.neighborhood,
      address: prop.address || prop.location?.address,
      coordinates: prop.coordinates || prop.location?.coordinates
    },
    propertyType: prop.property_type || prop.type || 'Apartment',
    bedrooms: parseInt(prop.bedrooms || prop.beds || 0),
    bathrooms: parseInt(prop.bathrooms || prop.baths || 0),
    area: parseFloat(prop.area_sqft || prop.size || prop.area_size || 0),
    areaUnit: prop.area_unit || 'sqft',
    images: prop.images || prop.photos || [prop.image] || [],
    features: prop.features || prop.amenities || [],
    amenities: prop.amenities || [],
    furnished: prop.furnished || false,
    listingType: prop.listing_type || prop.purpose || 'sale',
    agentInfo: prop.agent || prop.agent_info,
    datePosted: prop.date_posted || prop.created_at || prop.posted_date,
    externalUrl: prop.url || prop.external_url || prop.link
  }))
}

// Generate mock properties for development/fallback
function generateMockProperties() {
  const cities = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman']
  const areas = ['Downtown', 'Marina', 'Palm Jumeirah', 'Business Bay', 'JBR', 'Al Barsha']
  const types = ['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Studio']
  
  return Array.from({ length: 12 }, (_, i) => ({
    id: `mock-${i + 1}`,
    title: `Luxury ${types[i % types.length]} in ${areas[i % areas.length]}`,
    description: `Beautiful ${types[i % types.length].toLowerCase()} with stunning views and modern amenities. Perfect for families and professionals.`,
    price: Math.floor(Math.random() * 5000000) + 500000,
    currency: 'AED',
    location: {
      city: cities[i % cities.length],
      area: areas[i % areas.length],
      address: `${areas[i % areas.length]}, ${cities[i % cities.length]}, UAE`
    },
    propertyType: types[i % types.length],
    bedrooms: Math.floor(Math.random() * 4) + 1,
    bathrooms: Math.floor(Math.random() * 3) + 1,
    area: Math.floor(Math.random() * 3000) + 500,
    areaUnit: 'sqft',
    images: [
      `https://images.unsplash.com/photo-${1600596542815 + i * 1000}-ffad4c1539a9?w=800`,
      `https://images.unsplash.com/photo-${1600596542815 + i * 1000 + 500}-ffad4c1539a9?w=800`
    ],
    features: ['Balcony', 'Parking', 'Security', 'Gym', 'Pool'],
    amenities: ['24/7 Security', 'Swimming Pool', 'Gym', 'Parking'],
    furnished: Math.random() > 0.5,
    listingType: Math.random() > 0.5 ? 'sale' : 'rent',
    datePosted: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    externalUrl: '#'
  }))
}
