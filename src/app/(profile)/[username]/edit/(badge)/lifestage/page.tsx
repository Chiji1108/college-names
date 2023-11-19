import {
  BADGE_CATEGORY,
  getProfile,
} from "@/app/(profile)/get-profile-by-username";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getCategoriesWithBadges } from "../get-categories";
import BadgeForm from "../badge-form";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const cookieStore = cookies();
  const { data: user } = await getProfile({ username, cookieStore });
  if (!user) notFound();

  const categoriesWithBadges = await getCategoriesWithBadges({ cookieStore });

  const lifestagesCategories = categoriesWithBadges.filter(
    (category) => category.parent_id === BADGE_CATEGORY.LIFESTAGE
  );

  const lifestages = user.badges.filter(
    (badge) => badge.badge_categories?.parent_id == BADGE_CATEGORY.LIFESTAGE
  );

  return (
    <BadgeForm
      initialBadgeIds={lifestages.map((lifestage) => lifestage.id)}
      categories={lifestagesCategories}
      username={user.username}
    />
  );
}
