'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Mic, MapPin, Home, DollarSign, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [propertyType, setPropertyType] = useState('all')
  const [priceRange, setPriceRange] = useState('any')
  const [isListening, setIsListening] = useState(false)

  const handleVoiceSearch = () => {
    // Guard against environments where window or webkitSpeechRecognition is not available
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Hero background video from /public */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/image0 (1).png"
        >
          <source src="/demo%20gif.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(236,72,153,0.16),_transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-cyber-darker/70 to-cyber-darker" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* AI Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-cyber-blue animate-pulse" />
            <span className="text-sm font-medium">Powered by Advanced AI Technology</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-cyber-blue to-cyber-purple bg-clip-text text-transparent">
              The Future of
            </span>
            <br />
            <span className="text-white">Real Estate</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-secondary mb-12 max-w-3xl mx-auto"
          >
            Experience properties like never before with AI-guided virtual tours, 
            smart analytics, and immersive 3D exploration
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass rounded-2xl p-4 md:p-6 max-w-4xl mx-auto mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Location Search */}
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-blue" />
                <input
                  type="text"
                  placeholder="Enter location, city, or neighborhood..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white/5 border border-cyber-blue/30 rounded-xl text-primary placeholder-gray-400 focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/50"
                />
                <button
                  onClick={handleVoiceSearch}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all ${
                    isListening ? 'bg-red-500 animate-pulse' : 'hover:bg-white/10'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>

              {/* Property Type */}
              <div className="relative">
                <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-blue pointer-events-none" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full md:w-48 pl-12 pr-4 py-4 bg-white/5 border border-cyber-blue/30 rounded-xl text-primary focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/50 appearance-none cursor-pointer"
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
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-blue pointer-events-none" />
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full md:w-48 pl-12 pr-4 py-4 bg-white/5 border border-cyber-blue/30 rounded-xl text-primary focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/50 appearance-none cursor-pointer"
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
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-cyber-blue/20">
              <span className="text-sm text-tertiary">Popular:</span>
              {['Luxury Apartments', 'Smart Homes', 'Eco-Friendly', 'Waterfront'].map((filter) => (
                <button
                  key={filter}
                  className="px-3 py-1 text-sm rounded-full bg-white/5 hover:bg-cyber-blue/20 border border-cyber-blue/30 hover:border-cyber-blue transition-all"
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
              { value: '50K+', label: 'Properties' },
              { value: '10K+', label: 'Virtual Tours' },
              { value: '98%', label: 'Satisfaction' },
              { value: '24/7', label: 'AI Support' },
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
