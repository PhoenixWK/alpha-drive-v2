import PageLayout from "@/components/PageLayout";
import UserProfileForm from "@/components/user-profile/UserProfileForm";
import UserProfileIcon from "@/components/user-profile/UserProfileIcon";

export default function MyProfilePage() {
    return (
        <PageLayout>
            <main className="mt-28">
                <h1 className="mb-6 text-left text-4xl font-bold dark:text-white">
                        My Profile
                    </h1>
                <div className="flex flex-col md:flex-row md:items-start justify-center md:justify-start gap-4">
                    
                    <UserProfileIcon />           
                </div>
                <div className="mt-8">
                    <h2 className="mb-4 text-2xl font-semibold text-left dark:text-white">
                        Edit profile
                    </h2>
                    <UserProfileForm />
                </div>
            </main>
        </PageLayout>
    );
}