'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import FilesVault from '@/components/files/FilesVault'
import FileGallery from '@/components/files/FileGallery'
import FileUpload from '@/components/files/FileUpload'

const supabase = createClient()

interface FileItem { name: string; url: string }

export default function FilesPage() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [userId, setUserId] = useState('')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUserId(user.id)
      const { data } = await supabase.storage.from('files').list(user.id, {
        sortBy: { column: 'created_at', order: 'desc' },
      })
      const items: FileItem[] = (data ?? [])
        .filter(f => f.name !== '.emptyFolderPlaceholder')
        .map(f => ({
          name: `${user.id}/${f.name}`,
          url: supabase.storage.from('files').getPublicUrl(`${user.id}/${f.name}`).data.publicUrl,
        }))
      setFiles(items)
    }
    load()
  }, [])

  return (
    <FilesVault>
      <div className="flex flex-col h-full overflow-hidden">
        <div
          className="flex items-center flex-shrink-0"
          style={{
            padding: '14px 18px',
            borderBottom: '1px solid var(--m-border)',
            background: 'var(--m-panel)',
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: 'var(--m-blue)',
              fontFamily: 'var(--m-font-heading)',
              fontWeight: 700,
            }}
          >
            Files
          </span>
          <span className="ml-2" style={{ fontSize: 11, color: 'var(--m-muted)', letterSpacing: '.06em' }}>
            Nur Bilder
          </span>
        </div>
        <div className="flex-1 overflow-y-auto" style={{ paddingTop: 'var(--m-grid-p)' }}>
          <FileUpload userId={userId} onUploaded={(url, name) => setFiles(prev => [{ name, url }, ...prev])} />
          <FileGallery files={files} />
        </div>
      </div>
    </FilesVault>
  )
}
