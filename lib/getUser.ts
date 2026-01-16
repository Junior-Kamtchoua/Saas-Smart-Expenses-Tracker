import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabase } from "./supabase";

/* 
   SERVER — for Server Components
   */
export async function getUserServer() {
  const cookieStore = await cookies();

  const supabaseServer = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  const { data, error } = await supabaseServer.auth.getUser();
  if (error) return null;

  return data.user;
}

/* 
   CLIENT — for Browser / useEffect / buttons
   */
export async function getUserClient() {
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;

  return data.user;
}
