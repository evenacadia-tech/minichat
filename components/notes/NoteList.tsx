'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Note } from '@/lib/supabase/types'

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
      .select().single()
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
      className="flex-shrink-0 flex flex-col"
      style={{
        width: 'var(--m-notelist-w)',
        borderRight: '1px solid var(--m-border)',
        background: 'var(--m-panel)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: '14px 18px',
          borderBottom: '1px solid var(--m-border)',
          fontSize: 11,
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          color: 'var(--m-blue)',
          fontFamily: 'var(--m-font-heading)',
          fontWeight: 700,
        }}
      >
        <span>Notes</span>
        <div className="flex gap-1">
          <button
            onClick={handleCreate}
            disabled={creating}
            style={{
              padding: '5px 10px',
              fontFamily: 'var(--m-font)',
              fontSize: 11,
              letterSpacing: '.05em',
              background: 'transparent',
              border: '1px solid var(--m-border)',
              color: 'var(--m-muted)',
              borderRadius: 0,
              cursor: 'pointer',
              transition: 'all .15s',
            }}
          >
            + New
          </button>
        </div>
      </div>

      {/* Note list */}
      <div className="flex-1 overflow-y-auto">
        {notes.length === 0 && (
          <div
            className="flex-1 flex items-center justify-center flex-col gap-3.5 p-8"
            style={{ color: 'var(--m-muted)', fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase' }}
          >
            <span style={{ fontSize: 36, opacity: .25, color: 'var(--m-blue)' }}>◈</span>
            No notes yet
          </div>
        )}
        {notes.map(note => {
          const active = selectedId === note.id
          const date = new Date(note.updated_at).toLocaleDateString('de', { day: '2-digit', month: '2-digit' })
          return (
            <div
              key={note.id}
              onClick={() => onSelect(note)}
              className="cursor-pointer group"
              style={{
                padding: '13px 18px',
                borderBottom: '1px solid var(--m-border)',
                borderLeft: `2px solid ${active ? 'var(--m-blue)' : 'transparent'}`,
                background: active ? 'var(--m-surface)' : 'transparent',
                transition: 'all .1s',
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginBottom: 3,
                  color: active ? 'var(--m-blue)' : 'var(--m-text)',
                  fontWeight: 400,
                }}
              >
                {note.title || 'Unbenannt'}
              </div>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: 11, color: 'var(--m-muted)', letterSpacing: '.06em' }}>
                  {username} · {date}
                </span>
                <button
                  onClick={e => handleDelete(e, note.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    padding: '2px 8px',
                    fontFamily: 'var(--m-font)',
                    fontSize: 12,
                    background: 'transparent',
                    border: 'none',
                    color: '#FF4466',
                    cursor: 'pointer',
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
