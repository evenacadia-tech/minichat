import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { formatDate } from '@/lib/utils'
import type { Message } from '@/lib/supabase/types'

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div className={`flex gap-2.5 px-4 py-1 ${isOwn ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
        style={{ background: 'rgba(61,184,204,0.18)', color: '#3db8cc' }}
      >
        {message.username.charAt(0).toUpperCase()}
      </div>

      <div className={`flex flex-col gap-0.5 max-w-[75%] ${isOwn ? 'items-end' : ''}`}>
        {/* Name + time */}
        <div className={`flex items-baseline gap-1.5 text-xs ${isOwn ? 'flex-row-reverse' : ''}`} style={{ color: '#5c7080' }}>
          <span className="font-medium">{message.username}</span>
          <span style={{ color: '#3a5060' }}>{formatDate(message.created_at)}</span>
        </div>

        {/* Bubble */}
        <div
          className="px-3 py-2 rounded-[8px] text-sm leading-relaxed"
          style={{
            background: isOwn ? 'rgba(61,184,204,0.14)' : 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.07)',
            color: '#b8cad8',
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
