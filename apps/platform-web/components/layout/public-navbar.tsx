"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { CharityQueryLogo } from "./logo";
import { Toggle } from "radix-ui";
import ToggleTheme from "../ui/theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs/api-reference", label: "API Reference" },
];

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          <div className="flex items-center gap-3">
            <CharityQueryLogo className="h-9 w-auto" />
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
            <SignedIn>
                <Button asChild>
                    <Link href="/dashboard">Dashboard</Link>
                </Button>
            </SignedIn>
            <SignedOut>
                <Button asChild>
                    <Link href="/sign-in">Sign In</Link>
                </Button>
            </SignedOut>
            <ToggleTheme />
        </div>
        

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open navigation menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-85 sm:w-90">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" className="text-left">
              Charity API
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col gap-6 p-3">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 border-t pt-6">
            <SignedIn>
                <Button asChild className="mx-4">
                    <Link href="/dashboard">Dashboard</Link>
                </Button>
            </SignedIn>
            <SignedOut>
                <Button asChild className="mx-4">
                    <Link href="/sign-in">Sign In</Link>
                </Button>
            </SignedOut>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}