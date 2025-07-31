'use client'

import React, { useState } from 'react'
import { Upload, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

const CreatePost = () => {
  const [content, setContent] = useState('')
  const [mediaUrl, setMediaUrl] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // TODO: Implement post creation logic
      console.log('Creating post:', { content, mediaUrl, mediaType })
      
      // Reset form
      setContent('')
      setMediaUrl(null)
      setMediaType(null)
      
      alert('Post created successfully!')
    } catch (error) {
      console.error('Error creating post:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to create post'
      alert(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    try {
      // TODO: Implement Cloudinary upload
      // This is a placeholder - you'll need to implement actual Cloudinary upload
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'your_upload_preset') // Replace with your preset
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/your_cloud_name/upload`, // Replace with your cloud name
        {
          method: 'POST',
          body: formData
        }
      )
      
      if (!response.ok) {
        throw new Error('Upload failed')
      }
      
      const result = await response.json()
      setMediaUrl(result.secure_url)
      setMediaType(result.resource_type)
    } catch (error) {
      console.error('Upload error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      alert(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-900/90 rounded-2xl p-6 backdrop-blur border border-gray-700/50 mb-6">
      <h3 className="text-xl font-bold text-white mb-4">What's happening?</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts with the community..."
          className="w-full bg-gray-800 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          rows={4}
          maxLength={2000}
        />
        
        {/* Media Preview */}
        {mediaUrl && (
          <div className="relative">
            {mediaType === 'image' && (
              <Image 
                src={mediaUrl} 
                alt="Upload preview" 
                width={400}
                height={300}
                className="w-full rounded-lg object-cover max-h-64" 
              />
            )}
            {mediaType === 'video' && (
              <video 
                src={mediaUrl} 
                controls 
                className="w-full rounded-lg max-h-64"
              />
            )}
            <button
              type="button"
              onClick={() => {
                setMediaUrl(null)
                setMediaType(null)
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                className="hidden"
                disabled={isLoading}
              />
              <div className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <ImageIcon className="w-5 h-5" />
                <span>Add Media</span>
              </div>
            </label>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">
              {content.length}/2000
            </span>
            <Button
              type="submit"
              disabled={!content.trim() || isLoading}
              variant="primary"
            >
              {isLoading ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreatePost