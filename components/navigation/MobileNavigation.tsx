'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, TrendingUp, Video, Users, User, Menu, X } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button/Button'

const navigationItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: TrendingUp, label: 'Trending', href: '/trending' },
  { icon: Video, label: 'Live', href: '/live' },
  { icon: Users, label: 'Network', href: '/network' },
  { icon: User, label: 'Profile', href: '/profile' }
]

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return null

  return (
    <>
      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map(({ icon: Icon, label, href }) => {
            const isActive = pathname === href
            
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center py-2 px-4 transition-colors ${
                  isActive 
                    ? 'text-indigo-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Mobile Header with Hamburger */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-lg"></div>
            <span className="font-black text-xl">FILTHY FAME</span>
          </Link>
          
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
            size="sm"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200">
            <nav className="py-4">
              {navigationItems.map(({ icon: Icon, label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-6 py-4 hover:bg-gray-50"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Spacer for fixed bottom nav */}
      <div className="h-20 md:hidden"></div>
    </>
  )
}