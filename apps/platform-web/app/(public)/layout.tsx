import { GeneralWrapper } from "@/components/ui/general-wrapper";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";

export default function PublicLayout({
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