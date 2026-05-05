import type { ReceptionistConfig } from "@/lib/types";

function formatHours(hours: ReceptionistConfig["hours"]) {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  return days
    .map((day) => {
      const value = hours[day];
      if (!value || value.closed) {
        return `${day}: closed`;
      }
      return `${day}: ${value.open} - ${value.close}`;
    })
    .join("; ");
}

export function buildSystemPrompt(r: ReceptionistConfig) {
  const faqs = r.faqs?.length
    ? r.faqs.map((faq) => `Q: ${faq.q}\nA: ${faq.a}`).join("\n\n")
    : "No FAQs provided.";

  return `You are ${r.business_name}'s friendly receptionist.
You help visitors with questions about ${r.services.join(", ")}.
Business hours are ${formatHours(r.hours)}.
If someone wants to book an appointment, collect their name,
email, and preferred date/time, then confirm it warmly.
Never make up information. If unsure, say you'll have
the team follow up. Keep responses short and friendly.

Greeting: "${r.greeting}"

FAQs:
${faqs}`;
}
