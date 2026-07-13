import { Suspense } from "react";
import { AdminFetch } from "./fetch-admin";
import { Metadata } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Portal",
  description: "Internal administration tools for managing Charity Query data and operations.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <AdminFetch />
        </Suspense>
    )
}