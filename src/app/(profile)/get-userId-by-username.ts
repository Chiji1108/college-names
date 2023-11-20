import { createClient } from "@/lib/supabase/withoutAuth";
import { cookies } from "next/headers";

export const getRevalidateTags = (username: string) => [`userId:${username}`];

type GetUserId = {
  username: string;
};

export const getUserId = async ({ username }: GetUserId) => {
  const supabase = createClient(getRevalidateTags(username));
  return await supabase
    .from("users")
    .select("id, username")
    .eq("username", username)
    .single();
};
