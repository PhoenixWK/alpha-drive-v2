import { getUserStorageUsed } from "@/dao/UserStorageUsedDAO";

export async function getUserStorageUsedService(user_id: string) {
    try {
        const userStorageUsedServiceResponse = await getUserStorageUsed(user_id);

        if(userStorageUsedServiceResponse.error) {
            return { error: userStorageUsedServiceResponse.error.message || "An error occurred while retrieving your user storage used." };
        }

        return {data: userStorageUsedServiceResponse.data}
    }catch(error) {
        return { error: "An unexpected error occurred while retrieving your user storage used." };
    }
}