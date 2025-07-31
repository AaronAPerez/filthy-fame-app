'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CldUploadWidget } from 'next-cloudinary'
import { Image } from 'lucide-react'

interface CreatePostProps {
  userId: string
  onPostCreated: () => void
}

export default function CreatePost({ userId, onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState('')
  const [mediaUrl, setMediaUrl] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    
    try {
      const { error } = await supabase
        .from('posts')
        .insert({
          user_id: userId,
          content: content.trim(),
          media_url: mediaUrl,
          media_type: mediaType
        })
      
      if (error) throw error
      
      setContent('')
      setMediaUrl(null)
      setMediaType(null)
      onPostCreated()
    } catch (error: unknown) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-900 p-6 rounded-2xl border border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening in the culture?"
          className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white resize-none"
          rows={3}
        />
        
        {mediaUrl && (
          <div className="relative">
            {mediaType?.startsWith('video') ? (
              <video src={mediaUrl} controls className="w-full rounded-lg" />
            ) : (
              <img src={mediaUrl} alt="Upload" className="w-full rounded-lg" />
            )}
            <button
              type="button"
              onClick={() => { setMediaUrl(null); setMediaType(null) }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <CldUploadWidget
              uploadPreset="your_upload_preset"
              onSuccess={(result: unknown) => {
                setMediaUrl(result.info.secure_url)
                setMediaType(result.info.resource_type)
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="flex items-center space-x-2 text-gray-400 hover:text-indigo-400"
                >
                  <Image 
                    className="w-5 h-5" />
                  <span
                  >Photo/Video</span>
                </button>
              )}
            </CldUploadWidget>
          </div>
          
          <Button type="submit" disabled={loading || !content.trim()}>
            {loading ? 'Posting...' : 'Post'}
          </Button>
        </div>
      </form>
    </div>
  )
}