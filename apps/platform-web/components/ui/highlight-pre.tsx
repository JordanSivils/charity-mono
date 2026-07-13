"use client";

import { Check, ClipboardCopy } from "lucide-react";
import { ReactNode, useState } from "react";
import { Button } from "./button";
import { Label } from "@/components/ui/label";

interface HighlightPreProps {
  children: ReactNode;
  copy?: boolean;
  label?: string;
}

export function HighlightPre({
  children,
  copy = false,
  label,
}: HighlightPreProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof children !== "string") return;

    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`flex w-full gap-2 ${label ? "flex-col" : "items-center"}`}>
  {label && <Label className="font-bold">{label}</Label>}

  <div className="flex w-full items-start gap-2 min-w-0">
    <pre className="flex-1 min-w-0 w-full p-2 overflow-x-auto rounded-md bg-muted text-sm">
      <code>{children}</code>
    </pre>

    {copy && (
      <Button
        onClick={handleCopy}
        variant="ghost"
        className="text-xs bg-background border rounded-md hover:bg-muted shrink-0 cursor-pointer h-7 px-2"
      >
        {copied ? <Check /> : <ClipboardCopy />}
      </Button>
    )}
  </div>
</div>
  );
}