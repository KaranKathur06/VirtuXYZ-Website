'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Bed, Bath, Square, Heart, Eye, Share2, Sparkles, TrendingUp, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface PropertyCardProps {
  property: {
    id: string
    title: string
    price: number
    currency: string
    location: string
    image: string
    bedrooms: number
    bathrooms: number
    area: number
    areaUnit: string
    propertyType: string
    hasVirtualTour?: boolean
    isVerified?: boolean
    isHotDeal?: boolean
    priceChange?: string
  }
}

export default function EnhancedPropertyCard({ property }: PropertyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div
      className="relative h-[400px] perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="glass rounded-2xl overflow-hidden h-full group cursor-pointer">
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {property.hasVirtualTour && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="px-3 py-1 rounded-full bg-cyber-blue/90 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    AI Tour
                  </motion.div>
                )}
                {false && property.isVerified && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="px-3 py-1 rounded-full bg-green-500/90 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </motion.div>
                )}
                {property.isHotDeal && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="px-3 py-1 rounded-full bg-red-500/90 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1 animate-pulse"
                  >
                    <TrendingUp className="w-3 h-3" />
                    Hot Deal
                  </motion.div>
                )}
              </div>

              {/* Action buttons */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsFavorite(!isFavorite)
                  }}
                  className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current text-red-500' : 'text-white'}`} />
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-cyber-blue transition-colors"
                >
                  <Share2 className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Price change indicator */}
              {property.priceChange && (
                <div className="absolute bottom-3 right-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                    property.priceChange.startsWith('+') 
                      ? 'bg-green-500/90 text-white' 
                      : 'bg-red-500/90 text-white'
                  }`}>
                    {property.priceChange}
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-cyber-blue transition-colors">
                {property.title}
              </h3>
              
              <div className="flex items-center text-sm text-gray-400 mb-3">
                <MapPin className="w-4 h-4 mr-1 text-cyber-blue" />
                <span className="line-clamp-1">{property.location}</span>
              </div>

              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                    {property.currency} {property.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">{property.propertyType}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <Bed className="w-4 h-4 text-cyber-blue" />
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="w-4 h-4 text-cyber-blue" />
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square className="w-4 h-4 text-cyber-blue" />
                  <span>{property.area} {property.areaUnit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="glass rounded-2xl overflow-hidden h-full p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-xl mb-4 text-cyber-blue">Quick Actions</h3>
              
              <div className="space-y-3">
                <Link
                  href={`/property/${property.id}`}
                  className="block w-full btn-cyber text-center py-3 rounded-xl"
                >
                  View Details
                </Link>
                
                {property.hasVirtualTour && (
                  <Link
                    href={`/tour/${property.id}`}
                    className="block w-full btn-outline-cyber text-center py-3 rounded-xl flex items-center justify-center gap-2"
                  >
                    <Eye className="w-5 h-5" />
                    Start 3D Tour
                  </Link>
                )}
                
                <button className="w-full glass-hover text-center py-3 rounded-xl">
                  Compare Properties
                </button>
                
                <button className="w-full glass-hover text-center py-3 rounded-xl">
                  Schedule Visit
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-cyber-blue/20">
              <div className="text-sm text-gray-400 mb-2">Property Features:</div>
              <div className="flex flex-wrap gap-2">
                {['Parking', 'Pool', 'Gym', 'Security'].map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 text-xs rounded-full bg-cyber-blue/20 text-cyber-blue"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
