"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {  useState } from "react";
import { Button } from "@/components/ui/button";

import { Eye, EyeOff } from "lucide-react";
import GoogleButton from "./GoogleButton";
import { signInWithEmailAndPasswordService } from "@/service/UserServices";
import { Toast, ToastContainer } from "../ui/toast";
import { useToast } from "@/hooks/useToast";

export default function LoginForm() {

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast, showError, showSuccess, removeToast } = useToast();
    const router = useRouter();

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await signInWithEmailAndPasswordService(formData);

        if (result?.error) {
            showError(result.error || "An error occurred during login.", 4000);
            setIsLoading(false);
        } else if (result?.success && result?.redirectTo) {
            showSuccess("Login successful!");
            router.push(result.redirectTo);
        }

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
                <GoogleButton />
            </form>
        </>        
    );
} 