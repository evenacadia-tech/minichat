'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Trash2 } from 'lucide-react'
import type { Note } from '@/lib/supabase/types'
import { formatDate } from '@/lib/utils'

const supabase = createClient()

interface NoteListProps {
  notes: Note[]
  selectedId: string | null
  onSelect: (note: Note) => void
  onCreated: (note: Note) => void
  onDeleted: (id: string) => void
  userId: string
  username: string
}

export default function NoteList({ notes, selectedId, onSelect, onCreated, onDeleted, userId, username }: NoteListProps) {
  const [creating, setCreating] = useState(false)

  async function handleCreate() {
    setCreating(true)
    const { data, error } = await supabase
      .from('notes')
      .insert({ user_id: userId, username, title: 'Neue Notiz', content: '' })
      .select()
      .single()
    setCreating(false)
    if (!error && data) onCreated(data as Note)
  }

  async function handleDelete(e: React.MouseEvent, id: string) {
    e.stopPropagation()
    await supabase.from('notes').delete().eq('id', id)
    onDeleted(id)
  }

  return (
    <div
      className="w-[220px] flex-shrink-0 flex flex-col border-r"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <div
        className="px-4 py-3 flex items-center justify-between border-b"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#5c7080' }}>Notizen</span>
        <button
          onClick={handleCreate}
          disabled={creating}
          title="Neue Notiz"
          style={{ color: '#3a5060' }}
        >
          <Plus size={14} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {notes.length === 0 && (
          <p className="text-center text-xs p-4" style={{ color: '#3a5060' }}>Keine Notizen</p>
        )}
        {notes.map(note => (
          <div
            key={note.id}
            onClick={() => onSelect(note)}
            className="px-4 py-2.5 cursor-pointer flex items-start justify-between gap-2 group"
            style={{ background: selectedId === note.id ? 'rgba(61,184,204,0.10)' : 'transparent' }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate" style={{ color: selectedId === note.id ? '#3db8cc' : '#b8cad8' }}>
                {note.title || 'Unbenannt'}
              </p>
              <p className="text-xs" style={{ color: '#3a5060' }}>{formatDate(note.updated_at)}</p>
            </div>
            <button
              onClick={e => handleDelete(e, note.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: '#3a5060' }}
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
