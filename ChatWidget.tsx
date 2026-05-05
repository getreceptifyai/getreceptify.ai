"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChatWidget({ receptionistId }: { receptionistId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [visitorSessionId] = useState(() => crypto.randomUUID());

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        receptionistId,
        conversationId,
        visitorSessionId,
        message: userMessage,
      }),
    });

    if (!res.ok) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I ran into an error. Please try again." },
      ]);
      setLoading(false);
      return;
    }

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let assistant = "";
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.startsWith("data: "));
        for (const line of lines) {
          const payload = JSON.parse(line.replace("data: ", ""));
          if (payload.type === "conversation") {
            setConversationId(payload.conversationId);
          }
          if (payload.type === "text") {
            assistant += payload.delta;
            setMessages((prev) => {
              const next = [...prev];
              next[next.length - 1] = { role: "assistant", content: assistant };
              return next;
            });
          }
        }
      }
    }

    setLoading(false);
  }

  return (
    <div className="flex h-[560px] w-full max-w-md flex-col rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <p className="text-sm font-semibold text-slate-900">AI Receptionist</p>
        <p className="text-xs text-slate-500">Ask about services or book an appointment</p>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={message.role === "user" ? "text-right" : "text-left"}
          >
            <span
              className={`inline-block max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                message.role === "user"
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-800"
              }`}
            >
              {message.content || (loading ? "..." : "")}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit} className="flex gap-2 border-t border-slate-200 p-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
