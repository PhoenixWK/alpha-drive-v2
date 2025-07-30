import PageLayout from "@/components/PageLayout";
import UserProfileSection from "@/components/user-profile/UserProfileSection";

export default function MyProfilePage() {
    return (
        <PageLayout>
            <main className="mt-28 lg:mx-28">
                <UserProfileSection />
            </main>
        </PageLayout>
    );
}