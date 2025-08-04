import { calculateFilesStorageUsed } from "@/dao/FilesDAO";

export async function getCalculateFilesStorageUsedService(userId: string) {
    try {
        const calculateFilesStorageUsedResponse = await calculateFilesStorageUsed(userId);

        if (calculateFilesStorageUsedResponse.error) {
            console.error('Error fetching storage used:', calculateFilesStorageUsedResponse.error);
            return 0;
        }

        return calculateFilesStorageUsedResponse.count || 0
    }catch(error) {
        console.error('Unexpected error in getCalculateFilesStorageUsedService:', error);
        return 0;
    }
}