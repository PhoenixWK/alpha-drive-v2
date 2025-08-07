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
            updateUserOwnedPlan(userOwnedPlanResponse.data?.[0].plan_name);
        }
        getUserOwnedPlan();
    }, [userStore?.owned_plan])
    
    return (
        <div className="mt-2 w-fit px-2 bg-[#D5FFED] dark:bg-[#7cffc6] border-2 border-[#52FFB1] text-center text-[#05C47E] rounded-sm">
            <p className="text-sm font-semibold">{userStore?.owned_plan || 'No plan'}</p>
        </div>
    )
}