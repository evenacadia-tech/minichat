import { createClient } from '@/lib/supabase/server'
import MessageList from '@/components/chat/MessageList'
import MessageInput from '@/components/chat/MessageInput'
import type { Message } from '@/lib/supabase/types'

export default async function ChatPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(100)

  const username = user?.user_metadata?.username ?? user?.email?.split('@')[0] ?? 'Anon'

  return (
    <>
      {/* Header */}
      <div
        className="px-5 py-3 flex items-center border-b flex-shrink-0"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <h2 className="text-sm font-semibold" style={{ color: '#b8cad8' }}># Allgemein</h2>
        <span className="ml-2 text-xs" style={{ color: '#3a5060' }}>Gruppen-Chat</span>
      </div>

      <MessageList
        initialMessages={(messages ?? []) as Message[]}
        currentUserId={user?.id ?? ''}
      />

      <MessageInput userId={user?.id ?? ''} username={username} />
    </>
  )
}
