"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { SignedIn, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { CharityQueryLogo } from "./logo"

export function MainSidebar(){
    
    return (
       <Sidebar>
      <SidebarHeader />
        <Link href={"/"}>
          <CharityQueryLogo />
        </Link>
      <SidebarContent>
        <SignedIn><UserButton /></SignedIn>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
    )
}