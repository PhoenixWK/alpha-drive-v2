import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  if (token_hash && type) {
    const supabase = await createClient()

    try {
      const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      })
      
      if (!error) {
        console.log('Email verification successful')
        // Redirect to login page after successful verification
        redirect(next)
      } else {
        console.error('Email verification error:', error)
        redirect('/auth/verify-email?error=verification_failed')
      }
    } catch (error) {
      console.error('Unexpected verification error:', error)
      redirect('/auth/verify-email?error=unexpected_error')
    }
  }

  // redirect the user to an error page if no token or type
  console.log('Missing token_hash or type')
  redirect('/auth/verify-email?error=invalid_link')
}