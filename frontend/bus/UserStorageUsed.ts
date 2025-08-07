export function convertStorageUnits(
    used_storage: number, 
    memory_unit: string
) : number {
    let convertedUsed = used_storage;

    switch (memory_unit) {
        case 'GB':
            convertedUsed = used_storage / (1024 * 1024);
            break;
        case 'TB':
            convertedUsed = used_storage / (1024 * 1024 * 1024);
            break;
        default:
            break;
    }

    return parseFloat(convertedUsed.toFixed(2));
}