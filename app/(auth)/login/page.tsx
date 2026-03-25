'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Mode = 'login' | 'register'

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push('/chat')
        router.refresh()
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { username } },
        })
        if (error) throw error
        setError('Bestätigungs-E-Mail gesendet. Bitte E-Mail prüfen.')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Fehler')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#141d2b' }}>
      <div
        className="w-[400px] p-8 rounded-[8px] flex flex-col gap-5"
        style={{
          background: 'rgba(255,255,255,0.045)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-widest uppercase mb-1" style={{ color: '#3db8cc' }}>
            DIE MATRIX
          </h1>
          <p className="text-xs tracking-wider" style={{ color: '#5c7080' }}>
            {mode === 'login' ? 'ZUGANG ANFORDERN' : 'KONTO ERSTELLEN'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === 'register' && (
            <Input
              placeholder="Benutzername"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="bg-transparent"
              style={{ borderColor: 'rgba(255,255,255,0.07)', color: '#b8cad8' }}
            />
          )}
          <Input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="bg-transparent"
            style={{ borderColor: 'rgba(255,255,255,0.07)', color: '#b8cad8' }}
          />
          <Input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="bg-transparent"
            style={{ borderColor: 'rgba(255,255,255,0.07)', color: '#b8cad8' }}
          />

          {error && (
            <p className="text-xs text-red-400 text-center">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="font-semibold tracking-wider"
            style={{ backgroundColor: '#3db8cc', color: '#141d2b' }}
          >
            {loading ? '...' : mode === 'login' ? 'Einloggen' : 'Registrieren'}
          </Button>
        </form>

        <button
          onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
          className="text-xs text-center transition-colors"
          style={{ color: '#5c7080' }}
        >
          {mode === 'login' ? 'Noch kein Konto? Registrieren' : 'Bereits registriert? Einloggen'}
        </button>
      </div>
    </div>
  )
}
