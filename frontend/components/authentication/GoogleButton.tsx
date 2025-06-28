'use client'

import { createClient } from '@/lib/supabase/client'
import { signInWithGoogleService } from '@/service/UserServices';
import { useState } from 'react'

import { FaGoogle } from "react-icons/fa";

export default function LoginButton() {
    const [isLoading, setIsLoading] = useState(false);

    const supabase = createClient();

    const handleGoogleLogin = async () => {
        setIsLoading(true);

        try {
            const {error} = await signInWithGoogleService();

            if (error) {
                console.error('Auth error:', error.message)
            }
        } catch (error) {
            console.error('Login failed:', error)
        } finally {
                setIsLoading(false)
        }
    }

    return (
        <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 w-full px-6 py-3 dark:text-white border border-[#2B3656] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <FaGoogle className="text-xl text-gray-700 dark:text-white" />
            {isLoading ? 'Signing in...' : 'Continue with Google'}
        </button>
    )
}