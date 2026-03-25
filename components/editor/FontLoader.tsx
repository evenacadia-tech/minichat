'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeProvider'

// Font names that need loading from Google Fonts (system fonts don't need loading)
const GOOGLE_FONTS = new Set([
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Poppins', 'Nunito',
  'Montserrat', 'Source Sans 3', 'IBM Plex Sans', 'DM Sans', 'Geist',
  'JetBrains Mono', 'Fira Code', 'Source Code Pro', 'IBM Plex Mono', 'Geist Mono',
])

function extractFontName(fontFamily: string): string | null {
  // Get first font from the font-family string, strip quotes
  const first = fontFamily.split(',')[0].trim().replace(/['"]/g, '')
  return GOOGLE_FONTS.has(first) ? first : null
}

export default function FontLoader() {
  const { tokens } = useTheme()
  const loadedRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const fontsToLoad: string[] = []

    for (const val of [tokens.fontFamily, tokens.fontHeading, tokens.fontMono]) {
      const name = extractFontName(val)
      if (name && !loadedRef.current.has(name)) {
        fontsToLoad.push(name)
        loadedRef.current.add(name)
      }
    }

    if (fontsToLoad.length === 0) return

    // Create a <link> for Google Fonts
    const families = fontsToLoad.map(f => f.replace(/ /g, '+')).join('&family=')
    const href = `https://fonts.googleapis.com/css2?family=${families}:wght@300;400;500;600;700&display=swap`

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
  }, [tokens.fontFamily, tokens.fontHeading, tokens.fontMono])

  return null
}
