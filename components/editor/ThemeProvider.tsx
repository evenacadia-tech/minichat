'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import {
  type ThemeTokens,
  defaultTheme,
  loadTheme,
  saveTheme,
  clearTheme,
  applyThemeToDOM,
} from '@/lib/theme'

interface ThemeContext {
  tokens: ThemeTokens
  update: (partial: Partial<ThemeTokens>) => void
  reset: () => void
  editorOpen: boolean
  setEditorOpen: (open: boolean) => void
}

const Ctx = createContext<ThemeContext | null>(null)

export function useTheme() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider')
  return ctx
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState<ThemeTokens>(defaultTheme)
  const [editorOpen, setEditorOpen] = useState(false)

  // Load saved theme on mount
  useEffect(() => {
    const saved = loadTheme()
    setTokens(saved)
    applyThemeToDOM(saved)
  }, [])

  const update = useCallback((partial: Partial<ThemeTokens>) => {
    setTokens(prev => {
      const next = { ...prev, ...partial }
      applyThemeToDOM(next)
      saveTheme(next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    clearTheme()
    setTokens(defaultTheme)
    applyThemeToDOM(defaultTheme)
  }, [])

  return (
    <Ctx.Provider value={{ tokens, update, reset, editorOpen, setEditorOpen }}>
      {children}
    </Ctx.Provider>
  )
}
