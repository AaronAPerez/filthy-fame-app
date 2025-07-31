import React from 'react'

interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'glass' | 'elevated' | 'highlight'
  className?: string
}

const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'default', 
  className = '' 
}) => {
  const baseClasses = 'rounded-lg border transition-all duration-200 relative'
  
  const variantClasses = {
    default: 'bg-white border-gray-200 shadow-sm',
    glass: 'bg-gray-900/20 border-white/10 backdrop-blur-xl shadow-2xl',
    elevated: 'bg-gray-900/90 border-gray-700/50 shadow-lg hover:shadow-xl backdrop-blur-sm',
    highlight: 'bg-gradient-to-br from-indigo-900/20 to-cyan-900/20 border-indigo-500/30 shadow-lg backdrop-blur-sm'
  }
  
  const hoverClasses = 'hover:shadow-lg transition-shadow duration-200'
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  )
}

export default Card