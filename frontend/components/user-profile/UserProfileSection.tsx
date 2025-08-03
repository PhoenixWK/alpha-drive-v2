import UserProfileIcon from "./UserProfileIcon";

export default function UserProfileSection() {
    return (
        <section className="bg-[#FCFBFF] dark:bg-[#1F1F36] border-3 border-[#c4b9fd] rounded-md p-4 flex flex-col gap-4">
             <UserProfileIcon />
            <button className="bg-[#E9E5FD] w-fit px-6 py-2 rounded-sm font-semibold">
                Change
            </button>
        </section>
    )
}