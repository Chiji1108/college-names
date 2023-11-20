import { createClient } from "@/lib/supabase/withoutAuth";
import { cookies } from "next/headers";

export const getRevalidateTags = (userId: string) => [`username:${userId}`];

type GetUsername = {
  userId: string;
};

export const getUsername = async ({ userId }: GetUsername) => {
  const supabase = createClient(getRevalidateTags(userId));
  return await supabase
    .from("users")
    .select("id, username")
    .eq("id", userId)
    .single();
};
