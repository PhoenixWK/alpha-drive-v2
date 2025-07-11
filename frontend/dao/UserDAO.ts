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


export async function signUp(email: string, password: string) {
    const supabase = await createClient();

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
        if(data.user.identities && data.user.identities.length === 0) {
            return {error: "Email is already registered!"};
        }       
    }

    return { success: true, user: data.user };
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

    if (error) {
        console.error('Error fetching user:', error);
        return null;
    }

    if (!user) {
        console.warn('No user found');
        return null;
    }

    return user;
}

export async function getUserOrRedirect() {
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

export async function getUserSession() {
    const supabase = await createClient();
    const { data: { session }, error } = await supabase.auth.getSession();
    
    return { session, error };
}

export async function checkExistingUserProfile(user_id: string) {
    const supabase = await createClient();
    
    console.log('Checking existing user profile for:', user_id);
    
    const {data, error} = await supabase
        .from('user_profile')
        .select('*')
        .eq('user_id', user_id)
        .single();

    if (error) {
        console.log('Check existing profile result:', { error: error.code, message: error.message });
    } else {
        console.log('Existing profile found:', data);
    }

    return { data, error };
}

export async function createDefaultUserProfile(user_id: string, email: string) {
    const supabase = await createClient();
    
    console.log('Attempting to create user profile for:', { user_id, email });
    
    const { data, error } = await supabase
        .from('user_profile')
        .insert({
            user_id: user_id,
            email: email,
            role: 'user' // Explicitly set the role
        })
        .select() // Return the inserted data
        
    if (error) {
        console.error('Error creating user profile:', error);
    } else {
        console.log('User profile created successfully:', data);
    }
        
    return { data, error };  
}