import { convertStorageUnits } from "@/bus/UserStorageUsed";

export default function StorageProgress(
    {
        used_storage, 
        max_storage,
        memory_unit
    }: {used_storage: number, max_storage: number, memory_unit: string}
) {
    let progress:number = 0;

    const convertedUsedStorageUnits = convertStorageUnits(used_storage, memory_unit);

    progress = (convertedUsedStorageUnits / max_storage) * 100;

    return (
        <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
            <div className="bg-[#FF9D26] h-full rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
    );
}