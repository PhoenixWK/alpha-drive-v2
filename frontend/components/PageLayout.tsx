import Header from "./Header";
import Sidebar from "./Sidebar";

export default function PageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-[#171725] flex flex-row h-screen">
            <div className="hidden xl:block">
                <Sidebar />
            </div>
            <div className="w-full flex flex-col h-screen">
                <div className="fixed top-0 left-0 w-screen h-fit shadow-lg xl:shadow-none px-2 md:px-4 xl:px-6 xl:pl-[280px] py-4 xl:py-6">
                    <Header />
                </div>       
                <main className="flex flex-col h-screen px-6">     
                    {children}
                </main>
            </div>
        </div>
    )

}
