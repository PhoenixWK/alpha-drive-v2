"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { validateConfirmPassword, validatePassword } from "@/bus/UserBUS";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import updateUserPasswordService from "@/service/UserServices";
import { Toast, ToastContainer } from "../ui/toast";

export default function UpdatePasswordForm() {

    const router = useRouter();
    const [errorField, setErrorField] = useState<{field_error: string} | null>(null);
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast, showError, showSuccess, removeToast } = useToast();

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        const formData = new FormData(e.currentTarget);
        const result = await updateUserPasswordService(formData)
        
        if (result?.error) {
            showError(result.error);
            setIsLoading(false);
        } else if (result?.success && result?.redirectTo) {
            showSuccess("Account created successfully! Please check your email to verify your account.");
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
                    <label htmlFor="password" className="block text-[#364670] dark:text-white font-semibold">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        className={`w-full px-4 py-3 dark:bg-[#1D2335] dark:text-white rounded-md border-2 focus:ring-0 focus:ring-offset-0 ${
                            errorField?.field_error === "password" 
                                ? "border-red-500 focus:border-red-500 dark:border-red-500" 
                                : "dark:border-0 focus:border-[#6A4BFF] border-gray-300"
                        }`}
                        required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const password: string = e.target.value;
                            if(!validatePassword(password)) {
                                setErrorField({ field_error: "password" });
                            }else {
                                setPassword(password);
                                setErrorField(null);
                            }
                        }}
                        
                    />
                    {errorField?.field_error === "password" && (
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
                            errorField?.field_error === "confirm_password" 
                                ? "border-red-500 focus:border-red-500 dark:border-red-500" 
                                : "dark:border-0 focus:border-[#6A4BFF] border-gray-300"
                        }`}
                        required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const confirmPassword: string = e.target.value;
                            if(!validateConfirmPassword(password, confirmPassword)) {
                                setErrorField({ field_error: "confirm_password" });
                            }else {
                                setErrorField(null);
                            }
                        }}
                    />
                        {errorField?.field_error === "confirm_password" && (
                            <p className="text-red-500 text-sm font-semibold mt-1">
                                Passwords do not match.
                            </p>
                        )}
                </div>
                <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-3 h-12 bg-[#6A4BFF] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Updating password...' : 'Submit'}
                </Button>
            </form>
        </>
    )
}