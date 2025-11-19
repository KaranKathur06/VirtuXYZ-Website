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
import { useTheme } from '@/lib/theme-context'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const sectionBgClass = theme === 'light' ? 'bg-white text-neutral-900' : 'bg-[#050816] text-white'

  return (
    <main className={`relative min-h-screen transition-colors duration-500 ${sectionBgClass}`}>
      <Navbar />
      
        <Hero />

      <div className={`relative z-10 ${sectionBgClass}`}>
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
