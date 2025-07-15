"use client"

import Link from "next/link"
import { User } from "@supabase/supabase-js"
import { FaUserCircle } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LogoutButton from "../authentication/LogoutButton"


export default function UserProfileMenu({user}: {user: UserProfile | null}) {
    if (!user) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="">
                <button 
                    onClick={e => e.preventDefault()} 
                    className="relative group"
                >                   
                    {/* <img
                        src={user.user_metadata.avatar_url || user.user_metadata.picture || "/default-avatar.png"}
                        alt="User Avatar"
                        className="w-12 h-12 rounded-full object-cover transition-all duration-200"
                    /> */}
                    <FaUserCircle size={48} className="text-black dark:text-white"/>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-25 rounded-full transition-all duration-200"></div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-2 mt-2 mr-5 dark:bg-[#1D2335] dark:border-none" align="start">
                    <DropdownMenuGroup>
                        <DropdownMenuItem 
                            onClick={e => e.preventDefault()}
                            className="text-md dark:text-white dark:hover:bg-[#2d3242] font-semibold py-3"
                        >
                            <Link href={`/setting-page/my-profile/${user.email}`}>
                                My Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-md dark:text-white dark:hover:bg-[#2d3242] font-semibold py-3">
                            Billing
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-2"/>
                <DropdownMenuItem className="text-md dark:text-white dark:hover:bg-[#2d3242] font-semibold py-3">
                    <LogoutButton>
                        Logout  
                    </LogoutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}