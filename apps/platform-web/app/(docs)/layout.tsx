import { Header } from "@/components/layout/header";
import { MainSidebar } from "@/components/layout/main-sidebar";
import { GeneralWrapper } from "@/components/ui/general-wrapper";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { DocsSidebar } from "./components/docs-sidebar";
import { PublicFooter } from "@/components/layout/public-footer";

export default function DocsLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <SidebarProvider>
            {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            > */}
            <DocsSidebar />
            <main className="min-w-0">
            <Header aside={<SidebarTrigger />} />
            <GeneralWrapper>
                    {children}
            </GeneralWrapper>
            <PublicFooter />
            </main>
            {/* </ThemeProvider> */}
        </SidebarProvider>
    );
}