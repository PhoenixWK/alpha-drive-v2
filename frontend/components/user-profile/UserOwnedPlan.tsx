'use client'

import { getUserOwnedPlanService } from "@/service/UserOwnedPlanService";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react"

export default function UserOwnedPlan() {

    const userStore = useUserStore((state) => state.user);
    const updateUserOwnedPlan = useUserStore((state) => state.updateUserOwnedPlan);
    
    useEffect(() => {
        const getUserOwnedPlan = async () => {
            const userOwnedPlanResponse = await getUserOwnedPlanService(userStore?.user_id as string);
            if(userOwnedPlanResponse.error) {
                console.error('Error fetching user owned plan:', userOwnedPlanResponse.error);
            } else {
                updateUserOwnedPlan(userOwnedPlanResponse.data?.[0]?.plan_id);
            }
        }
        getUserOwnedPlan();
    }, [])
    
    return (
        <div className="mt-2 w-fit px-2 bg-[#D5FFED] border-2 border-[#52FFB1] text-center text-[#05C47E] rounded-md">
            <p className="text-sm font-semibold">{userStore?.owned_plan || 'No plan'}</p>
        </div>
    )
}