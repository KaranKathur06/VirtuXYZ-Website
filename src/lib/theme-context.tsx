'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load theme from localStorage or system preference
    const savedTheme = localStorage.getItem('virtuxyz-theme') as Theme
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme || systemTheme
    setThemeState(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    document.documentElement.classList.toggle('light', initialTheme === 'light')
  }, [])

  const setTheme = (newTheme: Theme) => {
    if (mounted) {
      setThemeState(newTheme)
      localStorage.setItem('virtuxyz-theme', newTheme)
      document.documentElement.classList.remove('dark', 'light')
      document.documentElement.classList.add(newTheme)
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  // Always provide context, even during SSR, to prevent errors
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
