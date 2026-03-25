import type { Metadata, Viewport } from 'next'
import './globals.css'
import ThemeProvider from '@/components/editor/ThemeProvider'
import EditPanel, { EditToggle } from '@/components/editor/EditPanel'
import FontLoader from '@/components/editor/FontLoader'

export const metadata: Metadata = {
  title: 'Die Matrix',
  description: 'Encrypted communications',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#070810',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Fira+Code:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="h-full antialiased">
        <ThemeProvider>
          {children}
          <FontLoader />
          <EditPanel />
          <EditToggle />
        </ThemeProvider>
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js')
            })
          }
        `}} />
      </body>
    </html>
  )
}
