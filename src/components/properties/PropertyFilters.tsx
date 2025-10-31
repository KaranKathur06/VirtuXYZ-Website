'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X, Sparkles } from 'lucide-react'
import { PropertyFilters as FilterType } from '@/types/property'
import { useState } from 'react'

interface PropertyFiltersProps {
  filters: FilterType
  onFilterChange: (filters: FilterType) => void
  onSearch: () => void
  isLoading?: boolean
}

export default function PropertyFilters({
  filters,
  onFilterChange,
  onSearch,
  isLoading = false
}: PropertyFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)

  const cities = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain']
  const propertyTypes = ['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Studio', 'Office', 'Shop']
  const priceRanges = [
    { label: 'Any Price', min: undefined, max: undefined },
    { label: 'Under 500K AED', min: 0, max: 500000 },
    { label: '500K - 1M AED', min: 500000, max: 1000000 },
    { label: '1M - 2M AED', min: 1000000, max: 2000000 },
    { label: '2M - 5M AED', min: 2000000, max: 5000000 },
    { label: '5M+ AED', min: 5000000, max: undefined },
  ]

  const handlePriceRangeChange = (range: typeof priceRanges[0]) => {
    onFilterChange({
      ...filters,
      minPrice: range.min,
      maxPrice: range.max
    })
  }

  const handleAISearch = (query: string) => {
    // Parse AI query and extract filters
    const lowerQuery = query.toLowerCase()
    
    // Extract city
    const cityMatch = cities.find(city => lowerQuery.includes(city.toLowerCase()))
    
    // Extract property type
    const typeMatch = propertyTypes.find(type => lowerQuery.includes(type.toLowerCase()))
    
    // Extract price (simple regex for numbers with M/K)
    const priceMatch = lowerQuery.match(/(\d+(?:\.\d+)?)\s*(m|k|million|thousand)/i)
    let maxPrice
    if (priceMatch) {
      const value = parseFloat(priceMatch[1])
      const unit = priceMatch[2].toLowerCase()
      if (unit === 'm' || unit === 'million') {
        maxPrice = value * 1000000
      } else if (unit === 'k' || unit === 'thousand') {
        maxPrice = value * 1000
      }
    }

    // Extract bedrooms
    const bedroomMatch = lowerQuery.match(/(\d+)\s*(?:bed|bedroom)/i)
    const bedrooms = bedroomMatch ? parseInt(bedroomMatch[1]) : undefined

    // Determine listing type
    let listingType: 'sale' | 'rent' | undefined
    if (lowerQuery.includes('rent') || lowerQuery.includes('rental')) {
      listingType = 'rent'
    } else if (lowerQuery.includes('buy') || lowerQuery.includes('sale') || lowerQuery.includes('purchase')) {
      listingType = 'sale'
    }

    // Build the next filter state first so the search uses the latest values
    const nextFilters: FilterType = {
      ...filters,
      city: cityMatch,
      propertyType: typeMatch,
      maxPrice,
      bedrooms,
      listingType,
      searchQuery: query
    }

    onFilterChange(nextFilters)
    setShowAIAssistant(false)
    // Ensure state is applied before triggering search
    setTimeout(() => onSearch(), 0)
  }

  const activeFilterCount = Object.values(filters).filter(v => v !== undefined && v !== '').length

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-2xl p-6 mb-8"
    >
      {/* Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-blue" />
          <input
            type="text"
            value={filters.searchQuery || ''}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            placeholder="Search by location, property type, or features..."
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-cyber-blue/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/50 transition-all"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setShowAIAssistant(!showAIAssistant)}
            className="btn-cyber flex items-center space-x-2 relative"
          >
            <Sparkles className="w-5 h-5" />
            <span className="hidden sm:inline">AI Search</span>
          </button>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-outline-cyber flex items-center space-x-2 relative"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-cyber-pink rounded-full text-xs flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <button
            onClick={onSearch}
            disabled={isLoading}
            className="btn-cyber px-6"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {/* AI Assistant */}
      <AnimatePresence>
        {showAIAssistant && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4 p-4 bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 border border-cyber-blue/30 rounded-xl"
          >
            <div className="flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-cyber-blue mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-2">AI Search Assistant</h4>
                <p className="text-sm text-gray-300 mb-3">
                  Try natural language like: "Show me 3 bedroom villas in Dubai under 2M AED"
                </p>
                <input
                  type="text"
                  placeholder="Describe what you're looking for..."
                  className="w-full px-4 py-2 bg-white/5 border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAISearch((e.target as HTMLInputElement).value)
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  <button
                    onClick={() => handleAISearch('Show me villas in Dubai under 2M')}
                    className="text-xs px-3 py-1 bg-cyber-blue/20 hover:bg-cyber-blue/30 text-cyber-blue rounded-full transition-colors"
                  >
                    Villas in Dubai under 2M
                  </button>
                  <button
                    onClick={() => handleAISearch('3 bedroom apartments for rent in Abu Dhabi')}
                    className="text-xs px-3 py-1 bg-cyber-purple/20 hover:bg-cyber-purple/30 text-cyber-purple rounded-full transition-colors"
                  >
                    3BR apartments for rent
                  </button>
                  <button
                    onClick={() => handleAISearch('Luxury penthouses in Marina')}
                    className="text-xs px-3 py-1 bg-cyber-pink/20 hover:bg-cyber-pink/30 text-cyber-pink rounded-full transition-colors"
                  >
                    Luxury penthouses
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowAIAssistant(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Controls */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-cyber-blue/20"
          >
            {/* City */}
            <div>
              <label className="text-sm text-secondary mb-2 block">City</label>
              <select
                value={filters.city || ''}
                onChange={(e) => onFilterChange({ ...filters, city: e.target.value || undefined })}
                className="input-cyber w-full"
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="text-sm text-secondary mb-2 block">Property Type</label>
              <select
                value={filters.propertyType || ''}
                onChange={(e) => onFilterChange({ ...filters, propertyType: e.target.value || undefined })}
                className="input-cyber w-full"
              >
                <option value="">All Types</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-sm text-secondary mb-2 block">Price Range</label>
              <select
                onChange={(e) => {
                  const range = priceRanges[parseInt(e.target.value)]
                  handlePriceRangeChange(range)
                }}
                className="input-cyber w-full"
              >
                {priceRanges.map((range, idx) => (
                  <option key={idx} value={idx}>{range.label}</option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="text-sm text-secondary mb-2 block">Bedrooms</label>
              <select
                value={filters.bedrooms || ''}
                onChange={(e) => onFilterChange({ ...filters, bedrooms: e.target.value ? parseInt(e.target.value) : undefined })}
                className="input-cyber w-full"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            {/* Listing Type */}
            <div>
              <label className="text-sm text-secondary mb-2 block">Listing Type</label>
              <select
                value={filters.listingType || ''}
                onChange={(e) => onFilterChange({ ...filters, listingType: e.target.value as any || undefined })}
                className="input-cyber w-full"
              >
                <option value="">All</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  onFilterChange({})
                  onSearch()
                }}
                className="w-full btn-outline-cyber flex items-center justify-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
