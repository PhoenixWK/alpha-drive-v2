"use client";

import { getCalculateFilesStorageUsedService } from "@/service/FilesService";
import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { FaFileAlt } from "react-icons/fa";

export default function StorageStatistic() {
    
    const userStore = useUserStore((state) => state.user);
    const [fileCount, setFileCount] = useState<number>(0);

    useEffect(() => {
        const getFileCount = async () => {
            const countResponse = await getCalculateFilesStorageUsedService(userStore?.user_id as string);
            setFileCount(countResponse);
        }
        getFileCount();
    }, [])

    return (
        <div className="w-1/2 p-4 bg-[#F7F3FF] dark:bg-[#2c225f] border-2 border-[#AA4BFF] rounded-md flex flex-col items-center justify-center gap-4">
            <FaFileAlt 
                size={28}
                className="text-[#6A4BFF]"
            />
            <p className="text-4xl font-bold text-[#6A4BFF]">
                {fileCount}
            </p>
            <p className="text-lg dark:text-white font-semibold">
                Files
            </p>
        </div>
    )
}