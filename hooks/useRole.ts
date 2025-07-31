import { useAuth } from './useAuth'
import { Database } from '@/types/supabase'

type UserRole = Database['public']['Enums']['user_role']

export function useRole() {
  const { profile } = useAuth()

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!profile?.role) return false
    
    if (Array.isArray(role)) {
      return role.includes(profile.role)
    }
    
    return profile.role === role
  }

  const hasPermission = (permission: string): boolean => {
    if (!profile?.role) return false

    const rolePermissions: Record<UserRole, string[]> = {
      user: ['read_posts', 'create_posts', 'comment', 'like'],
      creator: ['read_posts', 'create_posts', 'comment', 'like', 'livestream', 'monetize'],
      moderator: ['read_posts', 'create_posts', 'comment', 'like', 'moderate_content', 'ban_users'],
      admin: ['*'] // Admin has all permissions
    }

    const permissions = rolePermissions[profile.role] || []
    return permissions.includes('*') || permissions.includes(permission)
  }

  return {
    role: profile?.role || 'user',
    hasRole,
    hasPermission,
    isUser: hasRole('user'),
    isCreator: hasRole(['creator', 'moderator', 'admin']),
    isModerator: hasRole(['moderator', 'admin']),
    isAdmin: hasRole('admin')
  }
}