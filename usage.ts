import { supabaseAdmin } from "@/lib/supabase/admin";

export async function incrementConversationUsage(
  receptionistId: string,
  isPro: boolean,
) {
  const month = new Date();
  month.setUTCDate(1);
  month.setUTCHours(0, 0, 0, 0);
  const monthKey = month.toISOString().slice(0, 10);

  const { data: existing } = await supabaseAdmin
    .from("usage_counters")
    .select("conversations")
    .eq("receptionist_id", receptionistId)
    .eq("month", monthKey)
    .maybeSingle();

  const count = existing?.conversations ?? 0;
  if (!isPro && count >= 50) {
    return { allowed: false, remaining: 0 };
  }

  const nextCount = count + 1;
  const { error } = await supabaseAdmin.from("usage_counters").upsert(
    {
      receptionist_id: receptionistId,
      month: monthKey,
      conversations: nextCount,
    },
    { onConflict: "receptionist_id,month" },
  );

  if (error) {
    throw new Error(error.message);
  }

  return {
    allowed: true,
    remaining: isPro ? null : Math.max(0, 50 - nextCount),
  };
}
