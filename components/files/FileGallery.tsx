'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface FileItem {
  name: string
  url: string
}

interface FileGalleryProps {
  files: FileItem[]
}

export default function FileGallery({ files }: FileGalleryProps) {
  const [lightbox, setLightbox] = useState<string | null>(null)

  if (files.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-sm" style={{ color: '#3a5060' }}>
        Noch keine Bilder hochgeladen
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2 p-4">
        {files.map(file => (
          <button
            key={file.name}
            onClick={() => setLightbox(file.url)}
            className="aspect-square rounded-[8px] overflow-hidden transition-all"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <img
              src={file.url}
              alt={file.name}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4"
            style={{ color: 'rgba(255,255,255,0.60)' }}
            onClick={() => setLightbox(null)}
          >
            <X size={24} />
          </button>
          <img
            src={lightbox}
            alt="Vollbild"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-[8px]"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
