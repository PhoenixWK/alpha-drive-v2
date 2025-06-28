'use server'

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithGoogle() {
    const supabase = await createClient();
    
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    });

    if (error) {
        console.error('OAuth error:', error);
        return { error };
    }

    // Redirect to the OAuth URL
    if (data.url) {
        redirect(data.url);
    }

    return { data, error };
}

export async function logout() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    
    if (!error) {
        redirect('/login-page');
    }
    
    return { error };
}

export async function getUser() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (!user) {
        console.warn('No user found, redirecting to login');
        redirect('/login-page');
    }
    if (error) {
        console.error('Error fetching user:', error);
        return null;
    }

    return user;
}