import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { BADGE_CATEGORY, getProfile } from "../../get-profile-by-username";
import { container } from "@/styles/layouts";
import { BackButton } from "./back-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AvatarForm } from "./avatar-form/avatar-form";
import NameForm from "./name-form";
import Section from "../section";
import { Card } from "@/components/ui/card";
import { Chip, ChipGroup } from "@/components/chip";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BioForm from "./bio-form";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: user } = await getProfile({ username, cookieStore });
  if (!user) notFound();

  const college_skills = user.badges.filter(
    (badge) => badge.badge_categories?.parent_id == BADGE_CATEGORY.COLLEGE_SKILL
  );

  const interests = user.badges.filter(
    (badge) => badge.badge_categories?.parent_id == BADGE_CATEGORY.INTEREST
  );

  const lifestages = user.badges.filter(
    (badge) => badge.badge_categories?.parent_id == BADGE_CATEGORY.LIFESTAGE
  );
  return (
    <div className="relative">
      <header className="grid place-items-center h-16 sticky top-0 bg-background/50 backdrop-blur z-10">
        <h1 className="font-bold">プロフィールを編集</h1>
        <div className="inset-y-0 right-0 mx-2 absolute grid place-items-center">
          <BackButton>完了</BackButton>
        </div>
      </header>

      <div className="mb-6" />
      <AvatarForm userId={user.id} avatarUrl={user.avatar_url} />
      <NameForm userId={user.id} initialName={user.name} />
      {/* <Section icon="📷" title="写真">
            自分を説明する写真を選ぼう
          </Section> */}
      <div className="flex flex-col gap-12 mt-8">
        <Section icon="📝" title="Hashtag">
          <p className="-mt-2 text-sm mb-6">
            自分を説明するハッシュタグを自由に書こう
          </p>
          <BioForm initialBioTags={user.bio_tags || []} username={username} />
        </Section>
        <Section icon="🏄" title="Interests">
          <p className="-mt-2 text-sm">
            大好きな趣味や興味のあることを共有しよう
          </p>
          <Link href={`/${username}/edit/interests`}>
            <Card className="mt-4 p-2 cursor-pointer">
              <ChipGroup>
                {interests.map((badge) => (
                  <Chip key={badge.id} icon={badge.emoji}>
                    {badge.name}
                  </Chip>
                ))}
              </ChipGroup>
            </Card>
          </Link>
        </Section>
        <Section icon="👟" title="Lifestage">
          <p className="-mt-2 text-sm">知ってもらいたい自分を共有しよう</p>
          <Link href={`/${username}/edit/lifestage`}>
            <Card className="mt-4 p-2 cursor-pointer">
              <ChipGroup>
                {lifestages.map((badge) => (
                  <Chip key={badge.id} icon={badge.emoji}>
                    {badge.name}
                  </Chip>
                ))}
              </ChipGroup>
            </Card>
          </Link>
        </Section>
        <Section icon="🍳" title="Skills">
          <p className="-mt-2 text-sm">得意なことを共有しよう</p>
          <Link href={`/${username}/edit/skills`}>
            <Card className="mt-4 p-2 cursor-pointer">
              <ChipGroup>
                {college_skills.map((badge) => (
                  <Chip key={badge.id} icon={badge.emoji}>
                    {badge.name}
                  </Chip>
                ))}
              </ChipGroup>
            </Card>
          </Link>
        </Section>
      </div>
    </div>
  );
}
