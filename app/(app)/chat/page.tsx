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
    .limit(300)

  const username = user?.user_metadata?.username ?? user?.email?.split('@')[0] ?? 'Anon'

  return (
    <div className="flex flex-col h-full">
      <MessageList initialMessages={(messages ?? []) as Message[]} currentUserId={user?.id ?? ''} />
      <MessageInput userId={user?.id ?? ''} username={username} />
    </div>
  )
}
