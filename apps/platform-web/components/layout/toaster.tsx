"use client";

import type { ReactNode } from "react";
import { toast } from "sonner";

import { Toaster as SonnerToaster } from "@/components/ui/sonner";

type ToastMessage = string | ReactNode;

const getToastOptions = (description?: ToastMessage) => ({
  description,
});

export function Toaster() {
  return <SonnerToaster richColors closeButton position="top-right" />;
}

export function showSuccessToast(
  message: ToastMessage,
  description?: ToastMessage
) {
  return toast.success(message, getToastOptions(description));
}

export function showWarningToast(
  message: ToastMessage,
  description?: ToastMessage
) {
  return toast.warning(message, getToastOptions(description));
}

export function showErrorToast(
  message: ToastMessage,
  description?: ToastMessage
) {
  return toast.error(message, getToastOptions(description));
}

export const showFailedToast = showErrorToast;

export function showInfoToast(
  message: ToastMessage,
  description?: ToastMessage
) {
  return toast.info(message, getToastOptions(description));
}
