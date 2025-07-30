export interface Profile {
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

export interface Post {
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
  profiles: Profile
}