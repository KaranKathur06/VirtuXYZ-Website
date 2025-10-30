'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Mic, Sparkles, Loader } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI Real Estate Concierge. How can I help you find your perfect property today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    
    // Natural language processing for property search
    if (lowerQuery.includes('dubai') || lowerQuery.includes('uae') || lowerQuery.includes('marina')) {
      if (lowerQuery.includes('villa')) {
        return "I found several luxury villas in Dubai! Let me redirect you to our explore page with filters applied for Dubai villas. Would you like to see properties in Dubai Marina, Palm Jumeirah, or Downtown Dubai?"
      }
      return "Dubai has amazing properties! I can show you apartments, villas, penthouses, and townhouses. What type of property interests you?"
    } else if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('budget')) {
      const priceMatch = lowerQuery.match(/(\d+)\s*(m|million|k|thousand)/i)
      if (priceMatch) {
        return `Perfect! I'll search for properties around ${priceMatch[0]}. Would you like to see properties for sale or rent?`
      }
      return "I can help you find properties within your budget. UAE properties range from 500K AED to 50M+ AED. What's your preferred price range?"
    } else if (lowerQuery.includes('location') || lowerQuery.includes('where') || lowerQuery.includes('area')) {
      return "We have properties across UAE including Dubai Marina, Downtown Dubai, Palm Jumeirah, Business Bay, JBR, and Abu Dhabi. Which area interests you?"
    } else if (lowerQuery.includes('tour') || lowerQuery.includes('visit') || lowerQuery.includes('3d') || lowerQuery.includes('virtual')) {
      return "Excellent! I can start a virtual 3D tour for you right now, or schedule an in-person visit with one of our agents. Which would you prefer?"
    } else if (lowerQuery.includes('bedroom') || lowerQuery.includes('bed') || lowerQuery.includes('bhk')) {
      const bedroomMatch = lowerQuery.match(/(\d+)\s*(bed|bedroom|bhk)/i)
      if (bedroomMatch) {
        return `Great! I'll search for ${bedroomMatch[1]} bedroom properties. Any specific location or price range in mind?`
      }
      return "How many bedrooms are you looking for? I can show you properties from studios to 10+ bedroom estates."
    } else if (lowerQuery.includes('apartment') || lowerQuery.includes('flat')) {
      return "I'll search for apartments for you! Would you prefer a specific area like Dubai Marina, Downtown, or Business Bay? Any budget in mind?"
    } else if (lowerQuery.includes('penthouse')) {
      return "Luxury penthouses are available in prime locations! These typically range from 5M to 50M AED. Interested in sea view or city view?"
    } else if (lowerQuery.includes('invest') || lowerQuery.includes('roi')) {
      return "I can help you find great investment properties! Our AI analytics show strong ROI potential in Dubai Marina and Business Bay. Would you like to see the market analysis?"
    } else if (lowerQuery.includes('compare')) {
      return "I can help you compare properties side by side! Save your favorite properties and I'll create a detailed comparison with AI-powered insights."
    } else if (lowerQuery.includes('agent') || lowerQuery.includes('contact')) {
      return "I can connect you with our top-rated agents who specialize in your area of interest. Would you like me to schedule a call or send their contact details?"
    } else if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
      return "Hello! 👋 I'm your AI Real Estate Assistant. I can help you find properties, schedule tours, analyze market trends, or answer any questions. What are you looking for today?"
    } else {
      return "I understand you're interested in real estate. I can help you with:\n• Property searches in UAE\n• Virtual 3D tours\n• Market analytics & insights\n• Scheduling visits\n• Investment analysis\n\nWhat would you like to explore?"
    }
  }

  const quickActions = [
    'Show me villas in Dubai',
    '3 bedroom apartments',
    'Schedule virtual tour',
    'Investment properties in Marina'
  ]

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple shadow-lg shadow-cyber-blue/50 hover:shadow-cyber-blue/80 transition-all ${
          isOpen ? 'hidden' : 'flex'
        } items-center space-x-2 group`}
      >
        <MessageSquare className="w-6 h-6 text-white" />
        <span className="text-white font-semibold pr-2 hidden group-hover:inline-block">
          AI Assistant
        </span>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] glass rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyber-blue to-cyber-purple p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Sparkles className="w-8 h-8 text-white" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-bold text-white">AI Concierge</h3>
                  <p className="text-xs text-white/80">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 p-3 rounded-2xl flex items-center space-x-2">
                    <Loader className="w-4 h-4 animate-spin text-cyber-blue" />
                    <span className="text-sm text-gray-400">AI is typing...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-400 mb-2">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      onClick={() => setInputValue(action)}
                      className="px-3 py-1 text-xs rounded-full bg-white/5 hover:bg-white/10 border border-cyber-blue/30 hover:border-cyber-blue transition-all"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-cyber-blue/20">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 bg-white/5 border border-cyber-blue/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/50"
                />
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Mic className="w-5 h-5 text-cyber-blue" />
                </button>
                <button
                  onClick={handleSend}
                  className="p-2 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg hover:shadow-lg hover:shadow-cyber-blue/50 transition-all"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
