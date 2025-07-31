import { ReactNode } from 'react'
import { useRole } from '@/hooks/useRole'
import { Database } from '@/types/supabase'


type UserRole = Database['public']['Enums']['user_role']

interface RoleGuardProps {
  children: ReactNode
  roles?: UserRole | UserRole[]
  permissions?: string | string[]
  fallback?: ReactNode
}

export function RoleGuard({ 
  children, 
  roles, 
  permissions, 
  fallback = null 
}: RoleGuardProps) {
  const { hasRole, hasPermission } = useRole()

  // Check role-based access
  if (roles) {
    if (!hasRole(roles)) {
      return <>{fallback}</>
    }
  }

  // Check permission-based access
  if (permissions) {
    const permArray = Array.isArray(permissions) ? permissions : [permissions]
    const hasAllPermissions = permArray.every(perm => hasPermission(perm))
    
    if (!hasAllPermissions) {
      return <>{fallback}</>
    }
  }

  return <>{children}</>
}