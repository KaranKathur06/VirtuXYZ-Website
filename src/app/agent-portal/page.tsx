'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Image as ImageIcon, Sparkles, Wand2, DollarSign, MapPin, Home, Bed, Bath, Square, Check } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ParticleBackground from '@/components/effects/ParticleBackground'
import toast from 'react-hot-toast'

export default function AgentPortalPage() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login'
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [isRegistering, setIsRegistering] = useState(false)

  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<any>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setUploadedImages(prev => [...prev, ...newImages])
      toast.success(`${files.length} image(s) uploaded successfully`)
    }
  }

  const analyzeWithAI = () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setAiSuggestions({
        title: 'Modern Luxury Villa with Pool',
        description: 'Stunning contemporary villa featuring open-concept living, floor-to-ceiling windows, and premium finishes throughout.',
        price: '$2,850,000',
        beds: 4,
        baths: 3,
        sqft: '3,800',
        features: ['Swimming Pool', 'Smart Home', 'Solar Panels', 'Home Theater'],
        keywords: ['luxury', 'modern', 'pool', 'smart home', 'eco-friendly'],
        seoScore: 94
      })
      setIsAnalyzing(false)
      toast.success('AI analysis complete!')
    }, 2000)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: loginEmail,
        password: loginPassword,
      })

      if (res?.ok) {
        toast.success('Logged in')
        return
      }

      toast.error('Invalid email or password')
    } catch {
      toast.error('Login failed')
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName || !lastName || !phoneNumber || !email || !companyName || !profilePhoto) {
      toast.error('Please fill all required fields')
      return
    }

    setIsRegistering(true)
    try {
      const fd = new FormData()
      fd.append('firstName', firstName)
      fd.append('middleName', middleName)
      fd.append('lastName', lastName)
      fd.append('phoneNumber', phoneNumber)
      fd.append('email', email)
      fd.append('companyName', companyName)
      fd.append('profilePhoto', profilePhoto)

      const res = await fetch('/api/agents/register', {
        method: 'POST',
        body: fd,
      })

      const data = await res.json().catch(() => null)
      if (!res.ok) {
        toast.error(data?.error || 'Registration failed')
        return
      }

      toast.success('Registration submitted. Check your email for credentials.')
      setMode('login')
      setLoginEmail(email)
      setLoginPassword('')
    } catch {
      toast.error('Registration failed')
    } finally {
      setIsRegistering(false)
    }
  }

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
              <span className="text-sm font-medium">AI-Powered Property Listing</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink bg-clip-text text-transparent">
                Agent Portal
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              List properties faster with AI-powered auto-fill, smart pricing, and SEO optimization
            </p>
          </motion.div>

          {status === 'loading' ? (
            <div className="card-cyber max-w-xl mx-auto">
              <p className="text-gray-300">Loading...</p>
            </div>
          ) : !session ? (
            <div className="card-cyber max-w-xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={mode === 'login' ? 'btn-cyber' : 'btn-outline-cyber'}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={mode === 'register' ? 'btn-cyber' : 'btn-outline-cyber'}
                >
                  Register
                </button>
              </div>

              {mode === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      className="input-cyber"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Password</label>
                    <input
                      type="password"
                      className="input-cyber"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="btn-cyber w-full"
                  >
                    {isLoggingIn ? 'Logging in...' : 'Login'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">First Name</label>
                      <input
                        type="text"
                        className="input-cyber"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Middle Name</label>
                      <input
                        type="text"
                        className="input-cyber"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                      <input
                        type="text"
                        className="input-cyber"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Contact Number (with country code)</label>
                    <input
                      type="tel"
                      className="input-cyber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      className="input-cyber"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Company Name</label>
                    <input
                      type="text"
                      className="input-cyber"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Profile Photo (JPG/PNG)</label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      className="input-cyber"
                      onChange={(e) => setProfilePhoto(e.target.files?.[0] ?? null)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isRegistering}
                    className="btn-cyber w-full"
                  >
                    {isRegistering ? 'Submitting...' : 'Submit Registration'}
                  </button>
                </form>
              )}
            </div>
          ) : session.user?.role !== 'AGENT' ? (
            <div className="card-cyber max-w-xl mx-auto text-center">
              <p className="text-gray-300 mb-4">You are logged in but do not have AGENT access.</p>
              <button type="button" className="btn-outline-cyber" onClick={() => signOut()}>
                Sign out
              </button>
            </div>
          ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="card-cyber mb-6">
                <h2 className="text-2xl font-bold text-white mb-4">Upload Property Media</h2>
                
                {/* Upload Area */}
                <label className="block cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-cyber-blue/30 rounded-xl p-12 text-center hover:border-cyber-blue hover:bg-cyber-blue/5 transition-all">
                    <Upload className="w-16 h-16 text-cyber-blue mx-auto mb-4" />
                    <p className="text-lg font-semibold text-white mb-2">
                      Drop images or videos here
                    </p>
                    <p className="text-gray-400 text-sm">
                      or click to browse (Max 50MB per file)
                    </p>
                  </div>
                </label>

                {/* Uploaded Images Preview */}
                {uploadedImages.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm text-gray-400 mb-3">
                      {uploadedImages.length} file(s) uploaded
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {uploadedImages.map((img, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${img})` }}
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button className="p-2 bg-red-500 rounded-lg text-white text-sm">
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Analyze Button */}
                {uploadedImages.length > 0 && (
                  <button
                    onClick={analyzeWithAI}
                    disabled={isAnalyzing}
                    className="btn-cyber w-full mt-6 flex items-center justify-center space-x-2"
                  >
                    <Wand2 className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                    <span>{isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}</span>
                  </button>
                )}
              </div>

              {/* Manual Input Form */}
              <div className="card-cyber">
                <h3 className="text-xl font-bold text-white mb-4">Property Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Property Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Modern Luxury Villa"
                      className="input-cyber"
                      defaultValue={aiSuggestions?.title}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Description</label>
                    <textarea
                      rows={4}
                      placeholder="Describe the property..."
                      className="input-cyber resize-none"
                      defaultValue={aiSuggestions?.description}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Price</label>
                      <input
                        type="text"
                        placeholder="$0"
                        className="input-cyber"
                        defaultValue={aiSuggestions?.price}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Location</label>
                      <input
                        type="text"
                        placeholder="City, State"
                        className="input-cyber"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Beds</label>
                      <input
                        type="number"
                        placeholder="0"
                        className="input-cyber"
                        defaultValue={aiSuggestions?.beds}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Baths</label>
                      <input
                        type="number"
                        placeholder="0"
                        className="input-cyber"
                        defaultValue={aiSuggestions?.baths}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Sqft</label>
                      <input
                        type="text"
                        placeholder="0"
                        className="input-cyber"
                        defaultValue={aiSuggestions?.sqft}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Suggestions Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {aiSuggestions ? (
                <div className="space-y-6">
                  {/* AI Suggestions */}
                  <div className="card-cyber">
                    <div className="flex items-center space-x-2 mb-4">
                      <Sparkles className="w-6 h-6 text-cyber-blue" />
                      <h3 className="text-xl font-bold text-white">AI Suggestions</h3>
                    </div>

                    {/* SEO Score */}
                    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 border border-cyber-blue/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">SEO Score</span>
                        <span className="text-3xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                          {aiSuggestions.seoScore}/100
                        </span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple"
                          style={{ width: `${aiSuggestions.seoScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Suggested Features */}
                    <div className="mb-6">
                      <p className="text-sm text-gray-400 mb-3">Detected Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {aiSuggestions.features.map((feature: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-cyber-blue/20 text-cyber-blue text-sm flex items-center space-x-2"
                          >
                            <Check className="w-4 h-4" />
                            <span>{feature}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* SEO Keywords */}
                    <div>
                      <p className="text-sm text-gray-400 mb-3">Recommended Keywords:</p>
                      <div className="flex flex-wrap gap-2">
                        {aiSuggestions.keywords.map((keyword: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-white/5 border border-cyber-blue/30 text-gray-300 text-sm"
                          >
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing Insights */}
                  <div className="card-cyber">
                    <h3 className="text-xl font-bold text-white mb-4">Pricing Insights</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <span className="text-gray-400">Suggested Price</span>
                        <span className="text-xl font-bold text-cyber-blue">{aiSuggestions.price}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <span className="text-gray-400">Market Average</span>
                        <span className="text-xl font-bold text-gray-300">$2,650,000</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                        <span className="text-gray-400">Competitive Edge</span>
                        <span className="text-xl font-bold text-green-400">+7.5%</span>
                      </div>
                    </div>
                  </div>

                  {/* Market Comparison */}
                  <div className="card-cyber">
                    <h3 className="text-xl font-bold text-white mb-4">Market Comparison</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Similar Properties</span>
                        <span className="text-white font-semibold">24 listings</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Avg. Days on Market</span>
                        <span className="text-white font-semibold">32 days</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Demand Score</span>
                        <span className="text-cyber-blue font-semibold">High (92/100)</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button className="btn-cyber flex-1">
                      Publish Listing
                    </button>
                    <button className="btn-outline-cyber flex-1">
                      Save Draft
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card-cyber h-full flex items-center justify-center">
                  <div className="text-center">
                    <Wand2 className="w-20 h-20 text-cyber-blue/30 mx-auto mb-4" />
                    <p className="text-xl text-gray-400 mb-2">Upload images to get started</p>
                    <p className="text-sm text-gray-500">
                      AI will analyze your property and provide smart suggestions
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
