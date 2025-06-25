"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import localFont from "next/font/local";
import Image from "next/image";

import SwitchThemeBtn from "./SwitchThemeBtn";
import { BiSolidDashboard } from "react-icons/bi";
import { IoMdShare } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const righteousFont = localFont({
    src: "../public/fonts/Righteous-Regular.ttf",
});

export default function Sidebar() {

    const pathname = usePathname();

    return (
        <aside className="w-64 h-full bg-[#F8F6FF] dark:bg-[#1B1A30] px-6 py-8 xl:flex flex-col items-center justify-between">
            <div className="space-y-10">
                <div className="flex flex-row items-center justify-center gap-4">
                    <Image 
                        src="/logo.png" 
                        alt="logo" 
                        width={48} 
                        height={48}
                        priority={true} 
                        className="w-auto h-auto"
                    />
                    <h1 className={`${righteousFont.className} text-2xl font-bold dark:text-white`}>Alpha Drive</h1>
                </div>
                <nav className="flex flex-col gap-4">
                    <Link
                        href="/"
                        className={`px-8 py-4 rounded-lg flex flex-row items-center gap-4 cursor-pointer transition-all duration-300 ${pathname === "/" ? "bg-[#6A4BFF] text-white" : "text-black dark:text-white hover:bg-[#cac2f8] dark:hover:bg-[#242038]"}`}
                    >
                        <BiSolidDashboard  
                            size={32}
                            className={`${pathname === "/" ? "text-white" : "text-black dark:text-white"}`}
                        />
                        <p className={`${pathname === "/" ? "text-white" : "text-black dark:text-white"} text-xl font-bold`}>Dashboard</p>
                    </Link>
                    <Link
                        href="/shared-page"
                        className={`px-8 py-4 rounded-lg flex flex-row items-center gap-4 cursor-pointer  transition-all duration-300 ${pathname === "/shared-page" ? "bg-[#6A4BFF] text-white" : "text-black dark:text-white hover:bg-[#cac2f8] dark:hover:bg-[#242038]"}`}
                    >
                        <IoMdShare
                            size={32}
                            className={`${pathname === "/shared-page" ? "text-white" : "text-black dark:text-white"}`}
                        />
                        <p className={`${pathname === "/shared-page" ? "text-white" : "text-black dark:text-white"} text-xl font-bold`}>Shared</p>
                    </Link>
                    <Link
                        href="/starred-page"
                        className={`px-8 py-4 rounded-lg flex flex-row items-center gap-4 cursor-pointer  transition-all duration-300 ${pathname === "/starred-page" ? "bg-[#6A4BFF] text-white" : "text-black dark:text-white hover:bg-[#cac2f8] dark:hover:bg-[#242038]"}`}
                    >
                        <FaRegStar
                            size={32}
                            className={`${pathname === "/starred-page" ? "text-white" : "text-black dark:text-white"}`}
                        />
                        <p className={`${pathname === "/starred-page" ? "text-white" : "text-black dark:text-white"} text-xl font-bold`}>Starred</p>
                    </Link>
                    <Link
                        href="/deleted-page"
                        className={`px-8 py-4 rounded-lg flex flex-row items-center gap-4 cursor-pointer  transition-all duration-300 ${pathname === "/deleted-page" ? "bg-[#6A4BFF] text-white" : "text-black dark:text-white hover:bg-[#cac2f8] dark:hover:bg-[#242038]"}`}
                    >
                        <RiDeleteBin6Line
                            size={32}
                            className={`${pathname === "/deleted-page" ? "text-white" : "text-black dark:text-white"}`}
                        />
                        <p className={`${pathname === "/deleted-page" ? "text-white" : "text-black dark:text-white"} text-xl font-bold`}>Deleted</p>
                    </Link>
                </nav>
            </div>
            <div className="hidden xl:block">
                <SwitchThemeBtn />
            </div>
        </aside>
    );
}   