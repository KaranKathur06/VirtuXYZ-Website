'use client'

// Force dynamic rendering
export const dynamic = 'force-dynamic';

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Home, MapPin, BarChart3, LineChart, PieChart, Sparkles } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ParticleBackground from '@/components/effects/ParticleBackground'

export default function AnalyticsPage() {
  const [selectedCity, setSelectedCity] = useState('all')
  const [timeRange, setTimeRange] = useState('6m')

  const marketStats = [
    {
      label: 'Average Price',
      value: '$1.2M',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      label: 'Properties Sold',
      value: '2,847',
      change: '+8.3%',
      trend: 'up',
      icon: Home,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Days on Market',
      value: '32',
      change: '-15.2%',
      trend: 'down',
      icon: TrendingDown,
      color: 'from-blue-500 to-purple-500'
    },
    {
      label: 'Market Score',
      value: '94/100',
      change: '+5.1%',
      trend: 'up',
      icon: BarChart3,
      color: 'from-pink-500 to-red-500'
    }
  ]

  const topCities = [
    { name: 'Manhattan, NY', avgPrice: '$2.8M', growth: '+18.2%', score: 98 },
    { name: 'Beverly Hills, CA', avgPrice: '$4.2M', growth: '+15.7%', score: 96 },
    { name: 'Miami Beach, FL', avgPrice: '$1.9M', growth: '+22.4%', score: 95 },
    { name: 'Austin, TX', avgPrice: '$1.1M', growth: '+28.9%', score: 94 },
    { name: 'Seattle, WA', avgPrice: '$1.5M', growth: '+12.3%', score: 92 }
  ]

  const investmentOpportunities = [
    {
      title: 'Emerging Markets',
      description: 'High-growth areas with strong ROI potential',
      locations: ['Austin', 'Phoenix', 'Nashville'],
      roi: '+25-35%',
      risk: 'Medium'
    },
    {
      title: 'Luxury Segment',
      description: 'Premium properties in established markets',
      locations: ['Manhattan', 'Beverly Hills', 'Malibu'],
      roi: '+15-20%',
      risk: 'Low'
    },
    {
      title: 'Tech Hubs',
      description: 'Properties near major tech company offices',
      locations: ['San Francisco', 'Seattle', 'San Jose'],
      roi: '+20-28%',
      risk: 'Medium'
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
            className="mb-12"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-cyber-blue animate-pulse" />
              <span className="text-sm font-medium">AI-Powered Market Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink bg-clip-text text-transparent">
                Real Estate Analytics
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              Data-driven insights powered by AI to help you make smarter investment decisions
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6 mb-8 flex flex-wrap gap-4"
          >
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="input-cyber flex-1 min-w-[200px]"
            >
              <option value="all">All Cities</option>
              <option value="ny">New York</option>
              <option value="ca">California</option>
              <option value="fl">Florida</option>
              <option value="tx">Texas</option>
            </select>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="input-cyber flex-1 min-w-[200px]"
            >
              <option value="1m">Last Month</option>
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="1y">Last Year</option>
              <option value="all">All Time</option>
            </select>
            <button className="btn-cyber">
              Generate Report
            </button>
          </motion.div>

          {/* Market Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {marketStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="card-cyber"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
                    stat.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="text-sm font-semibold">{stat.change}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Price Trends Chart */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="card-cyber"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Price Trends</h3>
                <LineChart className="w-6 h-6 text-cyber-blue" />
              </div>
              <div className="h-64 bg-gradient-to-br from-cyber-blue/10 to-cyber-purple/10 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-cyber-blue mx-auto mb-4 animate-pulse" />
                  <p className="text-gray-400">Interactive chart visualization</p>
                  <p className="text-sm text-gray-500">Showing 6-month price trends</p>
                </div>
              </div>
            </motion.div>

            {/* Market Distribution */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="card-cyber"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Market Distribution</h3>
                <PieChart className="w-6 h-6 text-cyber-purple" />
              </div>
              <div className="h-64 bg-gradient-to-br from-cyber-purple/10 to-cyber-pink/10 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="w-16 h-16 text-cyber-purple mx-auto mb-4 animate-pulse" />
                  <p className="text-gray-400">Property type distribution</p>
                  <p className="text-sm text-gray-500">By market segment</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Top Cities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-cyber mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Top Performing Cities</h3>
            <div className="space-y-4">
              {topCities.map((city, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{city.name}</h4>
                      <p className="text-sm text-gray-400">Avg: {city.avgPrice}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-green-400 font-semibold">{city.growth}</p>
                      <p className="text-xs text-gray-400">Growth</p>
                    </div>
                    <div className="text-right">
                      <p className="text-cyber-blue font-semibold">{city.score}</p>
                      <p className="text-xs text-gray-400">AI Score</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Investment Opportunities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink bg-clip-text text-transparent">
                AI Investment Recommendations
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {investmentOpportunities.map((opportunity, index) => (
                <div key={index} className="card-cyber">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{opportunity.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      opportunity.risk === 'Low' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {opportunity.risk} Risk
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{opportunity.description}</p>
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">Top Locations:</p>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.locations.map((location, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-cyber-blue/20 text-cyber-blue text-sm">
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-cyber-blue/20">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Expected ROI</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                        {opportunity.roi}
                      </span>
                    </div>
                  </div>
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
