'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Play, Headphones, Maximize, MessageSquare, Camera, Navigation } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ParticleBackground from '@/components/effects/ParticleBackground'

export default function ToursPage() {
  const [selectedTour, setSelectedTour] = useState<number | null>(null)
  const [isVRMode, setIsVRMode] = useState(false)
  const [aiGuideActive, setAiGuideActive] = useState(false)

  const tours = [
    {
      id: 1,
      title: 'Luxury Penthouse Tour',
      location: 'Manhattan, NY',
      duration: '12 min',
      views: '2.5K',
      thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      featured: true
    },
    {
      id: 2,
      title: 'Modern Villa Experience',
      location: 'Beverly Hills, CA',
      duration: '15 min',
      views: '3.2K',
      thumbnail: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      featured: true
    },
    {
      id: 3,
      title: 'Smart Home Showcase',
      location: 'Austin, TX',
      duration: '10 min',
      views: '1.8K',
      thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      featured: false
    },
    {
      id: 4,
      title: 'Waterfront Estate',
      location: 'Miami Beach, FL',
      duration: '18 min',
      views: '4.1K',
      thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      featured: false
    }
  ]

  return (
    <main className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />

      <div className="relative z-10 pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-cyber-blue animate-pulse" />
              <span className="text-sm font-medium">Immersive 3D Virtual Tours</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink bg-clip-text text-transparent">
                Virtual Property Tours
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience properties like never before with AI-guided 3D tours, VR support, and real-time insights
            </p>
          </motion.div>

          {/* Featured Tour Player */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl overflow-hidden mb-12"
          >
            <div className="aspect-video bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 relative group">
              {/* Tour Player Interface */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-cyber-blue/50">
                  <Play className="w-10 h-10 text-white ml-1" />
                </button>
              </div>

              {/* Tour Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-cyber-darker to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Luxury Penthouse Tour</h3>
                    <p className="text-gray-300">Manhattan, NY • 12 minutes</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setAiGuideActive(!aiGuideActive)}
                      className={`p-3 rounded-lg transition-all ${
                        aiGuideActive ? 'bg-cyber-blue text-white' : 'glass hover:bg-white/10'
                      }`}
                    >
                      <Headphones className="w-5 h-5" />
                    </button>
                    <button className="p-3 glass rounded-lg hover:bg-white/10 transition-colors">
                      <MessageSquare className="w-5 h-5" />
                    </button>
                    <button className="p-3 glass rounded-lg hover:bg-white/10 transition-colors">
                      <Camera className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setIsVRMode(!isVRMode)}
                      className={`p-3 rounded-lg transition-all ${
                        isVRMode ? 'bg-cyber-purple text-white' : 'glass hover:bg-white/10'
                      }`}
                    >
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-gradient-to-r from-cyber-blue to-cyber-purple"></div>
                </div>
              </div>

              {/* AI Guide Indicator */}
              {aiGuideActive && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute top-6 right-6 glass rounded-2xl p-4 max-w-sm"
                >
                  <div className="flex items-start space-x-3">
                    <Sparkles className="w-6 h-6 text-cyber-blue animate-pulse flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold mb-1">AI Guide Active</p>
                      <p className="text-xs text-gray-400">
                        "Welcome to this stunning penthouse. Let me show you the living room with panoramic city views..."
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Tour Info Panel */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Navigation className="w-8 h-8 text-cyber-blue mx-auto mb-2" />
                <p className="text-sm text-gray-400">360° Navigation</p>
              </div>
              <div className="text-center">
                <Headphones className="w-8 h-8 text-cyber-purple mx-auto mb-2" />
                <p className="text-sm text-gray-400">AI Voice Guide</p>
              </div>
              <div className="text-center">
                <MessageSquare className="w-8 h-8 text-cyber-pink mx-auto mb-2" />
                <p className="text-sm text-gray-400">Live Q&A</p>
              </div>
              <div className="text-center">
                <Maximize className="w-8 h-8 text-cyber-blue mx-auto mb-2" />
                <p className="text-sm text-gray-400">VR Compatible</p>
              </div>
            </div>
          </motion.div>

          {/* Tour Gallery */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-white">Available Tours</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-cyber p-0 overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedTour(tour.id)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${tour.thumbnail})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker to-transparent"></div>
                    
                    {tour.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full text-xs font-semibold">
                        FEATURED
                      </div>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple flex items-center justify-center">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyber-blue transition-colors">
                      {tour.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">{tour.location}</p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{tour.duration}</span>
                      <span>{tour.views} views</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink bg-clip-text text-transparent">
                Tour Features
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: 'AI-Powered Guidance',
                  description: 'Interactive AI guide answers questions and provides insights in real-time'
                },
                {
                  icon: Maximize,
                  title: 'VR Compatible',
                  description: 'Fully immersive experience with VR headset support'
                },
                {
                  icon: Camera,
                  title: 'High-Quality 3D',
                  description: 'Photorealistic 3D models with 4K resolution textures'
                }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
