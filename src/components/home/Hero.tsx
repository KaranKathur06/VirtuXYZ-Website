'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Mic, MapPin, Home, DollarSign, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from '@/lib/theme-context'

const HERO_VIDEO_SRC = '/demo%20gif.mp4'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [propertyType, setPropertyType] = useState('all')
  const [priceRange, setPriceRange] = useState('any')
  const [isListening, setIsListening] = useState(false)
  const { theme } = useTheme()

  const handleVoiceSearch = () => {
    if (typeof window === 'undefined' || !('webkitSpeechRecognition' in window)) {
      return
    }

    setIsListening(true)

    try {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      
      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setSearchQuery(transcript)
      }
      
      recognition.start()
    } catch {
      setIsListening(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 text-white">
      {/* Hero Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="w-full h-full object-cover scale-105 brightness-90"
          src={HERO_VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.65)]">
          {/* AI Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-cyber-blue animate-pulse" />
            <span className="text-sm font-medium">Powered by Advanced AI Technology</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight"
          >
            The Future of
            <br />
            <span className="neon-text">Real Estate</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto"
          >
            Experience properties like never before with AI-guided virtual tours, 
            smart analytics, and immersive 3D exploration
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="rounded-2xl p-4 md:p-6 max-w-4xl mx-auto mb-8 border border-white/10 bg-black/30 backdrop-blur-sm shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
          >
            <div className="flex flex-col md:flex-row gap-4 text-white">
              {/* Location Search */}
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-300" />
                <input
                  type="text"
                  placeholder="Enter location, city, or neighborhood..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/5 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/50"
                />
                <button
                  onClick={handleVoiceSearch}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
                    isListening ? 'bg-red-500 animate-pulse text-white' : 'hover:bg-white/10 text-white'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>

              {/* Property Type */}
              <div className="relative">
                <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-300 pointer-events-none" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full md:w-48 pl-12 pr-4 py-4 bg-white/5 border border-white/30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white/40 appearance-none cursor-pointer"
                >
                  <option value="all">All Types</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="villa">Villa</option>
                  <option value="land">Land</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-300 pointer-events-none" />
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full md:w-48 pl-12 pr-4 py-4 bg-white/5 border border-white/30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white/40 appearance-none cursor-pointer"
                >
                  <option value="any">Any Price</option>
                  <option value="0-500k">Under $500K</option>
                  <option value="500k-1m">$500K - $1M</option>
                  <option value="1m-2m">$1M - $2M</option>
                  <option value="2m+">$2M+</option>
                </select>
              </div>

              {/* Search Button */}
              <Link
                href={`/explore?q=${searchQuery}&type=${propertyType}&price=${priceRange}`}
                className="btn-cyber flex items-center justify-center space-x-2 whitespace-nowrap"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </Link>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10 text-white">
              <span className="text-sm text-white/70">Popular:</span>
              {['Luxury Apartments', 'Smart Homes', 'Eco-Friendly', 'Waterfront'].map((filter) => (
                <button
                  key={filter}
                  className="px-3 py-1 text-sm rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/tours"
              className="btn-cyber flex items-center space-x-2 text-lg px-8 py-4"
            >
              <Sparkles className="w-5 h-5" />
              <span>Start Virtual Tour</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/ai-guide"
              className="btn-outline-cyber flex items-center space-x-2 text-lg px-8 py-4"
            >
              <span>Meet AI Guide</span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {[
              { value: '0', label: 'Properties Listed' },
              { value: '0', label: 'Active Users' },
              { value: '0', label: 'Property Value Processed' },
              { value: '—', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-secondary">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-sm text-tertiary">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-cyber-blue rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-cyber-blue rounded-full animate-pulse"></div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
