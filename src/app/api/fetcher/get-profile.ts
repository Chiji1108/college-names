import supabase from "@/lib/supabase";
import { cache } from "react";

import "server-only";

export const revalidate = 3600;

export const getProfile = cache(async ({ username }: { username: string }) => {
  const { data: user, error } = await supabase([`users:${username}:profile`])
    .from("users")
    .select(
      `
        *,
        badges (
        *,
        badge_categories (*)
        ),
        residential_histories (*),
        groups (
        *,
        group_categories (*),
        users (*)
        ),
        members (
        *
        ),
        mbti (*),
        drinkings (*),
        smokings (*),
        politics (*),
        religions (*),
        educations (
        *,
        schools (
            *,
            users (*)
        )
        ),
        experiences (
        *,
        companies (
            *,
            users (*)
        )
        ),
        answers (
        *,
        questions (*)
        ),
        photos (*)
        `
    )
    .eq("username", username)
    .single();
  // if (error) throw error;
  return user;
});
