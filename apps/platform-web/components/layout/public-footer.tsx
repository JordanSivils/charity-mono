import Link from "next/link";
import { CharityQueryLogo } from "./logo";

export function PublicFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <CharityQueryLogo />
            <p className="mt-2 text-sm text-muted-foreground">
              Developer-friendly access to IRS nonprofit data with filtering,
              field selection, and predictable JSON responses.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-medium">Product</h3>
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
                Docs
              </Link>
              <Link
                href="/docs/api-reference"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                API Reference
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-medium">Resources</h3>
              <Link
                href="/docs"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Getting Started
              </Link>
              <Link
                href="/docs/authentication-limits"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Authentication
              </Link>
              <Link
                href="/docs/metadata"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Metadata
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-medium">Company</h3>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Charity API. All rights reserved.</p>
          <p>Built for developers working with IRS nonprofit data.</p>
        </div>
      </div>
    </footer>
  );
}