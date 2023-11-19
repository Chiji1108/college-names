import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const getRevalidateTags = (userId: string) => [`username:${userId}`];

type GetUsername = {
  userId: string;
  cookieStore: ReturnType<typeof cookies>;
};

export const getUsername = async ({ userId, cookieStore }: GetUsername) => {
  const supabase = createClient(cookieStore, getRevalidateTags(userId));

  return await supabase
    .from("users")
    .select("id, username")
    .eq("id", userId)
    .single();
};
