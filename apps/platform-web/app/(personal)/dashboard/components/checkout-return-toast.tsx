"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  showInfoToast,
  showSuccessToast,
} from "@/components/layout/toaster";

export function CheckoutReturnToast() {
  const handledRef = useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (handledRef.current) {
      return;
    }

    if (searchParams.get("success") === "true") {
      handledRef.current = true;
      showSuccessToast("Plan upgraded successfully");
      router.refresh();
      router.replace("/dashboard", { scroll: false });
      return;
    }

    if (searchParams.get("canceled") === "true") {
      handledRef.current = true;
      showInfoToast("Checkout canceled");
      router.replace("/dashboard", { scroll: false });
    }
  }, [router, searchParams]);

  return null;
}
