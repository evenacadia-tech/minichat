'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import NoteList from '@/components/notes/NoteList'
import NoteEditor from '@/components/notes/NoteEditor'
import type { Note } from '@/lib/supabase/types'

const supabase = createClient()

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selected, setSelected] = useState<Note | null>(null)
  const [userId, setUserId] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUserId(user.id)
      setUsername(user.user_metadata?.username ?? user.email?.split('@')[0] ?? 'Anon')

      const { data } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
      setNotes((data ?? []) as Note[])
    }
    load()
  }, [])

  function handleCreated(note: Note) {
    setNotes(prev => [note, ...prev])
    setSelected(note)
  }

  function handleDeleted(id: string) {
    setNotes(prev => prev.filter(n => n.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  function handleUpdated(updated: Note) {
    setNotes(prev => prev.map(n => n.id === updated.id ? updated : n))
    setSelected(updated)
  }

  return (
    <div className="flex h-full">
      <NoteList
        notes={notes}
        selectedId={selected?.id ?? null}
        onSelect={setSelected}
        onCreated={handleCreated}
        onDeleted={handleDeleted}
        userId={userId}
        username={username}
      />
      <NoteEditor note={selected} onUpdated={handleUpdated} />
    </div>
  )
}
