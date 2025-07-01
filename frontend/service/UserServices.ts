'use server'

import { getUser, logout, signInWithEmailAndPassword, signInWithGoogle, signUp } from "@/dao/UserDAO";


export async function signInWithEmailAndPasswordService(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Server-side validation
    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    try {
        const result = await signInWithEmailAndPassword(email, password);
        
        if (result?.error) {
            return { error: result.error };
        }

        if (result?.success) {
            // Return success with redirect URL instead of redirecting
            return { 
                success: true, 
                redirectTo: '/' 
            };
        }

        return { error: "Failed to log in. Please check your credentials." };
    } catch (error) {
        console.error('Login service error:', error);
        return { error: "An unexpected error occurred. Please try again." };
    }
}

export async function signInWithGoogleService(){
    return await signInWithGoogle();
}

export async function signUpService(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Server-side validation
    if(!email || !password || !confirmPassword) {
        return { error: "All fields are required" };
    }

    if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    try {
        const result = await signUp(email, password);
        
        if (result?.error) {
            return { error: result.error };
        }

        if (result?.success) {
            // Return success with redirect URL instead of redirecting
            return { 
                success: true, 
                redirectTo: '/auth/verify-email?email=' + encodeURIComponent(email) 
            };
        }

        return { error: "Failed to create account. Please try again." };
    } catch (error) {
        console.error('Signup service error:', error);
        return { error: "An unexpected error occurred. Please try again." };
    }
}

export async function logoutService() {
    return await logout();
}

export async function getUserService() {
    return await getUser();
}