export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: {
    address: string
    city: string
    state: string
    zipCode: string
    country: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  details: {
    bedrooms: number
    bathrooms: number
    sqft: number
    yearBuilt?: number
    lotSize?: number
    propertyType: PropertyType
  }
  features: string[]
  images: PropertyImage[]
  virtualTour?: {
    url: string
    type: 'video' | '3d' | 'vr'
  }
  agent: Agent
  status: PropertyStatus
  aiScore: number
  createdAt: Date
  updatedAt: Date
}

export interface PropertyImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  order: number
}

export type PropertyType = 
  | 'house'
  | 'apartment'
  | 'condo'
  | 'villa'
  | 'townhouse'
  | 'land'
  | 'commercial'

export type PropertyStatus = 
  | 'for-sale'
  | 'for-rent'
  | 'sold'
  | 'rented'
  | 'pending'
  | 'off-market'

export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  bio?: string
  rating: number
  reviewCount: number
  propertiesListed: number
  verified: boolean
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'buyer' | 'seller' | 'agent' | 'admin'
  preferences?: UserPreferences
  savedProperties: string[]
  viewHistory: string[]
  createdAt: Date
}

export interface UserPreferences {
  propertyTypes: PropertyType[]
  priceRange: {
    min: number
    max: number
  }
  locations: string[]
  minBedrooms?: number
  minBathrooms?: number
  features: string[]
}

export interface SearchFilters {
  query?: string
  propertyType?: PropertyType
  priceMin?: number
  priceMax?: number
  bedrooms?: number
  bathrooms?: number
  sqftMin?: number
  sqftMax?: number
  location?: string
  features?: string[]
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'ai-score'
}

export interface MarketData {
  city: string
  state: string
  averagePrice: number
  medianPrice: number
  priceChange: number
  averageDaysOnMarket: number
  totalListings: number
  soldLastMonth: number
  demandScore: number
  trendDirection: 'up' | 'down' | 'stable'
}

export interface AIAnalysis {
  propertyId: string
  score: number
  insights: {
    pricing: {
      suggested: number
      marketAverage: number
      confidence: number
    }
    demand: {
      level: 'low' | 'medium' | 'high'
      score: number
    }
    investment: {
      roi: number
      risk: 'low' | 'medium' | 'high'
      timeframe: string
    }
  }
  recommendations: string[]
  generatedAt: Date
}

export interface VirtualTour {
  id: string
  propertyId: string
  title: string
  duration: number
  views: number
  thumbnail: string
  scenes: TourScene[]
  aiGuideEnabled: boolean
  vrCompatible: boolean
}

export interface TourScene {
  id: string
  name: string
  description: string
  imageUrl: string
  hotspots: Hotspot[]
  order: number
}

export interface Hotspot {
  id: string
  position: { x: number; y: number; z: number }
  type: 'info' | 'navigation' | 'feature'
  content: string
  targetSceneId?: string
}

export interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
  metadata?: {
    propertyId?: string
    intent?: string
    confidence?: number
  }
}

export interface Notification {
  id: string
  userId: string
  type: 'property-update' | 'price-change' | 'new-match' | 'tour-scheduled'
  title: string
  message: string
  read: boolean
  actionUrl?: string
  createdAt: Date
}
