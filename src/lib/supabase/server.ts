// src/lib/supabase/server.ts

import { createServerClient } from "@supabase/ssr";
import { cookies as nextCookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseServer = async () => {
  const cookieStore = await Promise.resolve(nextCookies());

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),

        setAll: (newCookies) => {
          newCookies.forEach((cookie) => {
            try {
              cookieStore.set(cookie);
            } catch {
              // Safe fallback (SSR context)
            }
          });
        },
      },
    },
  );
};
