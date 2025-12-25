'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Bed, Bath, Square, Heart, Eye, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Property, formatArea, formatPrice } from '@/hooks/useProperties'

type FeaturedProperty = Property & { badge?: string }

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<FeaturedProperty[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const fetchFeatured = async () => {
      try {
        const response = await fetch('/api/properties/search?hitsPerPage=24&sort=date-desc', {
          cache: 'no-store',
        })
        if (!response.ok) {
          throw new Error('Failed to fetch featured properties')
        }
        const result = await response.json()
        const apiProperties: Property[] = result?.data?.properties ?? []

        const shuffled = [...apiProperties].sort(() => Math.random() - 0.5)
        const topFour = shuffled.slice(0, 4).map((property, index) => ({
          ...property,
          badge: index === 0 ? 'Featured' : index === 1 ? 'New' : 'Preview',
        }))

        if (active) {
          setProperties(topFour)
        }
      } catch (err) {
        console.error(err)
        if (active) {
          setError('Unable to load featured listings right now.')
        }
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    fetchFeatured()
    return () => {
      active = false
    }
  }, [])

  const skeletonCards = useMemo(() => new Array(4).fill(null), [])

  return (
    <section
      className="py-20 relative"
      aria-labelledby="featured-properties-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
        >
          <div>
            <h2
              id="featured-properties-heading"
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink bg-clip-text text-transparent">
                Featured Properties
              </span>
            </h2>
            <p className="text-xl text-secondary">
              Curated previews while the platform is in early access
            </p>
          </div>
          <Link href="/explore" className="btn-cyber mt-6 md:mt-0">
            View All Properties
          </Link>
        </motion.div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50/60 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {(isLoading ? skeletonCards : properties).map((property, index) => {
            if (!property) {
              return (
                <div
                  key={`skeleton-${index}`}
                  className="card-cyber p-0 overflow-hidden h-full flex flex-col animate-pulse"
                >
                  <div className="h-56 bg-white/10 dark:bg-white/5" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-white/10 dark:bg-white/5 rounded w-2/3" />
                    <div className="h-4 bg-white/10 dark:bg-white/5 rounded w-1/2" />
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-10 bg-white/10 dark:bg-white/5 rounded" />
                      <div className="h-10 bg-white/10 dark:bg-white/5 rounded" />
                      <div className="h-10 bg-white/10 dark:bg-white/5 rounded" />
                    </div>
                    <div className="h-10 bg-white/10 dark:bg-white/5 rounded w-1/2" />
                  </div>
                </div>
              )
            }

            const propertyId = property.externalID || property.id
            const primaryImage = property.coverImage || property.images?.[0] || ''
            const location = `${property.location.area || ''}${property.location.area ? ', ' : ''}${property.location.city || 'UAE'}`
            const badge = property.badge
            const listingTypeLabel = property.listingType === 'for-rent' ? 'For Rent' : 'For Sale'

            return (
            <motion.article
              key={propertyId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative h-full"
            >
              <div className="card-cyber p-0 overflow-hidden h-full flex flex-col focus-within:ring-2 focus-within:ring-cyber-blue focus-within:ring-offset-2 focus-within:ring-offset-transparent">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={primaryImage || '/icon.png'}
                    alt={property.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Featured / Category Badge */}
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                    {badge && (
                      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple text-xs font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3" aria-hidden="true" />
                        <span>{badge}</span>
                      </div>
                    )}
                  </div>

                  {/* Quick actions */}
                  <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      className="p-2 glass rounded-lg hover:bg-white/20 transition-colors"
                      aria-label={`Save ${property.title} to favorites`}
                    >
                      <Heart className="w-5 h-5" aria-hidden="true" />
                    </button>
                    <Link
                      href={`/property/live/${propertyId}`}
                      className="p-2 glass rounded-lg hover:bg-white/20 transition-colors"
                      aria-label={`Quick view for ${property.title}`}
                    >
                      <Eye className="w-5 h-5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg md:text-xl font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2">
                      {property.title}
                    </h3>
                  </div>

                  <div className="flex items-center text-secondary text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-cyber-blue flex-shrink-0" aria-hidden="true" />
                    <span className="truncate" title={property.location}>
                      {location}
                    </span>
                  </div>

                  {/* Property Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-2">
                    <div className="text-center">
                      <Bed className="w-5 h-5 text-cyber-blue mx-auto mb-1" aria-hidden="true" />
                      <p className="text-xs text-secondary">{property.bedrooms} Beds</p>
                    </div>
                    <div className="text-center">
                      <Bath className="w-5 h-5 text-cyber-blue mx-auto mb-1" aria-hidden="true" />
                      <p className="text-xs text-secondary">{property.bathrooms} Baths</p>
                    </div>
                    <div className="text-center">
                      <Square className="w-5 h-5 text-cyber-blue mx-auto mb-1" aria-hidden="true" />
                      <p className="text-xs text-secondary">{formatArea(property.area, property.areaUnit)}</p>
                    </div>
                  </div>

                  {/* Price & CTAs */}
                  <div className="mt-auto space-y-3">
                    <div className="flex items-baseline justify-between gap-3">
                    <span className="text-2xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                        {formatPrice(property.price, property.currency, property.rentFrequency)}
                      </span>
                      <span className="text-[11px] px-2 py-1 rounded-full bg-cyber-blue/10 text-cyber-blue font-medium uppercase tracking-wide">
                        {listingTypeLabel}
                    </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        href={`/property/live/${propertyId}`}
                        className="flex-1 btn-cyber flex items-center justify-center text-sm"
                        aria-label={`View full details for ${property.title}`}
                      >
                        View Details
                      </Link>
                    <Link
                        href={`/property/live/${propertyId}?quickView=true`}
                        className="flex-1 px-4 py-3 rounded-lg border border-cyber-blue/40 bg-white/5 hover:bg-white/10 text-sm font-semibold text-primary flex items-center justify-center transition-all"
                        aria-label={`Open quick view for ${property.title}`}
                    >
                        Quick View
                    </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
            )
          })}
        </div>

        {/* View All CTA for smaller screens */}
        <div className="mt-10 flex justify-center md:hidden">
          <Link href="/explore" className="btn-cyber w-full max-w-xs text-center">
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  )
}
