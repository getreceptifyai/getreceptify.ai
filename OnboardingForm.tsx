"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type Existing = {
  business_name?: string;
  business_type?: string;
  services?: string[];
  greeting?: string;
  faqs?: Array<{ q: string; a: string }>;
};

export function OnboardingForm({ existing }: { existing?: Existing }) {
  const [businessName, setBusinessName] = useState(existing?.business_name ?? "");
  const [businessType, setBusinessType] = useState(existing?.business_type ?? "");
  const [hours, setHours] = useState(
    '{"monday":{"open":"09:00","close":"17:00","closed":false},"tuesday":{"open":"09:00","close":"17:00","closed":false}}',
  );
  const [services, setServices] = useState((existing?.services ?? []).join(", "));
  const [greeting, setGreeting] = useState(existing?.greeting ?? "");
  const [faqs, setFaqs] = useState(
    existing?.faqs?.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n") ?? "",
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    setSaved(false);
    try {
      const faqRows = faqs
        .split("\n\n")
        .map((row) => row.trim())
        .filter(Boolean)
        .map((row) => {
          const [qLine, aLine] = row.split("\n");
          return {
            q: qLine?.replace(/^Q:\s*/i, "") ?? "",
            a: aLine?.replace(/^A:\s*/i, "") ?? "",
          };
        });

      const res = await fetch("/api/receptionist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          businessType,
          hours: JSON.parse(hours),
          services: services.split(",").map((s) => s.trim()).filter(Boolean),
          greeting,
          faqs: faqRows,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to save");
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setMessage("Could not save settings. Check your input and try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Business name</label>
        <Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Business type</label>
        <Input value={businessType} onChange={(e) => setBusinessType(e.target.value)} required />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Hours (JSON)</label>
        <Textarea value={hours} onChange={(e) => setHours(e.target.value)} rows={4} required />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Services (comma-separated)</label>
        <Input value={services} onChange={(e) => setServices(e.target.value)} required />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Custom greeting</label>
        <Textarea value={greeting} onChange={(e) => setGreeting(e.target.value)} rows={3} required />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">FAQs (Q/A blocks)</label>
        <Textarea value={faqs} onChange={(e) => setFaqs(e.target.value)} rows={6} />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save receptionist"}
        </Button>
        {saved ? <p className="text-sm text-green-600">Settings saved!</p> : null}
        {message ? <p className="text-sm text-slate-600">{message}</p> : null}
      </div>
    </form>
  );
}
