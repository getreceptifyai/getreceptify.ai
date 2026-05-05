import { Card } from "@/components/ui/Card";

export function StatsCards({
  conversations,
  leads,
  remaining,
}: {
  conversations: number;
  leads: number;
  remaining: number | null;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <p className="text-sm text-slate-500">Conversations (month)</p>
        <p className="mt-2 text-3xl font-semibold">{conversations}</p>
      </Card>
      <Card>
        <p className="text-sm text-slate-500">Leads captured</p>
        <p className="mt-2 text-3xl font-semibold">{leads}</p>
      </Card>
      <Card>
        <p className="text-sm text-slate-500">Free-tier remaining</p>
        <p className="mt-2 text-3xl font-semibold">{remaining === null ? "Unlimited" : remaining}</p>
      </Card>
    </div>
  );
}
