"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function LogoutButton({ disabled }: { disabled?: boolean }) {
  const supabase = createClient();

  const router = useRouter();

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }
    router.refresh();
  }, [supabase]);

  return (
    <Button onClick={signOut} disabled={disabled} variant={"secondary"}>
      ログアウト
    </Button>
  );
}
