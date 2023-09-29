import supabase from "@/lib/supabase";
import { cache } from "react";

import "server-only";

export const revalidate = 3600;

export const getUserId = cache(async ({ username }: { username: string }) => {
  const { data: user, error } = await supabase([`users:${username}:id`])
    .from("users")
    .select("id, username")
    .eq("username", username)
    .maybeSingle();
  if (error) throw error;
  return user ? user.id : null;
});
