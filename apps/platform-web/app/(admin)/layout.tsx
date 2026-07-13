import { Header } from "@/components/layout/header";
import { GeneralWrapper } from "@/components/ui/general-wrapper";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AdminSidebar } from "./admin/components/admin-sidebar";

export default function AdminLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <SidebarProvider>
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
            <AdminSidebar />
            <main className="w-full">
            <Header aside={<SidebarTrigger />} />
            <GeneralWrapper>
                {children}
            </GeneralWrapper>
            </main>
            </ThemeProvider>
        </SidebarProvider>
    );
}