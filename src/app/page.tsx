'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/home/Hero'
import FeaturesSection from '@/components/home/FeaturesSection'
import WhatWeDo from '@/components/home/WhatWeDo'
import HowItWorks from '@/components/home/HowItWorks'
import LiveDemos from '@/components/home/LiveDemos'
import Solutions from '@/components/home/Solutions'
import AIShowcase from '@/components/home/AIShowcase'
import FeaturedProperties from '@/components/home/FeaturedProperties'
import StatsSection from '@/components/home/StatsSection'
import TechnologyStack from '@/components/home/TechnologyStack'
import CTASection from '@/components/home/CTASection'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#050816] via-[#020617] to-black">
      {/* Subtle glow background shapes (pure CSS, no canvas/3D for better performance) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-20 w-80 h-80 bg-cyan-500/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-10 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <Navbar />

      <div className="relative z-10">
        <Hero />
        <AIShowcase />
        <FeaturesSection />
        <WhatWeDo />
        <HowItWorks />
        <LiveDemos />
        <Solutions />
        <FeaturedProperties />
        <StatsSection />
        <TechnologyStack />
        <CTASection />
      </div>

      <Footer />
    </main>
  )
}
