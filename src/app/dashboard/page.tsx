'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, Eye, Calendar, TrendingUp, Bell, Settings, 
  Home, Search, MessageSquare, Download, Filter, MapPin,
  DollarSign, Sparkles, BarChart3, Clock, CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const savedProperties = [
    {
      id: '1',
      title: 'Luxury Villa in Palm Jumeirah',
      price: 15000000,
      currency: 'AED',
      location: 'Palm Jumeirah, Dubai',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400',
      bedrooms: 5,
      bathrooms: 6,
      area: 8500,
      savedDate: '2024-03-15',
      priceChange: '+2.5%'
    },
    {
      id: '2',
      title: 'Modern Apartment in Downtown',
      price: 3500000,
      currency: 'AED',
      location: 'Downtown Dubai',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
      bedrooms: 3,
      bathrooms: 3,
      area: 2200,
      savedDate: '2024-03-14',
      priceChange: '-1.2%'
    },
  ]

  const recentSearches = [
    { query: '3 bedroom apartments in Marina', date: '2024-03-16', results: 45 },
    { query: 'Villas under 10M AED', date: '2024-03-15', results: 23 },
    { query: 'Penthouses with sea view', date: '2024-03-14', results: 12 },
  ]

  const scheduledVisits = [
    {
      id: '1',
      property: 'Luxury Villa in Palm Jumeirah',
      date: '2024-03-20',
      time: '10:00 AM',
      agent: 'Sarah Johnson',
      status: 'confirmed'
    },
    {
      id: '2',
      property: 'Modern Apartment in Downtown',
      date: '2024-03-22',
      time: '2:00 PM',
      agent: 'Michael Chen',
      status: 'pending'
    },
  ]

  const aiRecommendations = [
    {
      id: '3',
      title: 'Beachfront Villa in Jumeirah',
      price: 12000000,
      currency: 'AED',
      location: 'Jumeirah, Dubai',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
      matchScore: 95,
      reason: 'Matches your preference for waterfront properties'
    },
    {
      id: '4',
      title: 'Penthouse in Business Bay',
      price: 4500000,
      currency: 'AED',
      location: 'Business Bay, Dubai',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
      matchScore: 88,
      reason: 'Similar to your recently viewed properties'
    },
  ]

  const stats = [
    { label: 'Saved Properties', value: savedProperties.length, icon: Heart, color: 'text-red-400' },
    { label: 'Properties Viewed', value: 24, icon: Eye, color: 'text-cyber-blue' },
    { label: 'Scheduled Visits', value: scheduledVisits.length, icon: Calendar, color: 'text-cyber-purple' },
    { label: 'AI Recommendations', value: aiRecommendations.length, icon: Sparkles, color: 'text-green-400' },
  ]

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
            <p className="text-gray-400">Track your property search journey</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <div className="text-3xl font-bold">{stat.value}</div>
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <div className="glass rounded-xl overflow-hidden mb-8">
            <div className="flex border-b border-cyber-blue/20 overflow-x-auto">
              {['overview', 'saved', 'visits', 'recommendations', 'activity'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium capitalize whitespace-nowrap transition-colors ${
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
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Link href="/explore" className="glass-hover rounded-xl p-6 flex items-center space-x-4">
                        <Search className="w-8 h-8 text-cyber-blue" />
                        <div>
                          <div className="font-bold">Search Properties</div>
                          <div className="text-sm text-gray-400">Find your dream home</div>
                        </div>
                      </Link>
                      <Link href="/tours" className="glass-hover rounded-xl p-6 flex items-center space-x-4">
                        <Eye className="w-8 h-8 text-cyber-purple" />
                        <div>
                          <div className="font-bold">Virtual Tours</div>
                          <div className="text-sm text-gray-400">Explore in 3D</div>
                        </div>
                      </Link>
                      <Link href="/analytics" className="glass-hover rounded-xl p-6 flex items-center space-x-4">
                        <BarChart3 className="w-8 h-8 text-green-400" />
                        <div>
                          <div className="font-bold">Market Analytics</div>
                          <div className="text-sm text-gray-400">View insights</div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {[
                        { icon: Heart, text: 'Saved Luxury Villa in Palm Jumeirah', time: '2 hours ago', color: 'text-red-400' },
                        { icon: Eye, text: 'Viewed Modern Apartment in Downtown', time: '5 hours ago', color: 'text-cyber-blue' },
                        { icon: Calendar, text: 'Scheduled visit for tomorrow', time: '1 day ago', color: 'text-cyber-purple' },
                        { icon: MessageSquare, text: 'Contacted agent Sarah Johnson', time: '2 days ago', color: 'text-green-400' },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
                          <activity.icon className={`w-5 h-5 ${activity.color}`} />
                          <div className="flex-1">
                            <div className="text-sm">{activity.text}</div>
                            <div className="text-xs text-gray-400">{activity.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Saved Properties Tab */}
              {activeTab === 'saved' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Saved Properties ({savedProperties.length})</h3>
                    <button className="btn-outline-cyber flex items-center space-x-2">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedProperties.map((property) => (
                      <div key={property.id} className="glass rounded-xl overflow-hidden group">
                        <div className="relative h-48">
                          <Image
                            src={property.image}
                            alt={property.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute top-3 right-3 flex gap-2">
                            <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-red-500 transition-colors">
                              <Heart className="w-5 h-5 fill-current" />
                            </button>
                          </div>
                          {property.priceChange && (
                            <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-medium ${
                              property.priceChange.startsWith('+') 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {property.priceChange}
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-lg mb-2">{property.title}</h4>
                          <div className="flex items-center text-sm text-gray-400 mb-3">
                            <MapPin className="w-4 h-4 mr-1" />
                            {property.location}
                          </div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="text-2xl font-bold text-cyber-blue">
                              {property.currency} {property.price.toLocaleString()}
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                            <span>{property.bedrooms} Beds</span>
                            <span>{property.bathrooms} Baths</span>
                            <span>{property.area} sqft</span>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/property/${property.id}`} className="flex-1 btn-cyber text-center py-2">
                              View Details
                            </Link>
                            <Link href={`/tour/${property.id}`} className="flex-1 btn-outline-cyber text-center py-2">
                              Virtual Tour
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Scheduled Visits Tab */}
              {activeTab === 'visits' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Scheduled Visits ({scheduledVisits.length})</h3>
                    <button className="btn-cyber flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Schedule New Visit</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {scheduledVisits.map((visit) => (
                      <div key={visit.id} className="glass rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-bold text-lg mb-2">{visit.property}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {visit.date}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {visit.time}
                              </div>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            visit.status === 'confirmed' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {visit.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-cyber-blue/20">
                          <div className="text-sm">
                            <span className="text-gray-400">Agent: </span>
                            <span className="font-medium">{visit.agent}</span>
                          </div>
                          <div className="flex gap-2">
                            <button className="btn-outline-cyber text-sm py-2 px-4">Reschedule</button>
                            <button className="btn-cyber text-sm py-2 px-4">Get Directions</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Recommendations Tab */}
              {activeTab === 'recommendations' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-cyber-blue" />
                        AI Recommendations
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">Properties matched to your preferences</p>
                    </div>
                    <button className="btn-outline-cyber flex items-center space-x-2">
                      <Settings className="w-4 h-4" />
                      <span>Preferences</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {aiRecommendations.map((property) => (
                      <div key={property.id} className="glass rounded-xl overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={property.image}
                            alt={property.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-green-500/90 text-white text-sm font-medium flex items-center gap-1">
                            <Sparkles className="w-4 h-4" />
                            {property.matchScore}% Match
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-lg mb-2">{property.title}</h4>
                          <div className="flex items-center text-sm text-gray-400 mb-3">
                            <MapPin className="w-4 h-4 mr-1" />
                            {property.location}
                          </div>
                          <div className="text-2xl font-bold text-cyber-blue mb-3">
                            {property.currency} {property.price.toLocaleString()}
                          </div>
                          <div className="p-3 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30 mb-4">
                            <p className="text-sm text-gray-300">{property.reason}</p>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/property/${property.id}`} className="flex-1 btn-cyber text-center py-2">
                              View Property
                            </Link>
                            <button className="w-10 h-10 rounded-lg glass-hover flex items-center justify-center">
                              <Heart className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Search History</h3>
                  <div className="space-y-3">
                    {recentSearches.map((search, index) => (
                      <div key={index} className="glass-hover rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Search className="w-5 h-5 text-cyber-blue" />
                          <div>
                            <div className="font-medium">{search.query}</div>
                            <div className="text-sm text-gray-400">{search.results} results • {search.date}</div>
                          </div>
                        </div>
                        <button className="btn-outline-cyber text-sm py-2 px-4">Search Again</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
