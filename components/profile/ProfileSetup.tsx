'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase/supabase'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { Textarea } from '../ui/Textarea'
import { AvatarUpload } from '@/components/profile/AvatarUpload'
import { toast } from 'react-hot-toast'

const profileSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  display_name: z.string()
    .min(1, 'Display name is required')
    .max(100, 'Display name must be less than 100 characters'),
  bio: z.string()
    .max(500, 'Bio must be less than 500 characters')
    .optional(),
  website_url: z.string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  location: z.string()
    .max(100, 'Location must be less than 100 characters')
    .optional()
})

type ProfileFormData = z.infer<typeof profileSchema>

interface ProfileSetupProps {
  isFirstTime?: boolean
  onComplete?: () => void
}

export default function ProfileSetup({ isFirstTime = false, onComplete }: ProfileSetupProps) {
  const { user, profile, refreshProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: profile?.username || '',
      display_name: profile?.display_name || '',
      bio: profile?.bio || '',
      website_url: profile?.website_url || '',
      location: profile?.location || ''
    }
  })

  const checkUsernameAvailability = async (username: string) => {
    if (!username || username === profile?.username) return true

    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single()

    return !data // Username is available if no data returned
  }

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true)
    try {
      // Check username availability
      const isUsernameAvailable = await checkUsernameAvailability(data.username)
      if (!isUsernameAvailable) {
        toast.error('Username is already taken')
        setIsLoading(false)
        return
      }

      const profileData = {
        ...data,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString()
      }

      if (profile) {
        // Update existing profile
        const { error } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', user!.id)
      } else {
        // Create new profile
        const { error } = await supabase
          .from('profiles')
          .insert([{
            id: user!.id,
            ...profileData
          }])
      }

      await refreshProfile()
      toast.success('Profile updated successfully!')
      
      if (onComplete) {
        onComplete()
      }
    } catch (error) {
      console.error('Profile update error:', error)
      toast.error('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {isFirstTime ? 'Complete Your Profile' : 'Edit Profile'}
        </h2>
        <p className="text-gray-600">
          {isFirstTime 
            ? 'Tell us about yourself to get started on Filthy Fame'
            : 'Update your profile information'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex justify-center">
          <AvatarUpload
            uid={user?.id}
            url={avatarUrl}
            onUpload={(url) => setAvatarUrl(url)}
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username *
          </label>
          <Input
            {...register('username')}
            placeholder="your_username"
            className={errors.username ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            This is your unique identifier on the platform
          </p>
        </div>

        {/* Display Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Display Name *
          </label>
          <Input
            {...register('display_name')}
            placeholder="Your Display Name"
            className={errors.display_name ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.display_name && (
            <p className="text-red-500 text-sm mt-1">{errors.display_name.message}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <Textarea
            {...register('bio')}
            placeholder="Tell us about yourself..."
            rows={4}
            className={errors.bio ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            {watch('bio')?.length || 0}/500 characters
          </p>
        </div>

        {/* Website URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <Input
            {...register('website_url')}
            placeholder="https://yourwebsite.com"
            className={errors.website_url ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.website_url && (
            <p className="text-red-500 text-sm mt-1">{errors.website_url.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <Input
            {...register('location')}
            placeholder="City, Country"
            className={errors.location ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Saving...' : isFirstTime ? 'Complete Setup' : 'Update Profile'}
        </Button>
      </form>
    </div>
  )
}