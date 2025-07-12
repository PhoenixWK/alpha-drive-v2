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