'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import MessageBubble from './MessageBubble'
import type { Message } from '@/lib/supabase/types'

const supabase = createClient()

interface MessageListProps {
  initialMessages: Message[]
  currentUserId: string
}

export default function MessageList({ initialMessages, currentUserId }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const channel = supabase
      .channel('messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => { setMessages(prev => [...prev, payload.new as Message]) })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  return (
    <div
      className="flex-1 overflow-y-auto flex flex-col"
      style={{
        padding: '28px 32px 20px 32px',
        gap: 'var(--m-msg-gap)',
        background: 'linear-gradient(180deg, rgba(68,136,255,.025) 0%, transparent 140px)',
      }}
    >
      {messages.length === 0 && (
        <div
          className="flex-1 flex items-center justify-center flex-col gap-3.5"
          style={{ color: 'var(--m-muted)', fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase' }}
        >
          <span style={{ fontSize: 36, opacity: .25, color: 'var(--m-blue)' }}>◈</span>
          No messages yet
        </div>
      )}
      {messages.map(msg => (
        <MessageBubble key={msg.id} message={msg} isOwn={msg.user_id === currentUserId} />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
