// import supabase from "@/lib/supabase";
// import { cache } from "react";

// import "server-only";

// export const revalidate = 3600;

// export const getUsername = cache(async ({ userId }: { userId: string }) => {
//   const { data: user, error } = await supabase([`users:${userId}:username`])
//     .from("users")
//     .select("id, username")
//     .eq("id", userId)
//     .single();
//   //   if (error) throw error;
//   return user ? user.username : null;
// });
