// LogoutButton.tsx
"use client"

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { logoutService } from '@/service/UserServices'
import { useUserStore } from '@/store/useUserStore'

interface LogoutButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function LogoutButton({ children, className, onClick }: LogoutButtonProps) {
    const router = useRouter()
    const supabase = createClient()
    const clearUser = useUserStore((state) => state.clearUser);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_OUT') {
                // clear local and session storage
                [ window.localStorage,window.sessionStorage, ].forEach((storage) => {
                    Object.entries(storage).forEach(([key]) => {
                        storage.removeItem(key)
                    })
                })
                clearUser()
            }
        })

        return () => subscription.unsubscribe()
    }, [router, supabase.auth])

    return (
        <button onClick={logoutService} className={className}>
            {children}
        </button>
    )
}