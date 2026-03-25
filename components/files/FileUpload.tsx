'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, Loader2 } from 'lucide-react'

const supabase = createClient()
const ALLOWED = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic']

interface FileUploadProps {
  userId: string
  onUploaded: (url: string, name: string) => void
}

export default function FileUpload({ userId, onUploaded }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function uploadFile(file: File) {
    if (!ALLOWED.includes(file.type)) { alert('Nur Bilder erlaubt'); return }
    setUploading(true)
    const path = `${userId}/${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from('files').upload(path, file)
    if (!error) {
      const { data } = supabase.storage.from('files').getPublicUrl(path)
      onUploaded(data.publicUrl, path)
    }
    setUploading(false)
  }

  return (
    <div
      onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) uploadFile(f) }}
      onDragOver={e => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onClick={() => inputRef.current?.click()}
      className="border-dashed flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors"
      style={{
        margin: `0 var(--m-grid-p)`,
        marginBottom: 'var(--m-grid-gap)',
        padding: 'var(--m-upload-py) 0',
        borderRadius: 'var(--m-radius)',
        borderWidth: 'var(--m-border-w)',
        borderStyle: 'dashed',
        borderColor: dragOver ? 'var(--m-accent)' : 'var(--m-border2)',
        background: dragOver ? 'var(--m-accent-dim)' : 'transparent',
      }}
    >
      {uploading ? (
        <Loader2 className="animate-spin" style={{ color: 'var(--m-accent)', width: 'var(--m-icon-size)', height: 'var(--m-icon-size)' }} />
      ) : (
        <>
          <Upload style={{ color: 'var(--m-text3)', width: 'var(--m-icon-size)', height: 'var(--m-icon-size)' }} />
          <p className="text-xs" style={{ color: 'var(--m-text2)' }}>Bild hier ablegen oder klicken</p>
        </>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) uploadFile(f); e.target.value = '' }} />
    </div>
  )
}
