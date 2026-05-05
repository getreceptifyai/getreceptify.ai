import { supabaseAdmin } from "@/lib/supabase/admin";

export async function getReceptionistByUserId(userId: string) {
  const { data } = await supabaseAdmin
    .from("receptionists")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  return data;
}
