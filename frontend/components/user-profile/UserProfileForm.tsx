"use client"

import { useUserStore } from "@/store/useUserStore";
import { Button } from "../ui/button";

export default function UserProfileForm() {

    const userStore = useUserStore((state) => state.user);

    return (
        <form className="space-y-5 w-full lg:w-2/3">
            <div className="space-y-2">
                <label htmlFor="username" className="block text-[#364670] dark:text-white font-semibold">
                    Username
                </label>
                <input
                    required
                    id="username"
                    name="username"
                    type="text"
                    placeholder={userStore?.username || "Enter your username"}
                    className="w-full px-4 py-3 disabled:bg-gray-500/25 dark:bg-[#1D2335] dark:text-white rounded-md border-2 dark:border-0 focus:border-[#6A4BFF] focus:ring-0 focus:ring-offset-0"
                    disabled={true}
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="email" className="block text-[#364670] dark:text-white font-semibold">
                    Email
                </label>
                <div className="relative">
                    <input
                        id="email"
                        name="email"
                        placeholder={userStore?.email || "Enter your email"}
                        className="w-full px-4 py-3 disabled:bg-gray-500/25 dark:bg-[#1D2335] dark:text-white rounded-md border-2 dark:border-0 focus:border-[#6A4BFF] focus:ring-0 focus:ring-offset-0"
                        disabled={true}
                    />
                </div>
            </div>
        </form>
    );
}