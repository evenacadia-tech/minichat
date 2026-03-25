'use client'

import { useState, useEffect } from 'react'

const VAULT_PASSWORD = 'Orangensaft'
const SESSION_KEY = 'files_vault_unlocked'

export default function FilesVault({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true); setUnlocked(sessionStorage.getItem(SESSION_KEY) === '1') }, [])

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault()
    if (input === VAULT_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1'); setUnlocked(true)
    } else {
      setError(true); setInput(''); setTimeout(() => setError(false), 1500)
    }
  }

  if (!mounted) return null
  if (unlocked) return <>{children}</>

  return (
    <div className="flex-1 flex items-center justify-center">
      <div
        className="auth-brackets flex flex-col items-center gap-5"
        style={{
          width: 340,
          padding: 'var(--m-editor-p)',
          background: 'var(--m-panel)',
          border: '1px solid var(--m-border)',
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: 48, height: 48,
            background: 'rgba(68,136,255,.08)',
            fontSize: 24,
            color: 'var(--m-blue)',
          }}
        >
          ◈
        </div>
        <div className="text-center">
          <h3
            style={{
              fontFamily: 'var(--m-font-heading)',
              fontWeight: 700,
              color: 'var(--m-text)',
              marginBottom: 4,
            }}
          >
            Dateien-Tresor
          </h3>
          <p style={{ fontSize: 11, color: 'var(--m-muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Passwort eingeben
          </p>
        </div>
        <form onSubmit={handleUnlock} className="w-full flex flex-col gap-3">
          <input
            type="password"
            placeholder="Passwort"
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
            style={{
              width: '100%', padding: '10px 14px',
              background: 'var(--m-surface)', border: `1px solid ${error ? '#FF4466' : 'var(--m-border)'}`,
              borderBottomColor: error ? '#FF4466' : 'var(--m-border2)',
              color: 'var(--m-text)', fontFamily: 'var(--m-font)', fontSize: 14,
              outline: 'none', borderRadius: 0,
              transition: 'border-color .15s, box-shadow .15s',
            }}
          />
          {error && (
            <p style={{ color: 'var(--m-red)', fontSize: 12, textAlign: 'center', letterSpacing: '.04em' }}>
              Falsches Passwort
            </p>
          )}
          <button
            type="submit"
            className="btn-gradient"
            style={{
              padding: '11px 20px',
              fontSize: 12,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Entsperren
          </button>
        </form>
      </div>
    </div>
  )
}
