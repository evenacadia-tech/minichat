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

      // List files inside the user's sub-folder (upload path: ${userId}/${name})
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

  function handleUploaded(url: string, name: string) {
    setFiles(prev => [{ name, url }, ...prev])
  }

  return (
    <FilesVault>
      <div className="flex flex-col h-full overflow-hidden">
        <div
          className="px-5 py-3 flex items-center border-b flex-shrink-0"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <h2 className="text-sm font-semibold" style={{ color: '#b8cad8' }}>Dateien-Tresor</h2>
          <span className="ml-2 text-xs" style={{ color: '#3a5060' }}>Nur Bilder</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          <FileUpload userId={userId} onUploaded={handleUploaded} />
          <FileGallery files={files} />
        </div>
      </div>
    </FilesVault>
  )
}
