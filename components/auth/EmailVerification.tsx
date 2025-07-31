'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/supabase'
import { Button } from '../ui/Button/Button'
import { toast } from 'react-hot-toast'

interface EmailVerificationProps {
  email: string
  onVerified: () => void
}

export default function EmailVerification({ email, onVerified }: EmailVerificationProps) {
  const [isResending, setIsResending] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  const resendVerification = async () => {
    setIsResending(true)
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      })

      if (error) throw error
      toast.success('Verification email sent! Check your inbox.')
    } catch (error) {
      console.error('Resend error:', error)
      toast.error('Failed to resend verification email')
    } finally {
      setIsResending(false)
    }
  }

  const checkVerification = async () => {
    setIsChecking(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user?.email_confirmed_at) {
        toast.success('Email verified successfully!')
        onVerified()
      } else {
        toast.error('Email not yet verified')
      }
    } catch (error) {
      console.error('Check verification error:', error)
      toast.error('Failed to check verification status')
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Verify Your Email
        </h2>
        <p className="text-gray-600 mb-6">
          We&apos;ve sent a verification link to:
          <br />
          <strong>{email}</strong>
        </p>
        
        <div className="space-y-4">
          <Button
            onClick={checkVerification}
            disabled={isChecking}
            className="w-full"
          >
            {isChecking ? 'Checking...' : 'I\'ve Verified My Email'}
          </Button>
          
          <Button
            onClick={resendVerification}
            disabled={isResending}
            variant="outline"
            className="w-full"
          >
            {isResending ? 'Sending...' : 'Resend Verification Email'}
          </Button>
        </div>
        
        <p className="text-sm text-gray-500 mt-4">
          Didn&apos;t receive the email? Check your spam folder or try resending.
        </p>
      </div>
    </div>
  )
}