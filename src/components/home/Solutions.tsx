'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Users, TrendingUp, Heart, Building2, ThumbsUp } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function Solutions() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const solutions = [
    {
      icon: Users,
      title: 'For Families',
      description: 'Find your dream home with AI-guided tours and personalized recommendations for family living',
      features: [
        'Virtual Open Houses',
        'Neighborhood Insights',
        'School District Info',
        'Family-Friendly Filters'
      ],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: TrendingUp,
      title: 'For Investors',
      description: 'Make data-driven investment decisions with comprehensive analytics and market insights',
      features: [
        'ROI Calculator',
        'Market Trends',
        'Investment Analytics',
        'Portfolio Tracking'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'For Lifestyle Seekers',
      description: 'Discover properties that match your lifestyle with AI-powered preference matching',
      features: [
        'Lifestyle Matching',
        'Amenity Finder',
        'Community Vibe',
        'Personalized Tours'
      ],
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: Building2,
      title: 'For Real-Estate Agencies',
      description: 'Empower your sales with immersive 3D tours and AI assistants available on-demand',
      features: [
        'Virtual Open Houses',
        'Lead Generation',
        'Analytics Dashboard',
        'Client Management'
      ],
      color: 'from-green-500 to-teal-500'
    }
  ]

  return (
    <section id="solutions" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary">Solutions for </span>
            <span className="text-accent">
              Everyone
            </span>
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Tailored experiences for realtors, developers, and homebuyers
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative"
            >
              <div className="card-cyber h-full flex flex-col hover:scale-105 transition-transform duration-300">
                {/* Icon with gradient background */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`}></div>
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl`}>
                    <solution.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-primary group-hover:text-accent transition-colors flex items-center gap-3">
                  {solution.title}
                </h3>
                <p className="text-secondary leading-relaxed mb-6 flex-grow">
                  {solution.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-4">
                  {solution.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 }}
                      className="flex items-center space-x-2 text-base md:text-sm text-secondary"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue"></div>
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Learn More Button */}
                <Link
                  href="/contact"
                  className="mt-auto w-full py-3 rounded-lg border border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 transition-all text-sm font-semibold text-center"
                >
                  Learn More
                </Link>

                {/* AI Avatar Reaction on Hover */}
                <AnimatePresence>
                  {hoveredCard === index && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center shadow-lg"
                    >
                      <ThumbsUp className="w-6 h-6 text-white" fill="white" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple group-hover:w-full transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
