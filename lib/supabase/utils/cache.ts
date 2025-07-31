// lib/utils/cache.ts
const cache = new Map()

export function memoize<T>(fn: Function, ttl = 5 * 60 * 1000): T {
  return ((...args: any[]) => {
    const key = JSON.stringify(args)
    const cached = cache.get(key)
    
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.value
    }
    
    const result = fn(...args)
    cache.set(key, { value: result, timestamp: Date.now() })
    return result
  }) as any
}

// Use for expensive operations
export const getCachedProfile = memoize(async (userId: string) => {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return data
})