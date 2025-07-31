import React from 'react'

interface CardProps {
  variant?: 'default' | 'glass' | 'elevated' | 'highlight';
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
  [key: string]: unknown;
}

// Reusable Card Component
const Card: React.FC<CardProps> = ({ 
  variant = 'default' ,
  className = '', 
  children, 
  hover = true,
  ...props 
}) => {
  const baseClasses = 'backdrop-blur-xl border border-gray-700/50 overflow-hidden';
  
  const variantClasses = {
    default: 'bg-gradient-to-br from-gray-900/95 to-black/95 rounded-2xl',
    glass: 'bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl',
    elevated: 'bg-gradient-to-br from-gray-900/95 to-black/95 rounded-2xl shadow-2xl',
    highlight: 'bg-gradient-to-br from-indigo-900/20 to-emerald-900/20 rounded-2xl border-indigo-500/30',
  };
  
  const hoverClasses = hover ? 'hover:shadow-2xl hover:shadow-indigo-500/10 transition-all hover:scale-[1.02]' : '';
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card