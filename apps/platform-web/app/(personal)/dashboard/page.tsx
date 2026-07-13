import { Metadata } from "next";
import { DashboardFetch } from "./fetch-dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your Charity Query API usage, keys, and account settings.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";
export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-4">
            <DashboardFetch />
        </div>
        
    )
}