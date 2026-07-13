import type { Metadata } from "next";
import "./globals.css"

import { ClerkProvider } from "@clerk/nextjs";
import { GoogleTagManager } from "@next/third-parties/google";
import { Toaster } from "@/components/layout/toaster";
import { ThemeProvider } from "@/components/ui/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://charityquery.com"),
  title: {
    default: "Charity Query",
    template: "%s | Charity Query"
  },
  description: "Developer-friendly API for searching, filtering, and exploring IRS nonprofit and charity data.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
        
          <GoogleTagManager
            gtmId={"GTM-NS4NT2SF"}
          />
      </html>
    </ClerkProvider>
  );
}
