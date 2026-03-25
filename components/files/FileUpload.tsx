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
    if (!ALLOWED.includes(file.type)) {
      alert('Nur Bilder erlaubt (JPEG, PNG, GIF, WebP, HEIC)')
      return
    }
    setUploading(true)
    const path = `${userId}/${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from('files').upload(path, file)
    if (!error) {
      const { data } = supabase.storage.from('files').getPublicUrl(path)
      onUploaded(data.publicUrl, path)
    }
    setUploading(false)
  }

  async function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) await uploadFile(file)
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) await uploadFile(file)
    e.target.value = ''
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={e => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onClick={() => inputRef.current?.click()}
      className="mx-4 mb-4 rounded-[8px] border-dashed border-[1.5px] flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors py-4"
      style={{
        borderColor: dragOver ? '#3db8cc' : 'rgba(255,255,255,0.10)',
        background: dragOver ? 'rgba(61,184,204,0.06)' : 'transparent',
      }}
    >
      {uploading ? (
        <Loader2 size={18} className="animate-spin" style={{ color: '#3db8cc' }} />
      ) : (
        <>
          <Upload size={18} style={{ color: '#3a5060' }} />
          <p className="text-xs" style={{ color: '#5c7080' }}>Bild hier ablegen oder klicken</p>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}
