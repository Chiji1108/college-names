import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const getRevalidateTags = () => [`userIds`];

type GetUserIds = {
  cookieStore: ReturnType<typeof cookies>;
};

export const getUserIds = async ({ cookieStore }: GetUserIds) => {
  const supabase = createClient(cookieStore, getRevalidateTags());
  return await supabase.from("users").select("id");
};
