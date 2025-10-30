/**
 * Live Property Card Component
 * Displays UAE property data from Zyla API with theme support
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath, Square, MapPin, Heart, Eye, CheckCircle } from 'lucide-react';
import { Property, formatPrice, formatArea } from '@/hooks/useProperties';
import { useState } from 'react';

interface LivePropertyCardProps {
  property: Property;
  index?: number;
}

export default function LivePropertyCard({ property, index = 0 }: LivePropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/property/${property.externalID}`}>
        <div className="card-cyber h-full overflow-hidden hover:scale-[1.02] transition-transform duration-300">
          {/* Image Section */}
          <div className="relative h-64 overflow-hidden">
            {!imageError && property.coverImage ? (
              <Image
                src={property.coverImage}
                alt={property.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 flex items-center justify-center">
                <Square className="w-20 h-20 text-cyber-blue/50" />
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {property.isVerified && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="px-3 py-1 rounded-full bg-green-500/90 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1"
                >
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </motion.div>
              )}
              <div className="px-3 py-1 rounded-full bg-cyber-blue/90 backdrop-blur-sm text-white text-xs font-medium">
                {property.listingType === 'for-sale' ? 'For Sale' : 'For Rent'}
              </div>
            </div>

            {/* Action buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsFavorite(!isFavorite);
                }}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current text-red-500' : 'text-white'}`} />
              </button>
              <button
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-cyber-blue transition-colors"
              >
                <Eye className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Price tag */}
            <div className="absolute bottom-3 left-3">
              <div className="px-4 py-2 rounded-lg bg-black/70 backdrop-blur-sm">
                <p className="text-2xl font-bold text-accent">
                  {formatPrice(property.price, property.currency, property.rentFrequency)}
                </p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* Title */}
            <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
              {property.title}
            </h3>

            {/* Location */}
            <div className="flex items-center text-secondary mb-4">
              <MapPin className="w-4 h-4 mr-2 text-cyber-blue" />
              <span className="text-sm">{property.location.area}, {property.location.city}</span>
            </div>

            {/* Property Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-cyber-blue/20">
              <div className="text-center">
                <Bed className="w-5 h-5 text-cyber-blue mx-auto mb-1" />
                <p className="text-sm text-secondary">{property.bedrooms} Beds</p>
              </div>
              <div className="text-center">
                <Bath className="w-5 h-5 text-cyber-blue mx-auto mb-1" />
                <p className="text-sm text-secondary">{property.bathrooms} Baths</p>
              </div>
              <div className="text-center">
                <Square className="w-5 h-5 text-cyber-blue mx-auto mb-1" />
                <p className="text-sm text-secondary">{formatArea(property.area, property.areaUnit)}</p>
              </div>
            </div>

            {/* Agency Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {property.agency.logo && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/10">
                    <Image
                      src={property.agency.logo}
                      alt={property.agency.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <span className="text-xs text-tertiary">{property.agency.name}</span>
              </div>
              <span className="text-xs text-tertiary">{property.propertyType}</span>
            </div>

            {/* Amenities preview */}
            {property.amenities.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {property.amenities.slice(0, 3).map((amenity, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs rounded-full bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30"
                  >
                    {typeof amenity === 'string' ? amenity : amenity.text}
                  </span>
                ))}
                {property.amenities.length > 3 && (
                  <span className="px-2 py-1 text-xs rounded-full bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/30">
                    +{property.amenities.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
