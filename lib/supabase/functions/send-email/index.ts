import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

interface EmailRequest {
  to: string
  template: string
  data: Record<string, any>
}

const emailTemplates = {
  welcome: {
    subject: 'Welcome to Filthy Fame! 🎉',
    html: (data: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4f46e5;">Welcome to Filthy Fame, ${data.displayName}!</h1>
        <p>We're excited to have you join our community of creators and culture enthusiasts.</p>
        <p>Get started by:</p>
        <ul>
          <li>Completing your profile</li>
          <li>Following your favorite creators</li>
          <li>Sharing your first post</li>
        </ul>
        <p>Let's build something amazing together!</p>
      </div>
    `
  },
  new_follower: {
    subject: 'You have a new follower! 👥',
    html: (data: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #10b981;">New Follower Alert!</h1>
        <p><strong>${data.followerName}</strong> (@${data.followerUsername}) started following you.</p>
        <p>Check out their profile and consider following back!</p>
      </div>
    `
  }
}

serve(async (req: { method: string; json: () => EmailRequest | PromiseLike<EmailRequest> }) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { to, template, data }: EmailRequest = await req.json()
    
    const emailTemplate = emailTemplates[template as keyof typeof emailTemplates]
    if (!emailTemplate) {
      throw new Error(`Template '${template}' not found`)
    }

    const emailData = {
      from: 'Filthy Fame <noreply@filthyfame.com>',
      to: [to],
      subject: emailTemplate.subject,
      html: emailTemplate.html(data)
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    })

    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to send email')
    }

    return new Response(JSON.stringify({ success: true, id: result.id }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })
  } catch (error) {
    console.error('Email error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400
    })
  }
})