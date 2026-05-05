import Link from "next/link";
import { Card } from "@/components/ui/Card";

type Conversation = {
  id: string;
  started_at: string;
  messages: { count: number }[];
};

export function ConversationList({ conversations }: { conversations: Conversation[] }) {
  return (
    <Card>
      <div className="space-y-2">
        {conversations.map((conversation) => (
          <Link
            key={conversation.id}
            href={`/conversations/${conversation.id}`}
            className="block rounded-lg border border-slate-200 p-3 hover:bg-slate-50"
          >
            <p className="text-sm font-medium">{new Date(conversation.started_at).toLocaleString()}</p>
            <p className="text-xs text-slate-500">
              {conversation.messages?.[0]?.count ?? 0} messages
            </p>
          </Link>
        ))}
      </div>
    </Card>
  );
}
