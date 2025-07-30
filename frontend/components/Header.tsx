"use client";

import localFont from "next/font/local";
import { IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import SwitchThemeBtn from "./SwitchThemeBtn";
import Link from "next/link";
import UserProfileMenu from "./user-profile/UserProfileMenu";
import { getUserService } from "@/service/UserServices";
import { useUserStore } from "@/store/useUserStore";
import { usePathname } from "next/navigation";

const righteousFont = localFont({
    src: "../public/fonts/Righteous-Regular.ttf",
});

export default function Header() {

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    //const [user, setUser] = useState<User | null>(null);
    const userStore = useUserStore((state) => state.user);
    const setUserStore = useUserStore((state) => state.setUser);
    const pathname = usePathname();

    useEffect(() => {
        const getUser = async () => {
            const user = await getUserService();
            setUserStore(user);
        }
        getUser();
    }, []);

    return (
        <>
            {isSidebarOpen && (
                <div 
                    className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-10 transition-all ease-in-out duration-300"
                    onClick={() => {
                        setIsSidebarOpen(false);
                    }}
                >
                    <Sidebar />
                </div>
            )}
            <header className="flex flex-row items-center justify-between">
                <div className="hidden xl:flex flex-row items-center justify-center gap-4">
                    {pathname.includes("/setting-page/my-profile") !== true && (
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="min-w-3xl h-full rounded-lg px-4 py-4 bg-[#F8F6FF] dark:bg-[#1D2335] text-xl focus:outline-none border-2 dark:border-transparent focus:border-[#6A4BFF] dark:focus:border-[#6A4BFF] dark:text-white" 
                        />
                    )}
                </div>
                <div className="xl:hidden flex flex-row items-center justify-center gap-2">
                    <button 
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            setIsSidebarOpen(!isSidebarOpen);
                        }}
                        className="bg-transparent"
                    >
                        <IoMenu 
                            size={48}
                            className="text-[#6A4BFF]" 
                        />
                    </button>
                    <p className={`${righteousFont.className} text-2xl font-bold dark:text-white`}>Alpha Drive</p>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                    <div className="xl:hidden">
                        <SwitchThemeBtn />
                    </div>
                    {userStore ? (
                        <UserProfileMenu user={userStore} />
                    ) : (
                        <button 
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                            }}
                            className="bg-[#6A4BFF] text-white px-6 py-4 font-semibold rounded-md cursor-pointer hover:bg-[#573FDB]/75 transition-all ease-in-out duration-300">
                            <Link href="/login-page">
                                Sign in
                            </Link>
                        </button>
                    )}
                </div>
            </header>
        </>
    );
}   