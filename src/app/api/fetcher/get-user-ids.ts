// import supabase from "@/lib/supabase";
// import { cache } from "react";

// import "server-only";

// export const revalidate = 3600;

// export const getUserIds = cache(async () => {
//   const { data: users, error } = await supabase([`users`])
//     .from("users")
//     .select("id");
//   if (error) throw error;
//   return users.map(({ id }) => id);
// });
