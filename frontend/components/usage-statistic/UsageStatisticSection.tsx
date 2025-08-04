import { MdDataUsage } from "react-icons/md";
import StorageStatistic from "./StorageStatistic";
import FilesStatistic from "./FilesStatistic";


export default function UsageStatisticSection() {
    return (
        <section className="bg-[#FCFBFF] dark:bg-[#1F1F36] border-3 border-[#FF9D26] rounded-md p-4 flex flex-col gap-4">
            <div className="flex items-center justify-start gap-2">
                <MdDataUsage
                    size={48}
                    className="text-[#6A4BFF]"
                />
                <h2 className="text-xl dark:text-white font-bold">
                    Usage statistic
                </h2>
            </div>
            <StorageStatistic />
            <div className="flex items-center justify-start gap-2">
                <FilesStatistic />
            </div>
        </section>
    )
}