'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import MessageBubble from './MessageBubble'
import type { Message } from '@/lib/supabase/types'

// Module-level singleton — stable across renders, no re-subscription churn
const supabase = createClient()

interface MessageListProps {
  initialMessages: Message[]
  currentUserId: string
}

export default function MessageList({ initialMessages, currentUserId }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Supabase Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message])
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return (
    <div className="flex-1 overflow-y-auto py-3 flex flex-col gap-1">
      {messages.length === 0 && (
        <p className="text-center text-xs mt-8" style={{ color: '#3a5060' }}>
          Noch keine Nachrichten. Schreib etwas!
        </p>
      )}
      {messages.map(msg => (
        <MessageBubble
          key={msg.id}
          message={msg}
          isOwn={msg.user_id === currentUserId}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
