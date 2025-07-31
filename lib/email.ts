import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export type EmailTemplate = 
  | 'welcome'
  | 'email_verification'
  | 'password_reset'
  | 'new_follower'
  | 'new_comment'
  | 'new_like'

interface EmailData {
  to: string
  template: EmailTemplate
  data: Record<string, any>
}

export async function sendEmail({ to, template, data }: EmailData) {
  try {
    const { data: result, error } = await supabaseAdmin.functions.invoke('send-email', {
      body: {
        to,
        template,
        data
      }
    })

    if (error) throw error
    return result
  } catch (error) {
    console.error('Email sending error:', error)
    throw error
  }
}

// Utility functions for common emails
export const emailUtils = {
  sendWelcomeEmail: (email: string, displayName: string) =>
    sendEmail({
      to: email,
      template: 'welcome',
      data: { displayName }
    }),

  sendNewFollowerNotification: (email: string, followerName: string, followerUsername: string) =>
    sendEmail({
      to: email,
      template: 'new_follower',
      data: { followerName, followerUsername }
    }),

  sendNewCommentNotification: (email: string, commenterName: string, postTitle: string) =>
    sendEmail({
      to: email,
      template: 'new_comment',
      data: { commenterName, postTitle }
    })
}