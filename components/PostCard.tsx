'use client'

import React, { useState } from 'react'
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import Image from 'next/image'

interface PostProps {
  post: {
    id: string
    user_id: string
    content: string
    media_url: string | null
    media_type: string | null
    category: string
    likes_count: number
    comments_count: number
    shares_count: number
    is_trending: boolean
    created_at: string
    profiles: {
      id: string
      username: string | null
      display_name: string | null
      avatar_url: string | null
      verified: boolean
    }
  }
  onUpdate?: () => void
}

const PostCard = ({ post, onUpdate }: PostProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes_count)

  const handleLike = async () => {
    try {
      // TODO: Implement like functionality
      setIsLiked(!isLiked)
      setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
      
      if (onUpdate) {
        onUpdate()
      }
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return 'just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  return (
    <div className="bg-gray-900/90 rounded-2xl p-6 backdrop-blur border border-gray-700/50 hover:border-gray-600/50 transition-all">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center">
            {post.profiles.avatar_url ? (
              <Image
                src={post.profiles.avatar_url}
                alt={post.profiles.display_name || 'User'}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : (
              <span className="text-white font-bold">
                {(post.profiles.display_name || post.profiles.username || 'U')[0].toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-white">
                {post.profiles.display_name || post.profiles.username || 'Anonymous'}
              </h4>
              {post.profiles.verified && (
                <Badge variant="primary" size="sm">✓</Badge>
              )}
              {post.is_trending && (
                <Badge variant="destructive" size="sm">🔥 Trending</Badge>
              )}
            </div>
            <p className="text-sm text-gray-400">
              @{post.profiles.username || 'anonymous'} • {formatTimeAgo(post.created_at)}
            </p>
          </div>
        </div>
        
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-white mb-3 leading-relaxed">{post.content}</p>
        
        {/* Media */}
        {post.media_url && (
          <div className="rounded-lg overflow-hidden">
            {post.media_type === 'image' && (
              <Image
                src={post.media_url}
                alt="Post media"
                width={600}
                height={400}
                className="w-full object-cover max-h-96"
              />
            )}
            {post.media_type === 'video' && (
              <video
                src={post.media_url}
                controls
                className="w-full max-h-96 object-cover"
              />
            )}
          </div>
        )}
        
        {/* Category */}
        <div className="mt-3">
          <Badge variant="secondary" size="sm">
            {post.category}
          </Badge>
        </div>
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-colors ${
              isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm">{likesCount}</span>
          </button>
          
          <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{post.comments_count}</span>
          </button>
          
          <button className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors">
            <Share className="w-5 h-5" />
            <span className="text-sm">{post.shares_count}</span>
          </button>
        </div>
        
        <Button variant="ghost" size="sm">
          View Details
        </Button>
      </div>
    </div>
  )
}

export default PostCard