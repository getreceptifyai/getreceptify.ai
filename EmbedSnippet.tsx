"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function EmbedSnippet({ receptionistId }: { receptionistId: string }) {
  const [copied, setCopied] = useState(false);
  const snippet = `<script src="${process.env.NEXT_PUBLIC_APP_URL}/embed/${receptionistId}" defer></script>`;

  return (
    <div className="space-y-3">
      <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs text-slate-100">
        {snippet}
      </pre>
      <Button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(snippet);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? "Copied!" : "Copy snippet"}
      </Button>
    </div>
  );
}
