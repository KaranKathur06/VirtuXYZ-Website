'use client'

import { motion } from 'framer-motion'
import { MapPin, Bed, Bath, Square, Heart, Eye, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function FeaturedProperties() {
  const properties = [
    {
      id: 1,
      title: 'Modern Luxury Villa',
      location: 'Beverly Hills, CA',
      price: '$4,500,000',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      beds: 5,
      baths: 4,
      sqft: '4,200',
      aiScore: 98,
      featured: true
    },
    {
      id: 2,
      title: 'Smart Penthouse',
      location: 'Manhattan, NY',
      price: '$8,200,000',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      beds: 4,
      baths: 3,
      sqft: '3,800',
      aiScore: 95,
      featured: true
    },
    {
      id: 3,
      title: 'Eco-Friendly Estate',
      location: 'Austin, TX',
      price: '$2,800,000',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      beds: 6,
      baths: 5,
      sqft: '5,500',
      aiScore: 92,
      featured: false
    },
    {
      id: 4,
      title: 'Waterfront Condo',
      location: 'Miami Beach, FL',
      price: '$3,600,000',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      beds: 3,
      baths: 3,
      sqft: '2,900',
      aiScore: 94,
      featured: false
    }
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink bg-clip-text text-transparent">
                Featured Properties
              </span>
            </h2>
            <p className="text-xl text-secondary">
              Handpicked by AI based on market trends and user preferences
            </p>
          </div>
          <Link href="/explore" className="btn-cyber mt-6 md:mt-0">
            View All Properties
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="card-cyber p-0 overflow-hidden h-full flex flex-col">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker via-transparent to-transparent opacity-60"></div>
                  
                  {/* AI Score Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 glass rounded-full flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-cyber-blue" />
                    <span className="text-sm font-semibold">AI Score: {property.aiScore}</span>
                  </div>

                  {/* Featured Badge */}
                  {property.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full">
                      <span className="text-xs font-semibold">FEATURED</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 glass rounded-lg hover:bg-white/20 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    <Link href={`/tours/${property.id}`} className="p-2 glass rounded-lg hover:bg-white/20 transition-colors">
                      <Eye className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                      {property.title}
                    </h3>
                  </div>

                  <div className="flex items-center text-secondary mb-4">
                    <MapPin className="w-4 h-4 mr-2 text-cyber-blue" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  {/* Property Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-cyber-blue/20">
                    <div className="text-center">
                      <Bed className="w-5 h-5 text-cyber-blue mx-auto mb-1" />
                      <p className="text-sm text-secondary">{property.beds} Beds</p>
                    </div>
                    <div className="text-center">
                      <Bath className="w-5 h-5 text-cyber-blue mx-auto mb-1" />
                      <p className="text-sm text-secondary">{property.baths} Baths</p>
                    </div>
                    <div className="text-center">
                      <Square className="w-5 h-5 text-cyber-blue mx-auto mb-1" />
                      <p className="text-sm text-secondary">{property.sqft} sqft</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                      {property.price}
                    </span>
                    <Link
                      href={`/property/${property.id}`}
                      className="px-4 py-2 rounded-lg bg-cyber-blue/10 hover:bg-cyber-blue/20 border border-cyber-blue/30 hover:border-cyber-blue transition-all text-sm font-semibold"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
