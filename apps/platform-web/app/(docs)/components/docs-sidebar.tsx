import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Image from "next/image";
import { docsSidebarItems } from "./sidebar-items";
import Link from "next/link";
import { CharityQueryLogo } from "@/components/layout/logo";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function DocsSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href={"/"}>
          <CharityQueryLogo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Good to Know</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {docsSidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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