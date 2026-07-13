import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
]);

const isAdminRoute = createRouteMatcher([
  "/admin/:path*",
]);

const isWebhookRoute = createRouteMatcher([
  "/api/webhooks/clerk",
  "/api/webhooks/stripe",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isWebhookRoute(req)) {
    return NextResponse.next();
  }

  if (isProtectedRoute(req)) {
    await auth.protect({
      unauthenticatedUrl: new URL("/sign-in", req.url).toString(),
      unauthorizedUrl: new URL("/sign-in", req.url).toString(),
    });
  }

  if (isAdminRoute(req)) {
    const { sessionClaims } = await auth.protect({
      unauthenticatedUrl: new URL("/sign-in", req.url).toString(),
    });

    const roles = (sessionClaims?.role ?? []) as string[];

    if (!roles.includes("admin")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};