import React from 'react'

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'primary' | 'live'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ 
  variant = 'default', 
  size = 'md',
  children, 
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
  
  const variantClasses = {
    default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'border-transparent bg-red-500 text-white hover:bg-red-600',
    outline: 'text-foreground border-gray-300',
    success: 'border-transparent bg-green-500 text-white hover:bg-green-600',
    primary: 'border-transparent bg-indigo-500 text-white hover:bg-indigo-600',
    live: 'border-transparent bg-red-500 text-white hover:bg-red-600 animate-pulse'
  }
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm'
  }
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  )
}

export default Badge