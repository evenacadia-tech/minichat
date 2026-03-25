import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AppShell from '@/components/layout/AppShell'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const username = user.user_metadata?.username ?? ''

  return (
    <AppShell userEmail={user.email ?? ''} username={username}>
      {children}
    </AppShell>
  )
}
