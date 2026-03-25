'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { MessageSquare, FileText, Lock, LogOut } from 'lucide-react'

interface AppShellProps {
  children: React.ReactNode
  userEmail: string
  username: string
}

const navItems = [
  { href: '/chat',  icon: MessageSquare, label: 'Chats' },
  { href: '/notes', icon: FileText,      label: 'Notizen' },
  { href: '/files', icon: Lock,          label: 'Dateien', locked: true },
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
    <div className="flex h-screen overflow-hidden" style={{ background: '#141d2b' }}>
      {/* Sidebar */}
      <aside
        className="w-[200px] flex-shrink-0 flex flex-col"
        style={{ background: 'rgba(255,255,255,0.025)', borderRight: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Logo */}
        <div className="px-4 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#3db8cc' }}>
            DIE MATRIX
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 flex flex-col gap-0.5 px-2">
          {navItems.map(({ href, icon: Icon, label, locked }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-sm transition-colors"
                style={{
                  background: active ? 'rgba(61,184,204,0.20)' : 'transparent',
                  color: active ? '#3db8cc' : '#5c7080',
                }}
              >
                <Icon size={15} />
                <span>{label}</span>
                {locked && !active && (
                  <Lock size={10} style={{ marginLeft: 'auto', color: '#3a5060' }} />
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Footer */}
        <div
          className="px-3 py-3 border-t flex items-center gap-2.5"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: 'rgba(61,184,204,0.18)', color: '#3db8cc' }}
          >
            {(username || userEmail).charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs truncate" style={{ color: '#b8cad8' }}>{username || userEmail}</p>
          </div>
          <button
            onClick={handleSignOut}
            title="Ausloggen"
            style={{ color: '#3a5060' }}
          >
            <LogOut size={13} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden" style={{ background: '#111824' }}>
        {children}
      </main>
    </div>
  )
}
