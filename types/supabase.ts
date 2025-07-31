export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          display_name: string | null
          bio: string | null
          avatar_url: string | null
          website_url: string | null
          location: string | null
          verified: boolean
          role: Database['public']['Enums']['user_role']
          follower_count: number
          following_count: number
          post_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          website_url?: string | null
          location?: string | null
          verified?: boolean
          role?: Database['public']['Enums']['user_role']
          follower_count?: number
          following_count?: number
          post_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          website_url?: string | null
          location?: string | null
          verified?: boolean
          role?: Database['public']['Enums']['user_role']
          follower_count?: number
          following_count?: number
          post_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string
          content: string
          category: string
          tags: string[] | null
          is_nsfw: boolean
          allow_comments: boolean
          visibility: 'public' | 'followers' | 'private'
          media_urls: string[] | null
          media_types: string[] | null
          like_count: number
          comment_count: number
          share_count: number
          created_at: string
          updated_at: string
          moderation_status: 'pending' | 'approved' | 'rejected' | null
          moderated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          category: string
          tags?: string[] | null
          is_nsfw?: boolean
          allow_comments?: boolean
          visibility?: 'public' | 'followers' | 'private'
          media_urls?: string[] | null
          media_types?: string[] | null
          like_count?: number
          comment_count?: number
          share_count?: number
          created_at?: string
          updated_at?: string
          moderation_status?: 'pending' | 'approved' | 'rejected' | null
          moderated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          category?: string
          tags?: string[] | null
          is_nsfw?: boolean
          allow_comments?: boolean
          visibility?: 'public' | 'followers' | 'private'
          media_urls?: string[] | null
          media_types?: string[] | null
          like_count?: number
          comment_count?: number
          share_count?: number
          created_at?: string
          updated_at?: string
          moderation_status?: 'pending' | 'approved' | 'rejected' | null
          moderated_at?: string | null
        }
      }
      follows: {
        Row: {
          id: string
          follower_id: string
          following_id: string
          created_at: string
        }
        Insert: {
          id?: string
          follower_id: string
          following_id: string
          created_at?: string
        }
        Update: {
          id?: string
          follower_id?: string
          following_id?: string
          created_at?: string
        }
      }
      post_reports: {
        Row: {
          id: string
          post_id: string
          reporter_id: string
          reason: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          reporter_id: string
          reason: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          reporter_id?: string
          reason?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'user' | 'creator' | 'moderator' | 'admin'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}