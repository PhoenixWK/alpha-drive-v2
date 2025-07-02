'use server'

import { getUser, logout, resetPasswordForEmail, signInWithEmailAndPassword, signInWithGoogle, signUp, updateUserPassword } from "@/dao/UserDAO";
import { redirect } from "next/dist/server/api-utils";


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
                success: result.success, 
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

export async function resetPasswordForEmailService(formData: FormData) {
    const email = formData.get("email") as string;

    if(!email) {
        return { error: "Email field are required" };
    }

    try {
        const result = await resetPasswordForEmail(email);
        if (result?.error) {
            return { error: result.error.message || "Failed to send reset password email" };
        }

        return {
            success: true,
            message: "Password reset email sent successfully. Please check your email to reset your password."
        }
    } catch (error) {
        return { error: "An unexpected error occurred. Please try again." };
    }
}

export default async function updateUserPasswordService(formData: FormData) {
    const newPassword = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!newPassword || !confirmPassword) {
        return { error: "All fields are required" };
    }

    if (newPassword !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    try {
        const result = await updateUserPassword(newPassword);
        if (result?.error) {
            return { error: result.error.message || "Failed to update password" };
        }

        return { success: true, message: "Password updated successfully", redirectTo: '/login-page' };
    } catch (error) {
        return { error: "An unexpected error occurred. Please try again." };
    }
}

export async function getUserService() {
    return await getUser();
}