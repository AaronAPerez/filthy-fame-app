'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase/supabase'
import { Button } from '@/components/ui/Button/Button'
import { Camera, Upload, X } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface AvatarUploadProps {
  uid?: string
  url?: string
  onUpload: (url: string) => void
  size?: number
}

export function AvatarUpload({ uid, url, onUpload, size = 150 }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(url || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file.')
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB.')
      }

      // Create preview
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      const fileExt = file.name.split('.').pop()
      const fileName = `${uid}-${Math.random()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      const publicUrl = data.publicUrl
      onUpload(publicUrl)
      
      // Clean up preview URL
      URL.revokeObjectURL(objectUrl)
      
      toast.success('Avatar uploaded successfully!')
    } catch (error) {
      console.error('Error uploading avatar:', error)
      toast.error(error instanceof Error ? error.message : 'Error uploading avatar')
      
      // Reset preview on error
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(url || null)
      }
    } finally {
      setUploading(false)
    }
  }

  const removeAvatar = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl(null)
    onUpload('')
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div 
        className="relative group cursor-pointer"
        style={{ width: size, height: size }}
      >
        <div 
          className="w-full h-full rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg"
          onClick={() => fileInputRef.current?.click()}
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Avatar"
              width={size}
              height={size}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-cyan-500">
              <Camera className="w-8 h-8 text-white" />
            </div>
          )}
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Camera className="w-6 h-6 text-white" />
        </div>
        
        {/* Remove button */}
        {previewUrl && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              removeAvatar()
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          {uploading ? 'Uploading...' : 'Upload Photo'}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
        className="hidden"
      />
      
      <p className="text-xs text-gray-500 text-center">
        JPG, PNG, GIF up to 5MB
      </p>
    </div>
  )
}