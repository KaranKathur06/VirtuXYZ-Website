'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background with gradient and effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue via-cyber-purple to-cyber-pink opacity-20"></div>
          <div className="absolute inset-0 cyber-grid opacity-10"></div>
          
          {/* Content */}
          <div className="relative glass p-12 md:p-20 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6"
            >
              <Sparkles className="w-4 h-4 text-cyber-blue animate-pulse" />
              <span className="text-sm font-medium">Start Your Journey Today</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-primary">Ready to Experience</span>
              <br />
              <span className="text-accent">
                The Future of Real Estate?
              </span>
            </h2>

            <p className="text-xl text-secondary mb-10 max-w-2xl mx-auto">
              Get early access as we build AI-powered real estate experiences.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/explore"
                className="btn-cyber flex items-center space-x-2 text-lg px-8 py-4"
              >
                <span>Start Exploring</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/agent-portal"
                className="btn-outline-cyber flex items-center space-x-2 text-lg px-8 py-4"
              >
                <span>List Your Property</span>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-cyber-blue/20">
              <p className="text-tertiary mb-4">Partner integrations coming soon</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
