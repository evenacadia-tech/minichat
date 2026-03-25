import type { Message } from '@/lib/supabase/types'

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const time = new Date(message.created_at).toLocaleTimeString('de', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className={`msg-terminal${isOwn ? ' own' : ''}`}>
      {/* Meta: name + time */}
      <div
        className="flex flex-col items-end gap-0.5 flex-shrink-0"
        style={{ width: 90 }}
      >
        <span
          style={{
            color: isOwn ? 'var(--m-red)' : 'var(--m-blue)',
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {message.username}
        </span>
        <span
          style={{
            color: 'var(--m-muted)',
            fontSize: 10,
            letterSpacing: '.04em',
            whiteSpace: 'nowrap',
          }}
        >
          {time}
        </span>
      </div>

      {/* Content */}
      <div
        className="flex-1"
        style={{
          fontSize: 15,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          color: 'var(--m-text)',
          lineHeight: 1.7,
          fontWeight: 300,
          paddingTop: 1,
        }}
      >
        {message.content}
      </div>
    </div>
  )
}
