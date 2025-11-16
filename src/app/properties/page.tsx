/**
 * Properties Listing Page
 * Displays live UAE properties from Zyla API with search and filters
 */

'use client';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin, Home, DollarSign, Bed, Bath, ArrowUpDown } from 'lucide-react';
import LivePropertyCard from '@/components/properties/LivePropertyCard';
import { useProperties, PropertySearchParams } from '@/hooks/useProperties';

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useState<PropertySearchParams>({
    location: '',
    purpose: 'for-sale',
    page: 0,
  });

  const [showFilters, setShowFilters] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  // Fetch properties using React Query
  const { data, isLoading, error } = useProperties(searchParams);

  const handleSearch = () => {
    setSearchParams(prev => ({ ...prev, location: localSearch, page: 0 }));
  };

  const handleFilterChange = (key: keyof PropertySearchParams, value: any) => {
    setSearchParams(prev => ({ ...prev, [key]: value, page: 0 }));
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary">Explore UAE </span>
            <span className="text-accent">Properties</span>
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Discover your dream property with live listings from across the United Arab Emirates
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Location Search */}
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-blue" />
              <input
                type="text"
                placeholder="Enter location (e.g., Dubai, Abu Dhabi)..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-cyber-blue/30 rounded-xl text-primary placeholder-gray-400 focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/50"
              />
            </div>

            {/* Purpose Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => handleFilterChange('purpose', 'for-sale')}
                className={`px-6 py-4 rounded-xl font-semibold transition-all ${
                  searchParams.purpose === 'for-sale'
                    ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white'
                    : 'bg-white/5 text-secondary hover:bg-white/10'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => handleFilterChange('purpose', 'for-rent')}
                className={`px-6 py-4 rounded-xl font-semibold transition-all ${
                  searchParams.purpose === 'for-rent'
                    ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white'
                    : 'bg-white/5 text-secondary hover:bg-white/10'
                }`}
              >
                Rent
              </button>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap px-8"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-cyber flex items-center justify-center gap-2 whitespace-nowrap px-6"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-cyber-blue/20"
            >
              {/* Property Type */}
              <div>
                <label className="text-sm text-secondary mb-2 block">Property Type</label>
                <select
                  value={searchParams.category || ''}
                  onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                  className="input-cyber w-full"
                >
                  <option value="">All Types</option>
                  <option value="4">Apartment</option>
                  <option value="3">Villa</option>
                  <option value="16">Townhouse</option>
                  <option value="14">Penthouse</option>
                  <option value="6">Office</option>
                  <option value="5">Shop</option>
                </select>
              </div>

              {/* Min Price */}
              <div>
                <label className="text-sm text-secondary mb-2 block">Min Price (AED)</label>
                <input
                  type="number"
                  placeholder="Min"
                  value={searchParams.minPrice || ''}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="input-cyber w-full"
                />
              </div>

              {/* Max Price */}
              <div>
                <label className="text-sm text-secondary mb-2 block">Max Price (AED)</label>
                <input
                  type="number"
                  placeholder="Max"
                  value={searchParams.maxPrice || ''}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="input-cyber w-full"
                />
              </div>

              {/* Bedrooms */}
              <div>
                <label className="text-sm text-secondary mb-2 block">Bedrooms</label>
                <select
                  value={searchParams.rooms || ''}
                  onChange={(e) => handleFilterChange('rooms', e.target.value ? parseInt(e.target.value) : undefined)}
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

              {/* Sort */}
              <div>
                <label className="text-sm text-secondary mb-2 block">Sort By</label>
                <select
                  value={searchParams.sort || ''}
                  onChange={(e) => handleFilterChange('sort', e.target.value || undefined)}
                  className="input-cyber w-full"
                >
                  <option value="">Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="date-desc">Newest First</option>
                  <option value="verified-score">Verified First</option>
                </select>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        {data && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <p className="text-secondary">
              Found <span className="text-accent font-bold">{data.total}</span> properties
              {searchParams.location && ` in ${searchParams.location}`}
            </p>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-cyber h-96 animate-pulse">
                <div className="h-64 bg-cyber-blue/10" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-cyber-blue/10 rounded" />
                  <div className="h-4 bg-cyber-blue/10 rounded w-2/3" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-12 bg-cyber-blue/10 rounded" />
                    <div className="h-12 bg-cyber-blue/10 rounded" />
                    <div className="h-12 bg-cyber-blue/10 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">Failed to load properties</p>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Try Again
            </button>
          </div>
        )}

        {/* Properties Grid */}
        {data && data.properties.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {data.properties.map((property, index) => (
                <LivePropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>

            {/* Pagination */}
            {data.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => handlePageChange(searchParams.page! - 1)}
                  disabled={searchParams.page === 0}
                  className="btn-cyber disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-secondary">
                  Page {(searchParams.page || 0) + 1} of {data.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(searchParams.page! + 1)}
                  disabled={!data.hasMore}
                  className="btn-cyber disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {data && data.properties.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Home className="w-20 h-20 text-cyber-blue/50 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-primary mb-2">No Properties Found</h3>
            <p className="text-secondary mb-6">Try adjusting your search filters</p>
            <button
              onClick={() => {
                setSearchParams({ purpose: 'for-sale', page: 0 });
                setLocalSearch('');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
