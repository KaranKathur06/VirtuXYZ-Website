    'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Building, Award } from 'lucide-react'

export default function StatsSection() {
  const stats = [
    {
      icon: Building,
      value: '50,000+',
      label: 'Properties Listed',
      description: 'Across 100+ cities',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Users,
      value: '2M+',
      label: 'Happy Customers',
      description: 'Worldwide users',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      value: '$50B+',
      label: 'Property Value',
      description: 'Total transactions',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Award,
      value: '98%',
      label: 'Satisfaction Rate',
      description: 'Customer reviews',
      color: 'from-pink-500 to-red-500'
    }
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 cyber-grid opacity-5"></div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink bg-clip-text text-transparent">
                  Trusted by Millions
                </span>
              </h2>
              <p className="text-xl text-secondary">
                Leading the future of real estate technology
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="relative inline-block mb-4">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity rounded-full`}></div>
                    <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xl font-semibold text-primary mb-1">
                    {stat.label}
                  </div>
                  <div className="text-secondary">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
