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
    if (note) {
      setTitle(note.title)
      setContent(note.content)
    }
  }, [note])

  function scheduleSave(newTitle: string, newContent: string) {
    if (!note) return
    if (saveTimeout.current) clearTimeout(saveTimeout.current)
    saveTimeout.current = setTimeout(async () => {
      const { data } = await supabase
        .from('notes')
        .update({ title: newTitle, content: newContent, updated_at: new Date().toISOString() })
        .eq('id', note.id)
        .select()
        .single()
      if (data) onUpdated(data as Note)
    }, 600)
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value)
    scheduleSave(e.target.value, content)
  }

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value)
    scheduleSave(title, e.target.value)
  }

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm" style={{ color: '#3a5060' }}>
        Notiz auswählen oder neu erstellen
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div
        className="px-5 py-2.5 flex items-center gap-3 border-b flex-shrink-0"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <input
          value={title}
          onChange={handleTitleChange}
          className="flex-1 bg-transparent font-semibold text-sm outline-none"
          style={{ color: '#b8cad8' }}
          placeholder="Titel…"
        />
        <button
          onClick={() => setPreview(p => !p)}
          className="text-xs px-2 py-1 rounded transition-colors"
          style={{
            color: preview ? '#3db8cc' : '#5c7080',
            background: preview ? 'rgba(61,184,204,0.10)' : 'transparent',
          }}
        >
          {preview ? 'Bearbeiten' : 'Vorschau'}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {preview ? (
          <div className="prose prose-invert prose-sm max-w-none" style={{ color: '#b8cad8' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={content}
            onChange={handleContentChange}
            className="w-full h-full bg-transparent text-sm leading-relaxed outline-none resize-none font-mono"
            style={{ color: '#b8cad8' }}
            placeholder="Markdown schreiben…"
          />
        )}
      </div>
    </div>
  )
}
