import { useState, useEffect } from 'react'

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

export function useBreakpoint() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('sm')

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth
      
      if (width >= breakpoints['2xl']) setCurrentBreakpoint('2xl')
      else if (width >= breakpoints.xl) setCurrentBreakpoint('xl')
      else if (width >= breakpoints.lg) setCurrentBreakpoint('lg')
      else if (width >= breakpoints.md) setCurrentBreakpoint('md')
      else setCurrentBreakpoint('sm')
    }

    checkBreakpoint()
    window.addEventListener('resize', checkBreakpoint)
    
    return () => window.removeEventListener('resize', checkBreakpoint)
  }, [])

  return {
    current: currentBreakpoint,
    isMobile: currentBreakpoint === 'sm',
    isTablet: currentBreakpoint === 'md',
    isDesktop: ['lg', 'xl', '2xl'].includes(currentBreakpoint),
    isLarge: ['xl', '2xl'].includes(currentBreakpoint)
  }
}