"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/useToast";
import { resetPasswordForEmailService } from "@/service/UserServices";
import { Toast, ToastContainer } from "../ui/toast";

export default function EnterEmailForm() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toast, showError, showSuccess, removeToast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await resetPasswordForEmailService(formData);

        if (result?.error) {
            showError(result.error || "An error occurred", 4000);
            setIsLoading(false);
        } else if (result?.success) {
            showSuccess(result.message);
        }
    }

    
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
                        disabled={isLoading}
                    />
                </div>
                <Button 
                    type="submit" 
                    className="w-full py-3 h-12 bg-[#6A4BFF] hover:bg-[#6A4BFF]/75 text-white font-semibold"
                    //disabled={isLoading}    
                >
                    Submit
                </Button>
            </form>
        </>
    )
}