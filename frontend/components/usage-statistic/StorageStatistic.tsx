"use client"

import { getUserStorageUsedService } from "@/service/UserStorageUsedService";
import { useUserStorageUsed } from "@/store/useUserStorageUsed";
import { useUserStore } from "@/store/useUserStore";
import { useEffect, Suspense } from "react";
import { MdStorage } from "react-icons/md";
import StorageProgress from "./StorageProgress";
import { convertStorageUnits } from "@/bus/UserStorageUsed";

export default function StorageStatistic() {

    const userStore = useUserStore((state) => state.user);
    const userStorageUsed = useUserStorageUsed(state => state.userStorageUsed)
    const setUserStorageUsed = useUserStorageUsed(state => state.setUserStorageUsed)

    useEffect(() => {
        const fetchUserStorageUsed = async () => {
            const userStorageUsedResponse = await getUserStorageUsedService(userStore?.user_id as string)

            if(userStorageUsedResponse.data) {
                setUserStorageUsed(userStorageUsedResponse.data?.[0])
            }
        }
        fetchUserStorageUsed()
    }, [userStore, setUserStorageUsed]);

    return (
        <div className="p-4 bg-[#EEFEF8] dark:bg-[#2d825a] border-2 border-[#01C46C] rounded-sm">
            <div className="flex justify-between">
                <div className="flex items-center justify-start gap-2">
                    <MdStorage 
                        size={28}
                        className="text-[#FF9D26]"
                    />
                    <h3 className="text-lg dark:text-white font-semibold">
                        Storage
                    </h3>
                </div>
                <Suspense>
                    <p className="text-lg dark:text-white font-semibold">
                        {convertStorageUnits(userStorageUsed?.used_storage as number, userStorageUsed?.memory_unit as string) || 0} / {userStorageUsed?.max_storage || 0} {userStorageUsed?.memory_unit}
                    </p>
                </Suspense>
            </div>
            <div className="mt-2">
                <StorageProgress 
                    used_storage={userStorageUsed?.used_storage || 0} 
                    max_storage={userStorageUsed?.max_storage || 0} 
                    memory_unit={userStorageUsed?.memory_unit as string}
                />
            </div>
        </div>
    )
}