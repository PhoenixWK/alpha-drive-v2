'use server'

import { createClient } from "@/lib/supabase/server";

export async function getUserOwnedPlan(user_id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('owned_plan')
        .select('plan_id')
        .eq('user_id', user_id);

    return { data, error };
}