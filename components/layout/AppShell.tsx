'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface AppShellProps {
  children: React.ReactNode
  userEmail: string
  username: string
}

const navItems = [
  { href: '/chat',  label: 'Chat' },
  { href: '/notes', label: 'Notes' },
  { href: '/files', label: 'Files' },
]

export default function AppShell({ children, userEmail, username }: AppShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--m-bg)', position: 'relative', zIndex: 1 }}>
      {/* Top Bar */}
      <div
        className="topbar-line flex items-center flex-shrink-0"
        style={{
          height: 54,
          background: 'var(--m-panel)',
          borderBottom: '1px solid var(--m-border)',
          padding: '0 16px',
          position: 'relative',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mr-1 whitespace-nowrap">
          <span
            style={{
              width: 8,
              height: 8,
              background: 'var(--m-grad)',
              boxShadow: 'var(--m-grad-glow)',
              animation: 'pulse 2.5s ease-in-out infinite',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--m-font-heading)',
              fontSize: 'var(--m-logo-fs)',
              fontWeight: 800,
              background: 'var(--m-grad)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '.07em',
            }}
          >
            Die Matrix
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 18, background: 'var(--m-border2)', margin: '0 16px' }} />

        {/* Tab Navigation */}
        <div className="flex gap-0.5">
          {navItems.map(({ href, label }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                style={{
                  padding: '6px 16px',
                  fontFamily: 'var(--m-font)',
                  fontSize: 12,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  background: active ? 'rgba(68,136,255,.06)' : 'transparent',
                  border: `1px solid ${active ? 'var(--m-border2)' : 'transparent'}`,
                  color: active ? 'var(--m-blue)' : 'var(--m-muted)',
                  borderRadius: 0,
                  transition: 'all .15s',
                  textDecoration: 'none',
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Right side: user + logout */}
        <div className="ml-auto flex items-center gap-3">
          <span className="flex items-center gap-2" style={{ fontSize: 12, color: 'var(--m-muted)', letterSpacing: '.04em' }}>
            <span
              style={{
                width: 7, height: 7,
                borderRadius: '50%',
                background: 'var(--m-green)',
                boxShadow: '0 0 8px var(--m-green)',
              }}
            />
            <b style={{ color: 'var(--m-text2)', fontWeight: 400 }}>{username || userEmail}</b>
          </span>
          <button
            onClick={handleSignOut}
            style={{
              padding: '5px 12px',
              fontFamily: 'var(--m-font)',
              fontSize: 11,
              letterSpacing: '.05em',
              background: 'transparent',
              border: '1px solid var(--m-border)',
              color: 'var(--m-muted)',
              borderRadius: 0,
              cursor: 'pointer',
              transition: 'all .15s',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden" style={{ position: 'relative' }}>
        {children}
      </main>
    </div>
  )
}
