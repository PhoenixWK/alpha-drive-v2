import { getUserOwnedPlan } from "@/dao/UserOwnedDAO";

export async function getUserOwnedPlanService(user_id: string) {
    try {
        const userOwnedPlanResponse = await getUserOwnedPlan(user_id);

        if(userOwnedPlanResponse.error) {
            console.error('Error fetching user owned plan:', userOwnedPlanResponse.error);
            return { error: userOwnedPlanResponse.error.message || "An error occurred while retrieving your owned plan." };
        }

        return { data: userOwnedPlanResponse.data };
    } catch(error) {
        console.error('Unexpected error in getUserOwnedPlanService:', error);
        return { error: "An unexpected error occurred while retrieving your owned plan." };
    }
}