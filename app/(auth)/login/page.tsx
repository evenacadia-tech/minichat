'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Mode = 'login' | 'register'

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(''); setInfo(''); setLoading(true)
    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push('/chat'); router.refresh()
      } else {
        const { error } = await supabase.auth.signUp({ email, password, options: { data: { username } } })
        if (error) throw error
        setInfo('Account erstellt. Wenn E-Mail-Bestätigung aktiv ist: Postfach prüfen.')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Fehler')
    } finally { setLoading(false) }
  }

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        background: `
          radial-gradient(ellipse 50% 60% at 30% 50%, rgba(255,51,85,.06) 0%, transparent 70%),
          radial-gradient(ellipse 50% 60% at 70% 50%, rgba(68,136,255,.06) 0%, transparent 70%),
          var(--m-bg)`,
        animation: 'fadeIn .5s ease',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        className="auth-brackets"
        style={{
          width: 420,
          background: 'var(--m-panel)',
          border: '1px solid var(--m-border)',
          padding: '40px 36px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          animation: 'fadeUp .45s cubic-bezier(.22,1,.36,1)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <span
            style={{
              width: 10, height: 10,
              background: 'var(--m-grad)',
              boxShadow: 'var(--m-grad-glow)',
              animation: 'pulse 2.5s ease-in-out infinite',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--m-font-heading)',
              fontSize: 28,
              fontWeight: 800,
              background: 'var(--m-grad)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '.06em',
            }}
          >
            Die Matrix
          </span>
        </div>

        <div style={{ fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--m-muted)', marginTop: -10 }}>
          Nur für Mitglieder
        </div>

        {/* Auth Tabs */}
        <div className="flex" style={{ borderBottom: '1px solid var(--m-border)', marginBottom: -4 }}>
          <button
            onClick={() => { setMode('login'); setError(''); setInfo('') }}
            style={{
              padding: '8px 20px',
              cursor: 'pointer',
              color: mode === 'login' ? 'var(--m-blue)' : 'var(--m-muted)',
              borderBottom: `1px solid ${mode === 'login' ? 'var(--m-blue)' : 'transparent'}`,
              marginBottom: -1,
              fontSize: 11,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              fontFamily: 'var(--m-font)',
              background: 'transparent',
              border: 'none',
              borderBottomWidth: 1,
              borderBottomStyle: 'solid',
              borderBottomColor: mode === 'login' ? 'var(--m-blue)' : 'transparent',
              transition: 'color .15s, border-color .15s',
            }}
          >
            Login
          </button>
          <button
            onClick={() => { setMode('register'); setError(''); setInfo('') }}
            style={{
              padding: '8px 20px',
              cursor: 'pointer',
              color: mode === 'register' ? 'var(--m-blue)' : 'var(--m-muted)',
              marginBottom: -1,
              fontSize: 11,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              fontFamily: 'var(--m-font)',
              background: 'transparent',
              border: 'none',
              borderBottomWidth: 1,
              borderBottomStyle: 'solid',
              borderBottomColor: mode === 'register' ? 'var(--m-blue)' : 'transparent',
              transition: 'color .15s, border-color .15s',
            }}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === 'register' && (
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: 11, color: 'var(--m-muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                Display Name
              </label>
              <input
                type="text"
                placeholder="your name"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                style={{
                  width: '100%', padding: '10px 14px',
                  background: 'var(--m-surface)', border: '1px solid var(--m-border)',
                  borderBottomColor: 'var(--m-border2)',
                  color: 'var(--m-text)', fontFamily: 'var(--m-font)', fontSize: 14,
                  outline: 'none', borderRadius: 0, letterSpacing: '.03em',
                  transition: 'border-color .15s, box-shadow .15s',
                }}
              />
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: 11, color: 'var(--m-muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
              Email
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%', padding: '10px 14px',
                background: 'var(--m-surface)', border: '1px solid var(--m-border)',
                borderBottomColor: 'var(--m-border2)',
                color: 'var(--m-text)', fontFamily: 'var(--m-font)', fontSize: 14,
                outline: 'none', borderRadius: 0, letterSpacing: '.03em',
                transition: 'border-color .15s, box-shadow .15s',
              }}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: 11, color: 'var(--m-muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
              Password
            </label>
            <input
              type="password"
              placeholder={mode === 'register' ? 'min. 6 chars' : '••••••••'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%', padding: '10px 14px',
                background: 'var(--m-surface)', border: '1px solid var(--m-border)',
                borderBottomColor: 'var(--m-border2)',
                color: 'var(--m-text)', fontFamily: 'var(--m-font)', fontSize: 14,
                outline: 'none', borderRadius: 0, letterSpacing: '.03em',
                transition: 'border-color .15s, box-shadow .15s',
              }}
            />
          </div>

          {info && (
            <p style={{ color: 'var(--m-muted-hi)', fontSize: 12, lineHeight: 1.75, letterSpacing: '.03em' }}>
              {info}
            </p>
          )}
          {error && (
            <p style={{ color: 'var(--m-red)', fontSize: 12, letterSpacing: '.04em' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gradient"
            style={{
              padding: '11px 20px',
              fontSize: 12,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              cursor: loading ? 'default' : 'pointer',
              opacity: loading ? 0.35 : 1,
            }}
          >
            {mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        <div
          style={{
            fontSize: 11,
            color: 'var(--m-muted)',
            lineHeight: 1.8,
            borderTop: '1px solid var(--m-border)',
            paddingTop: 14,
            opacity: 0.65,
            letterSpacing: '.02em',
          }}
        >
          Hinweis: E-Mail-Bestätigung muss im Supabase Dashboard unter
          Auth &rarr; Settings deaktiviert sein.
        </div>
      </div>
    </div>
  )
}
