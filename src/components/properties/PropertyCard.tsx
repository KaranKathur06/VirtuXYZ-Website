'use client'

import { motion } from 'framer-motion'
import { MapPin, Bed, Bath, Square, Heart, Eye, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PropertyCardProps } from '@/types/property'
import { useState } from 'react'

export default function PropertyCard({ 
  property, 
  viewMode = 'grid',
  onFavorite,
  isFavorite = false
}: PropertyCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Format price with currency
  const formatPrice = (price: number, currency: string) => {
    if (price >= 1000000) {
      return `${currency} ${(price / 1000000).toFixed(2)}M`
    } else if (price >= 1000) {
      return `${currency} ${(price / 1000).toFixed(0)}K`
    }
    return `${currency} ${price.toLocaleString()}`
  }

  // Calculate AI score based on property features
  const calculateAIScore = () => {
    let score = 75
    if (property.images.length > 3) score += 5
    if (property.features && property.features.length > 5) score += 5
    if (property.description && property.description.length > 100) score += 5
    if (property.furnished) score += 5
    if (property.amenities && property.amenities.length > 3) score += 5
    return Math.min(score, 99)
  }

  const aiScore = calculateAIScore()
  const primaryImage = property.images[0] || '/placeholder-property.jpg'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-cyber p-0 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${viewMode === 'list' ? 'flex' : ''}`}>
        {/* Image Section */}
        <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'h-64'} overflow-hidden`}>
          <Image
            src={imageError ? '/placeholder-property.jpg' : primaryImage}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* AI Score Badge */}
          <motion.div 
            className="absolute top-4 left-4 px-3 py-1 glass rounded-full text-sm font-semibold"
            animate={{ scale: isHovered ? 1.05 : 1 }}
          >
            <span className="text-cyber-blue">AI:</span> {aiScore}
          </motion.div>

          {/* Listing Type Badge */}
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
            property.listingType === 'sale' 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
              : 'bg-gradient-to-r from-blue-500 to-cyan-500'
          }`}>
            {property.listingType === 'sale' ? 'FOR SALE' : 'FOR RENT'}
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button 
              onClick={() => onFavorite?.(property.id)}
              className={`p-2 glass rounded-lg hover:bg-white/20 transition-colors ${
                isFavorite ? 'text-red-500' : 'text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </motion.button>
            <Link href={`/tours/${property.id}`}>
              <motion.div 
                className="p-2 glass rounded-lg hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-5 h-5" />
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-blue transition-colors line-clamp-2">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-400 mb-4">
            <MapPin className="w-4 h-4 mr-2 text-cyber-blue flex-shrink-0" />
            <span className="text-sm line-clamp-1">
              {property.location.area && `${property.location.area}, `}
              {property.location.city}
            </span>
          </div>

          {/* Property Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-cyber-blue/20">
            <div className="text-center">
              <Bed className="w-5 h-5 text-cyber-blue mx-auto mb-1" />
              <p className="text-sm text-gray-400">{property.bedrooms}</p>
            </div>
            <div className="text-center">
              <Bath className="w-5 h-5 text-cyber-blue mx-auto mb-1" />
              <p className="text-sm text-gray-400">{property.bathrooms}</p>
            </div>
            <div className="text-center">
              <Square className="w-5 h-5 text-cyber-blue mx-auto mb-1" />
              <p className="text-sm text-gray-400">{property.area.toLocaleString()}</p>
            </div>
          </div>

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {property.features.slice(0, 3).map((feature, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-1 text-xs rounded-lg bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30"
                >
                  {feature}
                </span>
              ))}
              {property.features.length > 3 && (
                <span className="px-2 py-1 text-xs rounded-lg bg-cyber-purple/10 text-cyber-purple">
                  +{property.features.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Price and CTA */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                {formatPrice(property.price, property.currency)}
              </span>
              {property.listingType === 'rent' && (
                <span className="text-sm text-gray-400 ml-1">/month</span>
              )}
            </div>
            <Link 
              href={property.externalUrl || `/property/${property.id}`}
              target={property.externalUrl ? '_blank' : '_self'}
              className="btn-cyber text-sm px-4 py-2 flex items-center space-x-2"
            >
              <span>View Details</span>
              {property.externalUrl && <ExternalLink className="w-4 h-4" />}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
