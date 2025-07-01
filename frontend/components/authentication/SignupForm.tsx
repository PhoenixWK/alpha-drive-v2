"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { validateConfirmPassword, validateEmail, validatePassword } from "@/bus/UserBUS";
import { signUpService } from "@/service/UserServices";

export default function SignupForm() {
    const [error, setError] = useState<{field_error: string} | null>(null);
    const [password, setPassword] = useState<string>("");
    const [serverError, setServerError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setServerError(null);
        
        const formData = new FormData(e.currentTarget);
        const result = await signUpService(formData);
        
        if (result?.error) {
            setServerError(result.error);
            setIsLoading(false);
        } else if (result?.success && result?.redirectTo) {
            router.push(result.redirectTo);
        }
    };
  
    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            {serverError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                    <p className="text-sm font-medium">{serverError}</p>
                </div>
            )}
            <div className="space-y-2">
                <label htmlFor="email" className="block text-[#364670] dark:text-white font-semibold">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={`w-full px-4 py-3 dark:bg-[#1D2335] dark:text-white rounded-md border-2 focus:ring-0 focus:ring-offset-0 ${
                        error?.field_error === "email" 
                            ? "border-red-500 focus:border-red-500 dark:border-red-500" 
                            : "dark:border-0 focus:border-[#6A4BFF] border-gray-300"
                    }`}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const email: string = e.target.value;
                        if(!validateEmail(email)) {
                            setError({ field_error: "email"});
                        }else {
                            setError(null);
                        }
                    }}
                />
                {error?.field_error === "email" && (
                    <p className="text-red-500 text-sm font-semibold mt-1">
                        Please enter a valid email address
                    </p>
                )}
            </div>
            <div className="space-y-2">
                <label htmlFor="password" className="block text-[#364670] dark:text-white font-semibold">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={`w-full px-4 py-3 dark:bg-[#1D2335] dark:text-white rounded-md border-2 focus:ring-0 focus:ring-offset-0 ${
                        error?.field_error === "password" 
                            ? "border-red-500 focus:border-red-500 dark:border-red-500" 
                            : "dark:border-0 focus:border-[#6A4BFF] border-gray-300"
                    }`}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const password: string = e.target.value;
                        if(!validatePassword(password)) {
                            setError({ field_error: "password" });
                        }else {
                            setPassword(password);
                            setError(null);
                        }
                    }}
                    
                />
                {error?.field_error === "password" && (
                    <p className="text-red-500 text-sm font-semibold mt-1">
                        Password must be at least 10 characters long, contain at least one uppercase letter, one lowercase letter, and one number.
                    </p>
                )}
            </div>
            <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-[#364670] dark:text-white font-semibold">
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className={`w-full px-4 py-3 dark:bg-[#1D2335] dark:text-white rounded-md border-2 focus:ring-0 focus:ring-offset-0 ${
                        error?.field_error === "confirm_password" 
                            ? "border-red-500 focus:border-red-500 dark:border-red-500" 
                            : "dark:border-0 focus:border-[#6A4BFF] border-gray-300"
                    }`}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const confirmPassword: string = e.target.value;
                        if(!validateConfirmPassword(confirmPassword, password)) {
                            setError({ field_error: "confirm_password" });
                        }else {
                            setError(null);
                        }
                    }}
                />
                    {error?.field_error === "confirm_password" && (
                        <p className="text-red-500 text-sm font-semibold mt-1">
                            Passwords do not match.
                        </p>
                    )}
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="agree"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="agree" className="ml-2 block text-sm font-semibold text-[#364670] dark:text-white">
                        I have read and agree to the <Link href="/terms-of-service" className="text-[#6A4BFF] font-semibold">Terms of Service</Link>
                    </label>
                </div>
            </div>
            <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3 h-12 bg-[#6A4BFF] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Creating Account...' : 'Sign up'}
            </Button>
          </form>
    );
} 