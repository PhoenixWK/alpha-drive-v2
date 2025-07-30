"use client"

import { getUserProfileImageLinkService } from "@/service/UserServices";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image"
import { useEffect, useState } from "react";
import UserOwnedPlan from "./UserOwnedPlan";

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
                    src={userProfileImageLink || "/user-profile.png"}
                    alt="User Avatar" 
                    className="w-full h-full object-cover"
                    width={192}
                    height={192}
                    priority={true}
                />
            </div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-4xl font-semibold dark:text-white">{userStore?.username}</p>
                    <UserOwnedPlan />
                </div>
                <p className="text-sm font-semibold text-black dark:text-gray-300">Created at: {userStore?.created_at?.substring(0, 10)}</p>
            </div>
        </div>
    )
}