'use server'

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export async function signInWithEmailAndPassword(email: string, password: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if(data.user?.confirmed_at === null) {
            return { error: "Please confirm your email address before logging in." };
        }

        if (error) {
            console.error('Login error:', error);
            return { error: error.message };
        }

        if (data.user) {
            console.log('User logged in successfully:');
            return { success: true, user: data.user };
        }

        return { error: "Failed to log in" };
}

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

export async function signUp(email: string, password: string) {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}`
            }
        });

        if (error) {
            console.error('Signup error:', error);
            return { error: error.message };
        }

        if (data.user) {
            console.log('User signed up successfully:', data.user);
            return { success: true, user: data.user };
        }

        return { error: "Failed to create user" };
    } catch (error) {
        console.error('Unexpected signup error:', error);
        return { error: "An unexpected error occurred" };
    }
}

//this function is used to send a password reset to users' email
export async function resetPasswordForEmail(email: string) {
    const supabase = await createClient();

    const {data, error} = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/recovery/update-password`,
    });

    return { data, error };
}

//this function is used to update the user's password after they have reset it
export async function updateUserPassword(newPassword: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword
    });

    return {data, error};
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
