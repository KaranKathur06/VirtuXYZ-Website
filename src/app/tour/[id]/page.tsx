'use client'

import { use, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Maximize2, Minimize2, Volume2, VolumeX, Info, Map, 
  Compass, Eye, MessageSquare, Share2, Download, ArrowLeft,
  ArrowRight, ZoomIn, ZoomOut, RotateCw, Home, Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

interface TourPageProps {
  params: Promise<{ id: string }>
}

export default function TourPage({ params }: TourPageProps) {
  const { id } = use(params)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [showMinimap, setShowMinimap] = useState(true)
  const [aiGuideActive, setAiGuideActive] = useState(true)
  const [currentRoom, setCurrentRoom] = useState(0)
  const [loading, setLoading] = useState(true)

  const rooms = [
    { id: 0, name: 'Living Room', description: 'Spacious living area with floor-to-ceiling windows' },
    { id: 1, name: 'Kitchen', description: 'Modern kitchen with premium appliances' },
    { id: 2, name: 'Master Bedroom', description: 'Luxurious master suite with ensuite bathroom' },
    { id: 3, name: 'Balcony', description: 'Private balcony with stunning city views' },
    { id: 4, name: 'Bathroom', description: 'Spa-like bathroom with marble finishes' },
  ]

  const hotspots = [
    { x: 30, y: 40, label: 'Smart Lighting', info: 'Voice-controlled LED lighting system' },
    { x: 60, y: 50, label: 'Premium Flooring', info: 'Italian marble flooring throughout' },
    { x: 45, y: 70, label: 'Climate Control', info: 'Smart HVAC system with zone control' },
  ]

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const nextRoom = () => {
    setCurrentRoom((prev) => (prev + 1) % rooms.length)
    toast.success(`Navigating to ${rooms[(currentRoom + 1) % rooms.length].name}`)
  }

  const prevRoom = () => {
    setCurrentRoom((prev) => (prev - 1 + rooms.length) % rooms.length)
    toast.success(`Navigating to ${rooms[(currentRoom - 1 + rooms.length) % rooms.length].name}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyber-darker">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyber-blue mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading 3D Tour...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      {/* 3D Viewer Container */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-darker to-black">
        {/* Placeholder for 3D viewer - Replace with actual 3D library integration */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-64 h-64 mx-auto rounded-full glass flex items-center justify-center">
              <Eye className="w-32 h-32 text-cyber-blue animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold">360° Virtual Tour</h2>
            <p className="text-gray-400">Integrate Matterport, Babylon.js, or Three.js here</p>
            <p className="text-sm text-gray-500">Current Room: {rooms[currentRoom].name}</p>
          </div>

          {/* Interactive Hotspots */}
          {hotspots.map((hotspot, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute cursor-pointer"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              whileHover={{ scale: 1.2 }}
            >
              <div className="relative group">
                <div className="w-8 h-8 rounded-full bg-cyber-blue/30 border-2 border-cyber-blue animate-pulse flex items-center justify-center">
                  <Info className="w-4 h-4 text-cyber-blue" />
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block">
                  <div className="glass rounded-lg p-3 whitespace-nowrap">
                    <div className="font-bold text-sm mb-1">{hotspot.label}</div>
                    <div className="text-xs text-gray-400">{hotspot.info}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4">
        <div className="flex items-center justify-between">
          <Link
            href={`/property/${id}`}
            className="w-12 h-12 rounded-full glass-hover flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </Link>

          <div className="glass rounded-full px-6 py-3">
            <h1 className="text-lg font-bold">Luxury Villa - Virtual Tour</h1>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className={`w-12 h-12 rounded-full glass-hover flex items-center justify-center ${
                showInfo ? 'bg-cyber-blue/20' : ''
              }`}
            >
              <Info className="w-6 h-6" />
            </button>
            <button
              onClick={() => toast.success('Tour shared!')}
              className="w-12 h-12 rounded-full glass-hover flex items-center justify-center"
            >
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-50 space-y-2">
        <button
          onClick={prevRoom}
          className="w-14 h-14 rounded-full glass-hover flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-50 space-y-2">
        <button
          onClick={nextRoom}
          className="w-14 h-14 rounded-full glass-hover flex items-center justify-center"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-50 p-4">
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            {/* Room Navigation */}
            <div className="flex items-center space-x-2 overflow-x-auto">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setCurrentRoom(room.id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    currentRoom === room.id
                      ? 'bg-cyber-blue text-white'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-2">
              <button className="w-10 h-10 rounded-lg glass-hover flex items-center justify-center">
                <ZoomIn className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-lg glass-hover flex items-center justify-center">
                <ZoomOut className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-lg glass-hover flex items-center justify-center">
                <RotateCw className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-lg glass-hover flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-10 h-10 rounded-lg glass-hover flex items-center justify-center"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="w-10 h-10 rounded-lg glass-hover flex items-center justify-center"
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Current Room Info */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">{rooms[currentRoom].name}</h3>
              <p className="text-sm text-gray-400">{rooms[currentRoom].description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Room {currentRoom + 1} of {rooms.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Minimap */}
      <AnimatePresence>
        {showMinimap && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-24 right-4 z-50"
          >
            <div className="glass rounded-xl p-4 w-48">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Map className="w-4 h-4 text-cyber-blue" />
                  <span className="text-sm font-bold">Floor Plan</span>
                </div>
                <button
                  onClick={() => setShowMinimap(false)}
                  className="w-6 h-6 rounded hover:bg-white/10 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center">
                <Home className="w-12 h-12 text-cyber-blue/30" />
              </div>
              <div className="mt-2 text-xs text-center text-gray-400">
                Current: {rooms[currentRoom].name}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Guide */}
      <AnimatePresence>
        {aiGuideActive && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="absolute left-4 bottom-24 z-50 max-w-sm"
          >
            <div className="glass rounded-2xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm">AI Tour Guide</span>
                    <button
                      onClick={() => setAiGuideActive(false)}
                      className="w-6 h-6 rounded hover:bg-white/10 flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Welcome to the {rooms[currentRoom].name}! This space features premium finishes and smart home technology. 
                    Click on the blue hotspots to learn more about specific features.
                  </p>
                  <button className="w-full btn-cyber text-sm py-2 flex items-center justify-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Ask AI Guide</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Property Info Panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="absolute right-4 top-20 bottom-24 z-50 w-80"
          >
            <div className="glass rounded-2xl p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Property Details</h3>
                <button
                  onClick={() => setShowInfo(false)}
                  className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Price</div>
                  <div className="text-2xl font-bold text-cyber-blue">AED 15,000,000</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Bedrooms</div>
                    <div className="text-lg font-bold">5</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Bathrooms</div>
                    <div className="text-lg font-bold">6</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Area</div>
                    <div className="text-lg font-bold">8,500 sqft</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Parking</div>
                    <div className="text-lg font-bold">4</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-2">Features</div>
                  <div className="space-y-2">
                    {['Private Pool', 'Smart Home', 'Beach Access', 'Gym', 'Garden'].map((feature) => (
                      <div key={feature} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/property/${id}`}
                  className="w-full btn-cyber flex items-center justify-center space-x-2"
                >
                  <span>View Full Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button className="w-full btn-outline-cyber flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Download Brochure</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Minimap Button (when hidden) */}
      {!showMinimap && (
        <button
          onClick={() => setShowMinimap(true)}
          className="absolute bottom-24 right-4 z-50 w-12 h-12 rounded-full glass-hover flex items-center justify-center"
        >
          <Map className="w-6 h-6" />
        </button>
      )}

      {/* Toggle AI Guide Button (when hidden) */}
      {!aiGuideActive && (
        <button
          onClick={() => setAiGuideActive(true)}
          className="absolute left-4 bottom-24 z-50 w-12 h-12 rounded-full glass-hover flex items-center justify-center"
        >
          <Sparkles className="w-6 h-6 text-cyber-blue" />
        </button>
      )}
    </div>
  )
}
