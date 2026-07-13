"use client";

interface JsonDisplayProps {
  data: unknown;
}

export function JsonDisplay({ data }: JsonDisplayProps) {
  return (
    <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
}