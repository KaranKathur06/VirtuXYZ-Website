'use client'

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
import ParticleBackground from '@/components/effects/ParticleBackground'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <main className="relative min-h-screen">
      <ParticleBackground />
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
