import { PublicFooter } from "@/components/layout/public-footer";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { GeneralWrapper } from "@/components/ui/general-wrapper";

export default function DashboardLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <main className="min-w-0">
            <PublicNavbar />
            <GeneralWrapper>
                {children}
            </GeneralWrapper>
            <PublicFooter />
        </main>
    );
}