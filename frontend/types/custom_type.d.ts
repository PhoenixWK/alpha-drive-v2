type FileObject = {
    id: string;
    name: string;
    bucket_id: string;
    owner: string | null;
    created_at: string;
    updated_at: string;
    last_accessed_at: string | null;
    metadata: Record<string, any> | null;
};

type UserProfile = {
    user_id: string;
    email: string;
    username: string;
    role: 'user';
    created_at: string;
    updated_at: string;
    profile_image_url?: string;
    owned_plan: string;
}