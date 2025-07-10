"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { Eye, EyeOff } from "lucide-react";
import { createDefaultUserProfileService, signInWithEmailAndPasswordService } from "@/service/UserServices";
import { Toast, ToastContainer } from "../ui/toast";
import { useToast } from "@/hooks/useToast";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/store/useUserStore";
import { User } from "@supabase/supabase-js";

export default function LoginForm() {

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast, showError, showSuccess, removeToast } = useToast();
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        const supabase = createClient();
        
        const {data: {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
            if(event === 'SIGNED_IN') {
                // User is signed in, you can handle the session here
                setUser(session?.user as User);
            }
        });
        return () => subscription.unsubscribe()
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await signInWithEmailAndPasswordService(formData);

        if (result?.error) {
            showError(result.error || "An error occurred during login.", 4000);
            setIsLoading(false);
            return; // Return early on error
        } 

        // Only create profile after successful login
        try {
            const response = await createDefaultUserProfileService();
            
            if (response?.error) {
                showError(response.error, 4000);
            } else if (response?.success) {
                if (response.isExistingProfile) {
                    showSuccess("Welcome back!", 3000);
                } else {
                    showSuccess("Profile created successfully! Welcome!", 3000);
                }
            }
        } catch (error) {
            console.error('Profile creation error:', error);
            showError("Profile setup failed, but login was successful.", 4000);
        }
        
        setIsLoading(false);
        router.push("/"); 
    };

    return (
        <>
            {toast && (
                <ToastContainer>
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        duration={toast.duration}
                        onClose={removeToast}
                    />
                </ToastContainer>
            )}
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-[#364670] dark:text-white font-semibold">
                        Email
                    </label>
                    <input
                        required
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 dark:bg-[#1D2335] dark:text-white rounded-md border-2 dark:border-0 focus:border-[#6A4BFF] focus:ring-0 focus:ring-offset-0"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-[#364670] dark:text-white font-semibold">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            required
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full px-4 py-3 dark:bg-[#1D2335] dark:text-white rounded-md border-2 dark:border-0 focus:border-[#6A4BFF] focus:ring-0 focus:ring-offset-0"
                        />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#364670]"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>
                <div>
                    <Link href="/recovery/enter-email" className="text-[#6A4BFF] text-sm font-semibold dark:text-white">
                        Forgot password?
                    </Link>
                </div>
                <Button 
                    type="submit" 
                    className="w-full py-3 h-12 bg-[#6A4BFF] hover:bg-[#6A4BFF]/75 text-white font-semibold"
                    disabled={isLoading}    
                >
                    Sign in
                </Button>
            </form>
        </>        
    );
} 