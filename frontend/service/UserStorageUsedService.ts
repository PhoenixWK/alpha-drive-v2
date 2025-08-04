import { getUserStorageUsed } from "@/dao/UserStorageUsedDAO";

export async function getUserStorageUsedService(user_id: string) {
    try {
        const userStorageUsedServiceResponse = await getUserStorageUsed(user_id);

        if(userStorageUsedServiceResponse.error) {
            console.error('Error fetching user storage used:', userStorageUsedServiceResponse.error);
            return { error: userStorageUsedServiceResponse.error.message || "An error occurred while retrieving your user storage used." };
        }

        return {data: userStorageUsedServiceResponse.data}
    }catch(error) {
        console.error('Unexpected error in getUserStorageUsedService:', error);
        return { error: "An unexpected error occurred while retrieving your owned plan." };
    }
}