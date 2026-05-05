import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function LandingHero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 text-center">
      <p className="mb-4 text-sm font-medium uppercase tracking-wider text-brand-600">
        AI Receptionist Micro-SaaS
      </p>
      <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        24/7 AI receptionist for your business
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
        Capture leads, answer FAQs, and book appointments with an embeddable AI chat
        widget tailored to your business.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/login">
          <Button>Get Started</Button>
        </Link>
        <Link href="#pricing">
          <Button variant="outline">See Pricing</Button>
        </Link>
      </div>
    </section>
  );
}
