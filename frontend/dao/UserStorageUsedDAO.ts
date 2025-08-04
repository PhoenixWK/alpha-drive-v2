'use server'

import { createClient } from "@/lib/supabase/server";

export async function getUserStorageUsed(user_id: string) {
    const supabase = await createClient();
    const {data, error} = await supabase
        .from('user_storage_used')
        .select(`
            used_storage,
            max_storage,
            memory_unit    
        `)
        .eq('user_id', user_id);

    return {data, error}
}