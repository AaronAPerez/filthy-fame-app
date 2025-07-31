'use client'

import React, { useState, useEffect } from 'react'
import PostCard from '@/components/PostCard'
import { createClient } from '@/lib/supabase/client'

interface Post {
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
    bio: string | null
    verified: boolean
    coins: number
    total_earnings: number
    followers_count: number
    following_count: number
    created_at: string
    updated_at: string
  }
}

const PostFeed = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (*)
        `)
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error
      
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch posts'
      console.error('Error fetching posts:', errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-900/90 rounded-2xl p-6 backdrop-blur border border-gray-700/50 animate-pulse">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-24"></div>
                <div className="h-3 bg-gray-700 rounded w-16"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onUpdate={fetchPosts} />
      ))}
      {posts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-400">No posts yet. Create the first one!</p>
        </div>
      )}
    </div>
  )
}

export default PostFeed