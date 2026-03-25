'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Note } from '@/lib/supabase/types'

const supabase = createClient()

interface NoteEditorProps {
  note: Note | null
  onUpdated: (note: Note) => void
}

export default function NoteEditor({ note, onUpdated }: NoteEditorProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [preview, setPreview] = useState(false)
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (note) { setTitle(note.title); setContent(note.content); setPreview(false) }
  }, [note])

  function scheduleSave(newTitle: string, newContent: string) {
    if (!note) return
    if (saveTimeout.current) clearTimeout(saveTimeout.current)
    saveTimeout.current = setTimeout(async () => {
      const { data } = await supabase
        .from('notes')
        .update({ title: newTitle, content: newContent, updated_at: new Date().toISOString() })
        .eq('id', note.id).select().single()
      if (data) onUpdated(data as Note)
    }, 600)
  }

  if (!note) {
    return (
      <div
        className="flex-1 flex items-center justify-center flex-col gap-3.5"
        style={{ color: 'var(--m-muted)', fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase' }}
      >
        <span style={{ fontSize: 36, opacity: .25, color: 'var(--m-blue)' }}>◈</span>
        Select or create a note
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div
        className="flex items-center gap-2 flex-shrink-0"
        style={{
          padding: '12px 20px',
          borderBottom: '1px solid var(--m-border)',
          background: 'var(--m-panel)',
        }}
      >
        <input
          value={title}
          onChange={e => { setTitle(e.target.value); scheduleSave(e.target.value, content) }}
          className="flex-1"
          placeholder="Title"
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: '1px solid var(--m-border)',
            color: 'var(--m-text)',
            fontFamily: 'var(--m-font-heading)',
            fontSize: 18,
            fontWeight: 700,
            padding: '2px 4px',
            outline: 'none',
            borderRadius: 0,
            transition: 'border-color .15s',
            letterSpacing: '.04em',
          }}
        />
        <button
          onClick={() => setPreview(p => !p)}
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
          {preview ? 'Edit' : 'Preview'}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden" style={{ position: 'relative' }}>
        {preview ? (
          <div
            className="note-viewer w-full h-full overflow-y-auto"
            style={{ padding: '26px 30px', fontSize: 15, lineHeight: 1.85 }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={content}
            onChange={e => { setContent(e.target.value); scheduleSave(title, e.target.value) }}
            className="w-full h-full"
            placeholder="Write Markdown..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none',
              color: 'var(--m-text)',
              fontFamily: 'var(--m-font)',
              fontSize: 15,
              lineHeight: 1.85,
              padding: '26px 30px',
              fontWeight: 300,
            }}
          />
        )}
      </div>
    </div>
  )
}
