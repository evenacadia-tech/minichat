'use client'

import { useState, useRef, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

interface MessageInputProps {
  userId: string
  username: string
}

export default function MessageInput({ userId, username }: MessageInputProps) {
  const [value, setValue] = useState('')
  const [sending, setSending] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 140) + 'px'
    }
  }, [value])

  async function handleSend() {
    const content = value.trim()
    if (!content) return
    setSending(true)
    setValue('')
    await supabase.from('messages').insert({ user_id: userId, username, content })
    setSending(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className="flex-shrink-0 flex items-end gap-3"
      style={{
        borderTop: '1px solid var(--m-border)',
        padding: '16px 32px 16px 28px',
        background: 'var(--m-panel)',
      }}
    >
      {/* Prompt character */}
      <span
        style={{
          color: 'var(--m-red)',
          fontSize: 18,
          lineHeight: 1,
          flexShrink: 0,
          marginBottom: 13,
          fontFamily: 'var(--m-font)',
          fontWeight: 600,
          opacity: .8,
          textShadow: '0 0 8px rgba(255,184,0,.4)',
        }}
      >
        ›
      </span>

      {/* Input */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message — Enter to send, Shift+Enter for newline"
        rows={1}
        disabled={sending}
        style={{
          flex: 1,
          resize: 'none',
          outline: 'none',
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid var(--m-border2)',
          color: 'var(--m-text)',
          fontFamily: 'var(--m-font)',
          fontSize: 15,
          padding: '8px 0',
          borderRadius: 0,
          minHeight: 42,
          maxHeight: 140,
          lineHeight: 1.6,
          transition: 'border-color .15s',
          fontWeight: 300,
        }}
      />

      {/* Send button */}
      <button
        onClick={handleSend}
        disabled={sending || !value.trim()}
        className="btn-gradient flex items-center justify-center flex-shrink-0"
        style={{
          height: 42,
          width: 42,
          fontSize: 18,
          fontWeight: 700,
          cursor: sending || !value.trim() ? 'default' : 'pointer',
          opacity: !value.trim() ? 0.35 : 1,
        }}
      >
        ↑
      </button>
    </div>
  )
}
