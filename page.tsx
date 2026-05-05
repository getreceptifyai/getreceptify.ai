import { LandingHero } from "@/components/LandingHero";
import { PricingCards } from "@/components/PricingCards";
import { DemoWidget } from "@/components/DemoWidget";

export default function Home() {
  return (
    <main className="pb-20">
      <LandingHero />
      <section className="mx-auto max-w-6xl px-4">
        <h2 className="mb-4 text-center text-2xl font-semibold text-slate-900">Live demo widget</h2>
        <div className="flex justify-center">
          <DemoWidget />
        </div>
      </section>
      <PricingCards />
      <footer className="mx-auto mt-12 max-w-6xl px-4 text-center text-sm text-slate-500">
        Built for Vercel, Next.js, Supabase, Claude, Stripe, and NextAuth.
      </footer>
    </main>
  );
}
