import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function PricingCards() {
  return (
    <section id="pricing" className="mx-auto grid max-w-4xl gap-6 px-4 py-16 md:grid-cols-2">
      <Card>
        <h3 className="text-xl font-semibold">Free</h3>
        <p className="mt-2 text-3xl font-bold">$0</p>
        <ul className="mt-4 space-y-2 text-sm text-slate-600">
          <li>50 conversations/month</li>
          <li>AI receptionist onboarding</li>
          <li>Conversation history</li>
        </ul>
      </Card>
      <Card className="border-brand-200">
        <Badge>Most Popular</Badge>
        <h3 className="mt-2 text-xl font-semibold">Pro</h3>
        <p className="mt-2 text-3xl font-bold">$29/mo</p>
        <ul className="mt-4 space-y-2 text-sm text-slate-600">
          <li>Unlimited conversations</li>
          <li>Lead export as CSV</li>
          <li>Priority support</li>
        </ul>
      </Card>
    </section>
  );
}
