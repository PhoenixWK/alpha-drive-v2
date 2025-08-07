import { getUserOwnedPlan } from "@/dao/UserOwnedDAO";

export async function getUserOwnedPlanService(user_id: string) {
    try {
        const userOwnedPlanResponse = await getUserOwnedPlan(user_id);

        if(userOwnedPlanResponse.error) {
            return { error: userOwnedPlanResponse.error.message || "An error occurred while retrieving your owned plan." };
        }

        return { data: userOwnedPlanResponse.data };
    } catch(error) {
        return { error: "An unexpected error occurred while retrieving your owned plan." };
    }
}