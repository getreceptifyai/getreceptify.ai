"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function BillingActions({ plan }: { plan: "free" | "pro" }) {
  const [loading, setLoading] = useState<"checkout" | "portal" | null>(null);

  async function go(endpoint: string, state: "checkout" | "portal") {
    setLoading(state);
    const res = await fetch(endpoint, { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
    setLoading(null);
  }

  return (
    <div className="flex gap-3">
      {plan === "free" ? (
        <Button onClick={() => go("/api/stripe/checkout", "checkout")} disabled={loading !== null}>
          {loading === "checkout" ? "Redirecting..." : "Upgrade to Pro"}
        </Button>
      ) : (
        <Button onClick={() => go("/api/stripe/portal", "portal")} disabled={loading !== null}>
          {loading === "portal" ? "Opening..." : "Manage subscription"}
        </Button>
      )}
    </div>
  );
}
