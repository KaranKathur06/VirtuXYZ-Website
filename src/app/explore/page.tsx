'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, AlertCircle, Grid3x3, List } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ParticleBackground from '@/components/effects/ParticleBackground'
import PropertyCard from '@/components/properties/PropertyCard'
import PropertyFilters from '@/components/properties/PropertyFilters'
import { UAEProperty, PropertyFilters as FilterType, PropertySearchResponse } from '@/types/property'
import toast, { Toaster } from 'react-hot-toast'

export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [properties, setProperties] = useState<UAEProperty[]>([])
  const [filters, setFilters] = useState<FilterType>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [isMockData, setIsMockData] = useState(false)

  // Fetch properties from API
  const fetchProperties = useCallback(async (currentPage: number = 1, append: boolean = false) => {
    setIsLoading(true)
    setError(null)

    try {
      // Build query parameters for new Zyla API
      const params = new URLSearchParams()
      
      // Map old filters to new API parameters
      if (filters.city || filters.searchQuery) {
        params.append('location', filters.city || filters.searchQuery || '')
      }
      
      // Map listingType to purpose
      if (filters.listingType) {
        const purpose = filters.listingType === 'sale' ? 'for-sale' : 'for-rent'
        params.append('purpose', purpose)
      }
      
      // Map propertyType to category (using common UAE property type IDs)
      if (filters.propertyType) {
        const categoryMap: Record<string, string> = {
          'Apartment': '4',
          'Villa': '3',
          'Townhouse': '16',
          'Penthouse': '14',
          'Office': '6',
          'Shop': '5',
        }
        const categoryId = categoryMap[filters.propertyType]
        if (categoryId) {
          params.append('category', categoryId)
        }
      }
      
      if (filters.minPrice) params.append('minPrice', filters.minPrice.toString())
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
      if (filters.bedrooms) params.append('rooms', filters.bedrooms.toString())
      if (filters.bathrooms) params.append('baths', filters.bathrooms.toString())
      
      params.append('page', (currentPage - 1).toString()) // Zyla API uses 0-based pages
      params.append('sort', 'date-desc')

      const response = await fetch(`/api/properties/search?${params.toString()}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch properties')
      }

      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch properties')
      }

      const data = result.data

      // Transform properties to match old format
      const transformedProperties = data.properties.map((prop: any) => ({
        id: prop.id.toString(),
        title: prop.title,
        description: prop.title,
        price: prop.price,
        currency: prop.currency,
        location: {
          city: prop.location.city,
          area: prop.location.area,
          address: `${prop.location.area}, ${prop.location.city}`,
        },
        propertyType: prop.propertyType,
        bedrooms: prop.bedrooms,
        bathrooms: prop.bathrooms,
        area: prop.area,
        areaUnit: prop.areaUnit,
        images: prop.images,
        features: prop.amenities,
        amenities: prop.amenities,
        furnished: prop.furnished === 'furnished',
        listingType: prop.listingType === 'for-sale' ? 'sale' : 'rent',
        agentInfo: prop.agency,
        datePosted: prop.datePosted,
        externalUrl: `/property/live/${prop.externalID}`,
      }))

      setProperties(append ? [...properties, ...transformedProperties] : transformedProperties)
      setTotalResults(data.total)
      setHasMore(data.hasMore)
      setPage(currentPage)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load properties')
      toast.error(err instanceof Error ? err.message : 'Failed to load properties')
    } finally {
      setIsLoading(false)
    }
  }, [filters, properties])

  // Initial load
  useEffect(() => {
    fetchProperties(1, false)
  }, [])

  // Handle search
  const handleSearch = () => {
    setPage(1)
    fetchProperties(1, false)
  }

  // Handle load more
  const handleLoadMore = () => {
    fetchProperties(page + 1, true)
  }

  // Handle favorite toggle
  const handleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
        toast.success('Removed from favorites')
      } else {
        newFavorites.add(id)
        toast.success('Added to favorites')
      }
      return newFavorites
    })
  }

  return (
    <main className="relative min-h-screen">
      <Toaster position="top-right" />
      <ParticleBackground />
      <Navbar />

      <div className="relative z-10 pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink bg-clip-text text-transparent">
                Explore UAE Properties
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Discover your perfect property with AI-powered search
              {isMockData && (
                <span className="ml-2 text-sm text-yellow-400">(Demo Mode)</span>
              )}
            </p>
          </motion.div>

          {/* Search and Filters */}
          <PropertyFilters
            filters={filters}
            onFilterChange={setFilters}
            onSearch={handleSearch}
            isLoading={isLoading}
          />

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-300">
              {isLoading ? (
                <span>Searching...</span>
              ) : (
                <>
                  Found <span className="text-cyber-blue font-semibold">{totalResults}</span> properties
                  {properties.length > 0 && (
                    <span className="text-gray-500 ml-2">
                      (Showing {properties.length})
                    </span>
                  )}
                </>
              )}
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-cyber-blue/20 text-cyber-blue' : 'text-gray-400 hover:text-white'
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-cyber-blue/20 text-cyber-blue' : 'text-gray-400 hover:text-white'
                }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && properties.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-cyber-blue animate-spin mb-4" />
              <p className="text-gray-300 text-lg">Searching for properties...</p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
              <p className="text-gray-300 text-lg mb-2">Failed to load properties</p>
              <p className="text-gray-400 text-sm mb-4">{error}</p>
              <button onClick={() => fetchProperties(1, false)} className="btn-cyber">
                Try Again
              </button>
            </div>
          )}

          {/* No Results */}
          {!isLoading && !error && properties.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 rounded-full bg-cyber-blue/10 flex items-center justify-center mb-4">
                <AlertCircle className="w-12 h-12 text-cyber-blue" />
              </div>
              <p className="text-gray-300 text-lg mb-2">No properties found</p>
              <p className="text-gray-400 text-sm mb-4">Try adjusting your filters or search criteria</p>
              <button onClick={() => { setFilters({}); handleSearch(); }} className="btn-outline-cyber">
                Clear Filters
              </button>
            </div>
          )}

          {/* Properties Grid */}
          {!isLoading && !error && properties.length > 0 && (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              <AnimatePresence>
                {properties.map((property, index) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    viewMode={viewMode}
                    onFavorite={handleFavorite}
                    isFavorite={favorites.has(property.id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Load More */}
          {!isLoading && !error && hasMore && properties.length > 0 && (
            <div className="text-center mt-12">
              <button 
                onClick={handleLoadMore}
                disabled={isLoading}
                className="btn-outline-cyber flex items-center space-x-2 mx-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <span>Load More Properties</span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
