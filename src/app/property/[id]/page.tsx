'use client'

import { use, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Share2, Heart, MapPin, Bed, Bath, Square, Car, 
  Calendar, TrendingUp, DollarSign, Phone, Mail, MessageSquare,
  Eye, Download, ExternalLink, Sparkles, Play, ChevronLeft, ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { toast } from 'react-hot-toast'

interface PropertyDetailProps {
  params: Promise<{ id: string }>
}

export default function PropertyDetail({ params }: PropertyDetailProps) {
  const { id } = use(params)
  const [property, setProperty] = useState<any>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch property details
    // For now, using mock data
    const mockProperty = {
      id,
      title: 'Luxury Villa in Palm Jumeirah',
      price: 15000000,
      currency: 'AED',
      location: {
        address: 'Palm Jumeirah, Dubai',
        city: 'Dubai',
        area: 'Palm Jumeirah',
        coordinates: { lat: 25.1124, lng: 55.1390 }
      },
      propertyType: 'Villa',
      listingType: 'sale',
      bedrooms: 5,
      bathrooms: 6,
      area: 8500,
      areaUnit: 'sqft',
      parking: 4,
      yearBuilt: 2022,
      images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      ],
      description: 'Experience unparalleled luxury in this stunning waterfront villa. Featuring contemporary design, smart home technology, and breathtaking views of the Arabian Gulf. This property represents the pinnacle of modern living in Dubai.',
      features: [
        'Private Beach Access',
        'Infinity Pool',
        'Smart Home System',
        'Home Theater',
        'Gym & Spa',
        'Landscaped Garden',
        'Security System',
        'Maid\'s Room',
        'Study Room',
        'Storage Room'
      ],
      amenities: [
        'Swimming Pool',
        'Gym',
        'Security',
        'Parking',
        'Garden',
        'BBQ Area',
        'Kids Play Area',
        'Concierge Service'
      ],
      agent: {
        name: 'Sarah Johnson',
        company: 'Luxury Properties Dubai',
        phone: '+971 50 123 4567',
        email: 'sarah@luxuryproperties.ae',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200'
      },
      virtualTourAvailable: true,
      aiScore: 95,
      priceHistory: [
        { date: '2024-01', price: 14500000 },
        { date: '2024-02', price: 14750000 },
        { date: '2024-03', price: 15000000 },
      ],
      nearbyPlaces: [
        { type: 'School', name: 'Dubai International School', distance: '2.5 km' },
        { type: 'Hospital', name: 'American Hospital', distance: '3.1 km' },
        { type: 'Mall', name: 'Dubai Mall', distance: '8.5 km' },
        { type: 'Metro', name: 'Nakheel Metro Station', distance: '4.2 km' },
      ]
    }

    setTimeout(() => {
      setProperty(mockProperty)
      setLoading(false)
    }, 500)
  }, [id])

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites')
  }

  const nextImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
    }
  }

  const prevImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
    }
  }

  if (loading || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyber-blue"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Image Gallery */}
        <div className="relative h-[60vh] bg-black">
          <Image
            src={property.images[currentImageIndex]}
            alt={property.title}
            fill
            className="object-cover"
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-hover flex items-center justify-center z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-hover flex items-center justify-center z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full">
            <span className="text-sm">{currentImageIndex + 1} / {property.images.length}</span>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button onClick={handleShare} className="w-12 h-12 rounded-full glass-hover flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              onClick={handleFavorite} 
              className="w-12 h-12 rounded-full glass-hover flex items-center justify-center"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>

          {/* Virtual Tour Badge */}
          {property.virtualTourAvailable && (
            <Link
              href={`/tour/${property.id}`}
              className="absolute bottom-4 right-4 btn-cyber flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Start 3D Tour</span>
            </Link>
          )}

          {/* Back Button */}
          <Link
            href="/explore"
            className="absolute top-4 left-4 w-12 h-12 rounded-full glass-hover flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-cyber-blue/20 text-cyber-blue text-sm font-medium">
                    {property.listingType === 'sale' ? 'For Sale' : 'For Rent'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyber-purple/20 text-cyber-purple text-sm font-medium">
                    {property.propertyType}
                  </span>
                  {property.aiScore && (
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                      <Sparkles className="w-4 h-4" />
                      <span>AI Score: {property.aiScore}/100</span>
                    </div>
                  )}
                </div>

                <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
                
                <div className="flex items-center text-gray-400 mb-6">
                  <MapPin className="w-5 h-5 mr-2 text-cyber-blue" />
                  <span>{property.location.address}</span>
                </div>

                <div className="text-5xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                  {property.currency} {property.price.toLocaleString()}
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Bed, label: 'Bedrooms', value: property.bedrooms },
                  { icon: Bath, label: 'Bathrooms', value: property.bathrooms },
                  { icon: Square, label: 'Area', value: `${property.area} ${property.areaUnit}` },
                  { icon: Car, label: 'Parking', value: property.parking },
                ].map((stat, index) => (
                  <div key={index} className="glass rounded-xl p-4 text-center">
                    <stat.icon className="w-8 h-8 text-cyber-blue mx-auto mb-2" />
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="glass rounded-xl overflow-hidden">
                <div className="flex border-b border-cyber-blue/20">
                  {['overview', 'features', 'location', 'insights'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-6 py-4 font-medium capitalize transition-colors ${
                        activeTab === tab
                          ? 'bg-cyber-blue/20 text-cyber-blue border-b-2 border-cyber-blue'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-4">Description</h3>
                        <p className="text-gray-300 leading-relaxed">{property.description}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4">Property Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex justify-between py-2 border-b border-cyber-blue/10">
                            <span className="text-gray-400">Property Type</span>
                            <span className="font-medium">{property.propertyType}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-cyber-blue/10">
                            <span className="text-gray-400">Year Built</span>
                            <span className="font-medium">{property.yearBuilt}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-cyber-blue/10">
                            <span className="text-gray-400">Listing Type</span>
                            <span className="font-medium capitalize">{property.listingType}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-cyber-blue/10">
                            <span className="text-gray-400">Property ID</span>
                            <span className="font-medium">#{property.id}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'features' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-4">Features</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {property.features.map((feature: string, index: number) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-cyber-blue"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4">Amenities</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {property.amenities.map((amenity: string, index: number) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-cyber-purple"></div>
                              <span>{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'location' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-4">Address</h3>
                        <p className="text-gray-300">{property.location.address}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4">Nearby Places</h3>
                        <div className="space-y-3">
                          {property.nearbyPlaces.map((place: any, index: number) => (
                            <div key={index} className="flex items-center justify-between py-3 border-b border-cyber-blue/10">
                              <div>
                                <div className="font-medium">{place.name}</div>
                                <div className="text-sm text-gray-400">{place.type}</div>
                              </div>
                              <div className="text-cyber-blue">{place.distance}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="h-64 bg-white/5 rounded-xl flex items-center justify-center">
                        <span className="text-gray-400">Map View (Integrate Mapbox here)</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'insights' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-4">AI Investment Analysis</h3>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="glass rounded-xl p-4 text-center">
                            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-green-400">+12%</div>
                            <div className="text-sm text-gray-400">Price Growth</div>
                          </div>
                          <div className="glass rounded-xl p-4 text-center">
                            <DollarSign className="w-8 h-8 text-cyber-blue mx-auto mb-2" />
                            <div className="text-2xl font-bold">8.5%</div>
                            <div className="text-sm text-gray-400">ROI Potential</div>
                          </div>
                          <div className="glass rounded-xl p-4 text-center">
                            <Eye className="w-8 h-8 text-cyber-purple mx-auto mb-2" />
                            <div className="text-2xl font-bold">High</div>
                            <div className="text-sm text-gray-400">Demand</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4">Price History</h3>
                        <div className="space-y-2">
                          {property.priceHistory.map((record: any, index: number) => (
                            <div key={index} className="flex items-center justify-between py-2 border-b border-cyber-blue/10">
                              <span className="text-gray-400">{record.date}</span>
                              <span className="font-medium">{property.currency} {record.price.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agent Card */}
              <div className="glass rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Contact Agent</h3>
                
                <div className="flex items-center space-x-4 mb-6">
                  <Image
                    src={property.agent.image}
                    alt={property.agent.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-bold">{property.agent.name}</div>
                    <div className="text-sm text-gray-400">{property.agent.company}</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <a href={`tel:${property.agent.phone}`} className="flex items-center space-x-3 text-gray-300 hover:text-cyber-blue transition-colors">
                    <Phone className="w-5 h-5" />
                    <span>{property.agent.phone}</span>
                  </a>
                  <a href={`mailto:${property.agent.email}`} className="flex items-center space-x-3 text-gray-300 hover:text-cyber-blue transition-colors">
                    <Mail className="w-5 h-5" />
                    <span>{property.agent.email}</span>
                  </a>
                </div>

                <button className="w-full btn-cyber flex items-center justify-center space-x-2 mb-3">
                  <MessageSquare className="w-5 h-5" />
                  <span>Send Message</span>
                </button>

                <button className="w-full btn-outline-cyber flex items-center justify-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Visit</span>
                </button>
              </div>

              {/* Download Brochure */}
              <button className="w-full glass-hover rounded-xl p-4 flex items-center justify-center space-x-2">
                <Download className="w-5 h-5 text-cyber-blue" />
                <span>Download Brochure</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
