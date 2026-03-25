'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface FileItem { name: string; url: string }

export default function FileGallery({ files }: { files: FileItem[] }) {
  const [lightbox, setLightbox] = useState<string | null>(null)

  if (files.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-sm" style={{ color: 'var(--m-text3)' }}>
        Noch keine Bilder hochgeladen
      </div>
    )
  }

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(var(--m-grid-cols), 1fr)`,
        gap: 'var(--m-grid-gap)',
        padding: 'var(--m-grid-p)',
      }}>
        {files.map(file => (
          <button key={file.name} onClick={() => setLightbox(file.url)}
            className="aspect-square overflow-hidden transition-all"
            style={{ borderRadius: 'var(--m-radius)', background: 'var(--m-surface)' }}>
            <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.85)' }} onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4" style={{ color: 'rgba(255,255,255,0.60)' }}
            onClick={() => setLightbox(null)}>
            <X size={24} />
          </button>
          <img src={lightbox} alt="Vollbild"
            className="max-w-[90vw] max-h-[90vh] object-contain"
            style={{ borderRadius: 'var(--m-radius)' }}
            onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  )
}
