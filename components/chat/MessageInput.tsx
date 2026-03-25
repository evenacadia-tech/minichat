'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

const supabase = createClient()

interface MessageInputProps {
  userId: string
  username: string
}

export default function MessageInput({ userId, username }: MessageInputProps) {
  const [value, setValue] = useState('')
  const [sending, setSending] = useState(false)

  async function handleSend() {
    const content = value.trim()
    if (!content) return
    setSending(true)
    setValue('')

    await supabase.from('messages').insert({
      user_id: userId,
      username,
      content,
    })

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
      className="px-4 py-3 flex gap-2 items-end border-t"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nachricht schreiben… (Shift+Enter für Zeilenumbruch)"
        rows={1}
        className="flex-1 resize-none outline-none py-2 px-3 rounded-[8px] min-h-[36px] max-h-[120px] text-sm"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.07)',
          color: '#b8cad8',
        }}
      />
      <Button
        onClick={handleSend}
        disabled={sending || !value.trim()}
        size="sm"
        className="h-9 w-9 p-0 flex-shrink-0"
        style={{ backgroundColor: '#3db8cc', color: '#141d2b' }}
      >
        <Send size={14} />
      </Button>
    </div>
  )
}
