import { createClient } from "@supabase/supabase-js";
import { getEnv } from "@/lib/env";

const env = getEnv();

export const supabaseAdmin = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);
