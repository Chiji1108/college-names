import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const getRevalidateTags = (username: string) => [`userId:${username}`];

type GetUserId = {
  username: string;
  cookieStore: ReturnType<typeof cookies>;
};

export const getUserId = async ({ username, cookieStore }: GetUserId) => {
  const supabase = createClient(cookieStore, getRevalidateTags(username));
  return await supabase
    .from("users")
    .select("id, username")
    .eq("username", username)
    .single();
};
