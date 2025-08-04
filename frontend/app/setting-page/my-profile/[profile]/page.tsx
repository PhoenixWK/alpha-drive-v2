import PageLayout from "@/components/PageLayout";
import UsageStatisticSection from "@/components/usage-statistic/UsageStatisticSection";
import UserProfileSection from "@/components/user-profile/UserProfileSection";

export default function MyProfilePage() {
    return (
        <PageLayout>
            <main className="mt-28 lg:mx-28 space-y-8">
                <UserProfileSection />
                <UsageStatisticSection />
            </main>
        </PageLayout>
    );
}