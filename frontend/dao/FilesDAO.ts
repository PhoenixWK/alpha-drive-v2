'use server'

import { createClient } from "@/lib/supabase/server";

export async function calculateFilesStorageUsed(userId: string) {
    const supabase = await createClient();

    const { count, error } = await supabase
    .from('files')
    .select('*', { count: 'exact', head: true })

    if (error) {
        console.error('Error calculating files storage used:', error);
        return {error: error.message, count: 0};
    }

    return {success: true, count: count};
}