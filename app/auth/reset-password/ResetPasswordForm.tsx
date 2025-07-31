'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase/supabase'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui'
import { toast } from 'react-hot-toast'

const passwordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

type PasswordFormData = z.infer<typeof passwordSchema>

export default function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [isValidToken, setIsValidToken] = useState(false)
  const [isCheckingToken, setIsCheckingToken] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema)
  })

  useEffect(() => {
    // Check if we have valid session from reset link
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session error:', error)
          setIsValidToken(false)
        } else if (session) {
          setIsValidToken(true)
        } else {
          // Check for access_token and refresh_token in URL params
          const accessToken = searchParams?.get('access_token')
          const refreshToken = searchParams?.get('refresh_token')
          
          if (accessToken && refreshToken) {
            // Set the session with the tokens from URL
            const { error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            })
            
            if (!sessionError) {
              setIsValidToken(true)
            } else {
              console.error('Session set error:', sessionError)
              setIsValidToken(false)
            }
          } else {
            setIsValidToken(false)
          }
        }
      } catch (error) {
        console.error('Token validation error:', error)
        setIsValidToken(false)
      } finally {
        setIsCheckingToken(false)
      }
    }

    checkSession()
  }, [searchParams])

  useEffect(() => {
    // If token is invalid, redirect after a delay
    if (!isCheckingToken && !isValidToken) {
      const timer = setTimeout(() => {
        router.push('/auth/signin?message=invalid-reset-link')
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [isCheckingToken, isValidToken, router])

  const onSubmit = async (data: PasswordFormData) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password
      })

      if (error) throw error

      toast.success('Password updated successfully!')
      
      // Redirect to sign in page
      router.push('/auth/signin?message=password-updated')
    } catch (error) {
      console.error('Password update error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to update password'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Loading state while checking token
  if (isCheckingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Verifying Reset Link...
            </h2>
            <p className="text-gray-600">
              Please wait while we validate your password reset request.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Invalid token state
  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Invalid Reset Link
            </h2>
            <p className="text-gray-600 mb-6">
              This password reset link is invalid or has expired. You will be redirected to the sign-in page.
            </p>
            <Button
              onClick={() => router.push('/auth/signin')}
              variant="primary"
              className="w-full"
            >
              Go to Sign In
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Valid token - show password reset form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Set New Password
          </h2>
          <p className="text-gray-600">
            Please enter your new password below.
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter new password"
              {...register('password')}
              className={errors.password ? 'border-red-500' : ''}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              {...register('confirmPassword')}
              className={errors.confirmPassword ? 'border-red-500' : ''}
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
          
          <Button
            type="submit"
            disabled={isLoading}
            variant="primary"
            className="w-full"
          >
            {isLoading ? 'Updating Password...' : 'Update Password'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/auth/signin')}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  )
}
// 'use client'

// import React from 'react'
// import { useState, useEffect } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from 'zod'
// import { supabase } from '@/lib/supabase/supabase'
// import { Button } from '@/components/ui/Button'
// import { Input } from '@/components/ui'
// import { toast } from 'react-hot-toast'

// const passwordSchema = z.object({
//   password: z.string().min(8, 'Password must be at least 8 characters'),
//   confirmPassword: z.string()
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"]
// })

// type PasswordFormData = z.infer<typeof passwordSchema>

// export default function ResetPasswordForm() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const [isLoading, setIsLoading] = useState(false)
//   const [isValidToken, setIsValidToken] = useState(false)
//   const [isCheckingToken, setIsCheckingToken] = useState(true)

//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm<PasswordFormData>({
//     resolver: zodResolver(passwordSchema)
//   })

//   useEffect(() => {
//     // Check if we have valid session from reset link
//     const checkSession = async () => {
//       try {
//         const { data: { session }, error } = await supabase.auth.getSession()
        
//         if (error) {
//           console.error('Session error:', error)
//           setIsValidToken(false)
//         } else if (session) {
//           setIsValidToken(true)
//         } else {
//           // Check for access_token and refresh_token in URL params
//           const accessToken = searchParams.get('access_token')
//           const refreshToken = searchParams.get('refresh_token')
          
//           if (accessToken && refreshToken) {
//             // Set the session with the tokens from URL
//             const { error: sessionError } = await supabase.auth.setSession({
//               access_token: accessToken,
//               refresh_token: refreshToken
//             })
            
//             if (!sessionError) {
//               setIsValidToken(true)
//             } else {
//               console.error('Session set error:', sessionError)
//               setIsValidToken(false)
//             }
//           } else {
//             setIsValidToken(false)
//           }
//         }
//       } catch (error) {
//         console.error('Token validation error:', error)
//         setIsValidToken(false)
//       } finally {
//         setIsCheckingToken(false)
//       }
//     }

//     checkSession()
//   }, [searchParams])

//   useEffect(() => {
//     // If token is invalid, redirect after a delay
//     if (!isCheckingToken && !isValidToken) {
//       const timer = setTimeout(() => {
//         router.push('/auth/signin?message=invalid-reset-link')
//       }, 3000)
      
//       return () => clearTimeout(timer)
//     }
//   }, [isCheckingToken, isValidToken, router])

//   const onSubmit = async (data: PasswordFormData) => {
//     setIsLoading(true)
//     try {
//       const { error } = await supabase.auth.updateUser({
//         password: data.password
//       })

//       if (error) throw error

//       toast.success('Password updated successfully!')
      
//       // Redirect to sign in page
//       router.push('/auth/signin?message=password-updated')
//     } catch (error) {
//       console.error('Password update error:', error)
//       const errorMessage = error instanceof Error ? error.message : 'Failed to update password'
//       toast.error(errorMessage)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Loading state while checking token
//   if (isCheckingToken) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">
//               Verifying Reset Link...
//             </h2>
//             <p className="text-gray-600">
//               Please wait while we validate your password reset request.
//             </p>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Invalid token state
//   if (!isValidToken) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
//           <div className="text-center">
//             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-red-600 mb-4">
//               Invalid Reset Link
//             </h2>
//             <p className="text-gray-600 mb-6">
//               This password reset link is invalid or has expired. You will be redirected to the sign-in page.
//             </p>
//             <Button
//               onClick={() => router.push('/auth/signin')}
//               variant="primary"
//               className="w-full"
//             >
//               Go to Sign In
//             </Button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Valid token - show password reset form
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
//         <div className="text-center mb-6">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">
//             Set New Password
//           </h2>
//           <p className="text-gray-600">
//             Please enter your new password below.
//           </p>
//         </div>
        
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               New Password
//             </label>
//             <Input
//               id="password"
//               type="password"
//               placeholder="Enter new password"
//               {...register('password')}
//               className={errors.password ? 'border-red-500' : ''}
//               disabled={isLoading}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>
          
//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
//               Confirm New Password
//             </label>
//             <Input
//               id="confirmPassword"
//               type="password"
//               placeholder="Confirm new password"
//               {...register('confirmPassword')}
//               className={errors.confirmPassword ? 'border-red-500' : ''}
//               disabled={isLoading}
//             />
//             {errors.confirmPassword && (
//               <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
//             )}
//           </div>
          
//           <Button
//             type="submit"
//             disabled={isLoading}
//             variant="primary"
//             className="w-full"
//           >
//             {isLoading ? 'Updating Password...' : 'Update Password'}
//           </Button>
//         </form>
        
//         <div className="mt-6 text-center">
//           <button
//             onClick={() => router.push('/auth/signin')}
//             className="text-sm text-indigo-600 hover:text-indigo-500"
//           >
//             Back to Sign In
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }