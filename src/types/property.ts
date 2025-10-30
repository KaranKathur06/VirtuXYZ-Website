// Property types for UAE Housing Search API integration

export interface UAEProperty {
  id: string
  title: string
  description?: string
  price: number
  currency: string
  location: {
    city: string
    area?: string
    address?: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  propertyType: string
  bedrooms: number
  bathrooms: number
  area: number
  areaUnit: string
  images: string[]
  features?: string[]
  amenities?: string[]
  furnished?: boolean
  listingType: 'sale' | 'rent'
  agentInfo?: {
    name: string
    phone?: string
    email?: string
  }
  datePosted?: string
  externalUrl?: string
}

export interface PropertyFilters {
  city?: string
  propertyType?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  minArea?: number
  maxArea?: number
  listingType?: 'sale' | 'rent'
  searchQuery?: string
}

export interface PropertySearchResponse {
  properties: UAEProperty[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export interface PropertyCardProps {
  property: UAEProperty
  viewMode?: 'grid' | 'list'
  onFavorite?: (id: string) => void
  isFavorite?: boolean
}
