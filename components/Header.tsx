"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // 2. Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // 3. Cleanup listener
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="w-full border-b p-4 flex justify-between items-center">
      {user ? (
        <LogoutButton />
      ) : (
        <div className="space-x-3 text-sm">
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </div>
      )}
    </header>
  );
}
