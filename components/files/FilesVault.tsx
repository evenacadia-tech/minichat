'use client'

import { useState, useEffect } from 'react'
import { Lock, KeyRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const VAULT_PASSWORD = 'Orangensaft'
const SESSION_KEY = 'files_vault_unlocked'

interface FilesVaultProps {
  children: React.ReactNode
}

export default function FilesVault({ children }: FilesVaultProps) {
  const [unlocked, setUnlocked] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setUnlocked(sessionStorage.getItem(SESSION_KEY) === '1')
  }, [])

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault()
    if (input === VAULT_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setUnlocked(true)
    } else {
      setError(true)
      setInput('')
      setTimeout(() => setError(false), 1500)
    }
  }

  if (!mounted) return null // avoid SSR hydration mismatch
  if (unlocked) return <>{children}</>

  return (
    <div className="flex-1 flex items-center justify-center">
      <div
        className="w-[340px] p-8 rounded-[8px] flex flex-col items-center gap-5"
        style={{ background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(61,184,204,0.18)' }}
        >
          <Lock size={20} style={{ color: '#3db8cc' }} />
        </div>
        <div className="text-center">
          <h3 className="font-semibold mb-1" style={{ color: '#b8cad8' }}>Dateien-Tresor</h3>
          <p className="text-xs" style={{ color: '#5c7080' }}>Passwort eingeben</p>
        </div>
        <form onSubmit={handleUnlock} className="w-full flex flex-col gap-3">
          <Input
            type="password"
            placeholder="Passwort"
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
            className="bg-transparent"
            style={{ borderColor: error ? '#f87171' : 'rgba(255,255,255,0.07)', color: '#b8cad8' }}
          />
          {error && <p className="text-red-400 text-xs text-center">Falsches Passwort</p>}
          <Button
            type="submit"
            className="gap-2"
            style={{ backgroundColor: '#3db8cc', color: '#141d2b' }}
          >
            <KeyRound size={14} />
            Entsperren
          </Button>
        </form>
      </div>
    </div>
  )
}
