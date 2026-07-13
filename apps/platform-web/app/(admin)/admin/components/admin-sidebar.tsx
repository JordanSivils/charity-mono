import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { CharityQueryLogo } from "@/components/layout/logo";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href={"/"}>
          <CharityQueryLogo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
        <SidebarGroupContent>
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button>
                Dashboard
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href={"/sign-up"}>
              <Button>
                Sign In
              </Button>
            </Link>
          </SignedOut>
        </SidebarGroupContent>
      </SidebarGroup>
      </SidebarContent>
      
        
    </Sidebar>
  );
}