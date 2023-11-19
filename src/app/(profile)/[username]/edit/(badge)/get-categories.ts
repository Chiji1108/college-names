import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export type CategoriesWithBadges = Awaited<
  ReturnType<typeof getCategoriesWithBadges>
>;

export const getCategoriesWithBadges = async ({
  cookieStore,
}: {
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore, ["badgeCategories"]);
  const { data: categories, error } = await supabase.from("badge_categories")
    .select(`
        *,
        badges (
          *,
          badge_categories (*)
        )
    `);
  if (error) {
    throw error;
  }
  return categories;
};
