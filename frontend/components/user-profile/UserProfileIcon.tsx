"use client"

import { getUserProfileImageLinkService } from "@/service/UserServices";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image"
import { useEffect, useState } from "react";

export default function UserProfileIcon() {

    const userStore = useUserStore((state) => state.user);
    const [userProfileImageLink, setUserProfileImageLink] = useState<string | undefined>(undefined);

    useEffect(() => {
        const getUserProfileImageLink = async () => {
            const link = await getUserProfileImageLinkService(`${userStore?.username}/user-profile-image/avatar.png`, 60 * 60);
            setUserProfileImageLink(link.signedUrl);
        }
        getUserProfileImageLink();
    }, [userProfileImageLink])

    return (
        <div className="flex flex-row gap-4">
            <div className="flex items-center justify-center w-28 h-28 rounded-md bg-gray-200 dark:bg-gray-700">
                <Image 
                    src={userProfileImageLink || "/default-avatar.png"}
                    alt="User Avatar" 
                    className="w-full h-full object-cover"
                    width={192}
                    height={192}
                    priority={true}
                />
            </div>
            <div className="text-center">
                <p className="text-2xl font-semibold dark:text-white">{userStore?.username}</p>
                <p className="text-gray-500 dark:text-gray-300">{userStore?.email}</p>
            </div>
        </div>
    )
}