import { createClient } from "@/lib/supabase/withoutAuth";

export const getRevalidateTags = (username: string) => [`profile:${username}`];

type GetProfile = {
  username: string;
};

export const BADGE_CATEGORY = {
  COLLEGE_SKILL: 3,
  INTEREST: 1,
  LIFESTAGE: 2,
  SPOKEN_LANGUAGE: 4,
};

export const selectStatement = `
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
        )
    `;

export const getProfile = async ({ username }: GetProfile) => {
  const supabase = createClient(getRevalidateTags(username));
  return await supabase
    .from("users")
    .select(selectStatement)
    .eq("username", username)
    .single();
};
