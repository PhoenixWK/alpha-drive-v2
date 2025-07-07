import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Successfully authenticated, redirect to home page
      // User profile creation will be handled in LoginForm or when user logs in
      return NextResponse.redirect(`${origin}/`)
    } else {
      console.error('Error exchanging code for session:', error)
      // If there's an error, redirect to login with error
      return NextResponse.redirect(`${origin}/login-page?error=auth_failed`)
    }
  }

  // No code provided, redirect to error page
  return NextResponse.redirect(`${origin}/login-page?error=no_code`)
}