import { Card } from "@/components/ui/Card";

type Lead = {
  id: string;
  name: string;
  email: string;
  preferred_time: string;
  created_at: string;
};

export function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <Card className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Preferred time</th>
            <th className="py-2">Captured</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-slate-100">
              <td className="py-2">{lead.name}</td>
              <td className="py-2">{lead.email}</td>
              <td className="py-2">{lead.preferred_time}</td>
              <td className="py-2">{new Date(lead.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
