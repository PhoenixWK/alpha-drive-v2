import Header from "./Header";
import Sidebar from "./Sidebar";

export default function PageLayoutWithOutHeader({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-[#171725] flex flex-row h-screen">
            <div className="hidden xl:block">
                <Sidebar />
            </div>
        </div>
    )

}
