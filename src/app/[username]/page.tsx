import { Chip, ChipGroup } from "@/components/chip";
import { cn } from "@/lib/utils";

import {
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Slack,
  Twitter,
} from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ja } from "date-fns/locale";
import {
  format,
  formatDuration,
  intervalToDuration,
  parseISO,
  formatDistanceToNow,
} from "date-fns";
import { Badge } from "@/components/ui/badge";
import { AvatarGroup } from "@/components/avatar-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ComponentProps, Fragment, forwardRef } from "react";
import { Separator } from "@/components/ui/separator";
import { History, HistoryGroup } from "@/components/history";
import { Bubble, Message } from "@/components/message";
import { Button } from "@/components/ui/button";
import { supabaseAdmin } from "@/lib/supabase";
import { BADGE_CATEGORY } from "./const";
import { container } from "@/styles/layouts";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { data: users } = await supabaseAdmin.from("users").select("username");
  return users?.map(({ username }) => ({ username }));
}

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { data: user, error } = await supabaseAdmin
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
    )
    `
    )
    .eq("username", params.username)
    .maybeSingle();
  // const profile = await getProfile(params.username);
  // console.log(parseISO(user?.residential_histories), error);

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

  const isAlumni = user.residential_histories.some(
    (residential_history) =>
      residential_history.move_out_date &&
      parseISO(residential_history.move_out_date) < new Date()
  );

  return (
    <div>
      <div className={container}>
        <header className="h-[128px] sm:rounded-b-xl sm:overflow-hidden sm:mx-6">
          <Image
            src="https://picsum.photos/1600/900"
            alt="header"
            width={1600}
            height={900}
            className="object-cover h-[128px] w-full"
          />
        </header>
        <article className="flex flex-col gap-24 snap-y">
          <section className="mx-6 -mt-[64px] flex flex-col items-center gap-2">
            <div className="w-[128px] h-[128px] rounded-full overflow-hidden border-background border-4">
              {user.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt="avatar"
                  className="object-cover"
                  width={300}
                  height={300}
                />
              ) : (
                <Image
                  src="https://i.pravatar.cc/300"
                  alt="dummy"
                  className="object-cover"
                  width={300}
                  height={300}
                />
              )}
            </div>
            <h1 className="font-bold text-2xl">
              {user.nick_name || user.name}
            </h1>
            <div className="mx-4 flex items-center gap-2 flex-wrap">
              {user.groups
                .filter((group) => group.group_categories?.is_noteworthy)
                .map((group) => (
                  <Badge key={group.id} variant={"secondary"}>
                    {group.name}
                  </Badge>
                ))}
              {isAlumni && <Badge variant={"secondary"}>アラムナイ</Badge>}
            </div>
            {user.bio_tags && (
              <div className="text-center max-w-sm mt-2 flex gap-1 flex-wrap-reverse flex-row-reverse justify-center text-sky-500">
                {user.bio_tags.reverse().map((tag, i) => (
                  <p key={i}>#{tag}</p>
                ))}
              </div>
            )}
          </section>
          <Section icon="👋" title="Profile">
            <ChipGroup>
              <Chip icon="🪪" clickable={false}>
                {user.name}
              </Chip>
              {user.residential_histories.map((residential_history) => (
                <Chip key={residential_history.id} icon="👣" clickable={false}>
                  {residential_history.move_in_date &&
                    format(parseISO(residential_history.move_in_date), "y.M")}
                  {" ~ "}
                  {residential_history.move_out_date &&
                    format(parseISO(residential_history.move_out_date), "y.M")}
                </Chip>
              ))}
              {user.post_number && (
                <Chip icon="📮" clickable={false}>
                  {user.post_number}
                </Chip>
              )}
              {user.room_number && (
                <Chip icon="🛏️" clickable={false}>
                  {user.room_number}
                </Chip>
              )}
              {user.date_of_birth && (
                <Chip icon="🎂" clickable={false}>
                  {format(parseISO(user.date_of_birth), "MMM d, y")}
                </Chip>
              )}
              {user.badges
                .filter(
                  (badge) => badge.category_id == BADGE_CATEGORY.SPOKEN_LANGUAGE
                )
                .map((badge) => (
                  <Chip key={badge.id} icon={badge.emoji}>
                    {badge.name}
                  </Chip>
                ))}
              {user.mbti && <Chip icon="🧩">{user.mbti.name}</Chip>}
              {user.drinkings && <Chip icon="🍺">{user.drinkings.name}</Chip>}
              {user.smokings && <Chip icon="🚬">{user.smokings.name}</Chip>}
              {user.politics && <Chip icon="🗳️">{user.politics.name}</Chip>}
              {user.religions && <Chip icon="🙏">{user.religions.name}</Chip>}
            </ChipGroup>
          </Section>
          <Section icon="👥" title="Group">
            {user.groups.length > 0 ? (
              <div className="flex flex-col gap-2">
                {user.groups.map((group, i) => (
                  <Fragment key={group.id}>
                    {i > 0 && (
                      <div className="flex gap-4">
                        <div className="shrink-0 w-24" />
                        <Separator className="shrink" />
                      </div>
                    )}
                    <div className="flex gap-4 cursor-pointer rounded-lg overflow-hidden hover:ring hover:ring-border hover:ring-offset-2 transition hover:-translate-y-1 ease-in-out">
                      <div className="shrink-0 w-24 h-24 aspect-square rounded-lg overflow-hidden">
                        {group.image_url ? (
                          <Image
                            src={group.image_url}
                            width={1600}
                            height={900}
                            alt="thumbnail"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-secondary grid place-content-center text-2xl">
                            👥
                          </div>
                        )}
                      </div>
                      <div className="grow flex flex-col justify-around">
                        <div>
                          <h3 className="font-bold text-lg/5 line-clamp-1">
                            {group.full_name || group.name}
                          </h3>
                          {group.slack_channel && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              #{group.slack_channel}
                            </p>
                          )}
                        </div>
                        <AvatarGroup max={5}>
                          {group.users.map((member) => (
                            <Avatar
                              className="border-background border-2"
                              key={member.id}
                            >
                              {member.avatar_url && (
                                <AvatarImage
                                  src={member.avatar_url}
                                  alt={member.nick_name || member.name}
                                  className="object-cover"
                                  width={300}
                                  height={300}
                                />
                              )}
                              <AvatarFallback>
                                {(member.nick_name || member.name).substring(
                                  0,
                                  1
                                )}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </AvatarGroup>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            ) : (
              <p className="text-center">所属しているグループはありません。</p>
            )}
          </Section>
          {/* <Section className="mx-0">
            <div className="sm:overflow-hidden sm:rounded-lg sm:mx-6">
              <Image
                src="https://picsum.photos/900/1200"
                alt="image1"
                width={900}
                height={1200}
                className="object-cover object-center"
              />
            </div>
          </Section> */}
          {interests.length > 0 && (
            <Section icon="🏄" title="Interests">
              <ChipGroup>
                {interests.map((badge) => (
                  <Chip key={badge.id} icon={badge.emoji}>
                    {badge.name}
                  </Chip>
                ))}
              </ChipGroup>
            </Section>
          )}
          {lifestages.length > 0 && (
            <Section icon="👟" title="Lifestage">
              <ChipGroup>
                {lifestages.map((badge) => (
                  <Chip key={badge.id} icon={badge.emoji}>
                    {badge.name}
                  </Chip>
                ))}
              </ChipGroup>
            </Section>
          )}
          {college_skills.length > 0 && (
            <Section icon="🍳" title="Skills">
              <ChipGroup>
                {college_skills.map((badge) => (
                  <Chip key={badge.id} icon={badge.emoji}>
                    {badge.name}
                  </Chip>
                ))}
              </ChipGroup>
            </Section>
          )}
          {/* <Section className="sm:overflow-hidden sm:rounded-lg sm:mx-6 mx-0">
            <Image
              src="https://picsum.photos/1024/1024"
              alt="image2"
              width={1024}
              height={1024}
              className="object-cover object-center"
            />
          </Section> */}
          {user.educations && (
            <Section icon="🎓" title="Education">
              <HistoryGroup>
                {user.educations
                  .sort((a, b) => {
                    if (
                      parseISO(a.graduation_date) < parseISO(b.graduation_date)
                    )
                      return -1;
                    if (
                      parseISO(a.graduation_date) > parseISO(b.graduation_date)
                    )
                      return 1;
                    return 0;
                  })
                  .map((education) => (
                    <History
                      key={education.school_id}
                      title={education.schools!.name}
                      description={education.faculty ?? undefined}
                      items={education.activities_and_societies ?? undefined}
                      timestamp={
                        parseISO(education.graduation_date) < new Date()
                          ? format(parseISO(education.graduation_date), "y")
                          : "現在"
                      }
                      avatar={
                        <AvatarGroup max={5}>
                          {education.schools?.users.map((member) => (
                            <Avatar
                              className="border-background border-2"
                              key={member.id}
                            >
                              {member.avatar_url && (
                                <AvatarImage
                                  src={member.avatar_url}
                                  alt={member.nick_name || member.name}
                                  className="object-cover"
                                  width={300}
                                  height={300}
                                />
                              )}
                              <AvatarFallback>
                                {(member.nick_name || member.name).substring(
                                  0,
                                  1
                                )}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </AvatarGroup>
                      }
                    />
                  ))}
              </HistoryGroup>
            </Section>
          )}
          {user.experiences && (
            <Section icon="💼" title="Experience">
              <HistoryGroup>
                {user.experiences
                  .sort((a, b) => {
                    if (parseISO(a.start_date) < parseISO(b.start_date))
                      return -1;
                    if (parseISO(a.start_date) > parseISO(b.start_date))
                      return 1;
                    return 0;
                  })
                  .map((experience) => (
                    <History
                      key={experience.company_id}
                      title={experience.companies!.name}
                      description={experience.position}
                      timestamp={`${format(
                        parseISO(experience.start_date),
                        "y.M"
                      )} ~ ${
                        experience.end_date
                          ? format(parseISO(experience.end_date), "y.M")
                          : "現在"
                      } (${formatDuration(
                        intervalToDuration({
                          start: parseISO(experience.start_date),
                          end: experience.end_date
                            ? parseISO(experience.end_date)
                            : new Date(),
                        }),
                        { locale: ja, format: ["years", "months"] }
                      ).replace(/ /g, "")})`}
                      items={experience.projects_and_skills ?? undefined}
                      avatar={
                        <AvatarGroup max={5}>
                          {experience.companies?.users.map((member) => (
                            <Avatar
                              className="border-background border-2"
                              key={member.id}
                            >
                              {member.avatar_url && (
                                <AvatarImage
                                  src={member.avatar_url}
                                  alt={member.nick_name || member.name}
                                  className="object-cover"
                                  width={300}
                                  height={300}
                                />
                              )}
                              <AvatarFallback>
                                {(member.nick_name || member.name).substring(
                                  0,
                                  1
                                )}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </AvatarGroup>
                      }
                    />
                  ))}
              </HistoryGroup>
            </Section>
          )}
          {/* <Section className="sm:overflow-hidden sm:rounded-lg sm:mx-6 mx-0">
            <Image
              src="https://picsum.photos/1200/1200"
              alt="image3"
              width={1200}
              height={1200}
              className="object-cover object-center"
            />
          </Section> */}
          <Section
            icon="💬"
            title="Q&A"
            cta={<Button className="rounded-full">質問する</Button>}
          >
            <Card className="p-6">
              <div className="flex flex-col gap-2">
                <Message left={false}>
                  <Bubble left={false}>Youは何しにカレッジへ？</Bubble>
                </Message>
                <Message>
                  <Avatar>
                    <AvatarImage
                      src={user.avatar_url || undefined}
                      alt={user.nick_name || user.name}
                      className="object-cover"
                      width={300}
                      height={300}
                    />
                    <AvatarFallback>
                      {(user.nick_name || user.name).substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <Bubble>寮生活が楽しそうだったから！</Bubble>
                </Message>
                {/* <HeartCount count={0} hearted={false} /> */}
              </div>
            </Card>
          </Section>
          {/* <Section className="sm:overflow-hidden sm:rounded-lg sm:mx-6 mx-0">
            <Image
              src="https://picsum.photos/900/900"
              alt="image4"
              width={900}
              height={900}
              className="object-cover object-center"
            />
          </Section> */}
          <Section icon="✉️" title="Contacts">
            <ChipGroup>
              {user.email && (
                <Link href={`mailto:${user.email}`}>
                  <Chip icon={<Mail size={16} />}>
                    <span className="text-sky-500">{user.email}</span>
                  </Chip>
                </Link>
              )}
              {user.website && (
                <Link
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Chip icon={<Globe size={16} />}>
                    <span className="text-sky-500">{user.website}</span>
                  </Chip>
                </Link>
              )}
              {user.twitter && (
                <Link
                  href={`https://twitter.com/${user.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Chip icon={<Twitter size={16} />}>
                    <span className="text-sky-500">{user.twitter}</span>
                  </Chip>
                </Link>
              )}
              {user.instagram && (
                <Link
                  href={`https://www.instagram.com/${user.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Chip icon={<Instagram size={16} />}>
                    <span className="text-sky-500">{user.instagram}</span>
                  </Chip>
                </Link>
              )}
              {user.facebook && (
                <Link
                  href={`https://www.facebook.com/${user.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Chip icon={<Facebook size={16} />}>
                    <span className="text-sky-500">{user.facebook}</span>
                  </Chip>
                </Link>
              )}
              {user.linkedin && (
                <Link
                  href={`https://www.linkedin.com/in/${user.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Chip icon={<Linkedin size={16} />}>
                    <span className="text-sky-500">{user.linkedin}</span>
                  </Chip>
                </Link>
              )}
              {user.paypay && (
                <Chip
                  icon={
                    <Image
                      src="/paypay.png"
                      alt="PayPay Logo"
                      width={180}
                      height={180}
                    />
                  }
                  clickable={false}
                >
                  {user.paypay}
                </Chip>
              )}
            </ChipGroup>
          </Section>

          <div className="mx-6 text-muted-foreground text-sm text-center">
            {formatDistanceToNow(parseISO(user.updated_at || user.created_at), {
              locale: ja,
            })}
            前に更新
          </div>
        </article>
        <Separator className="my-8" />
        <Section icon="👀" title="もっと見る">
          <div className="my-16 grid place-items-center">工事中🚧</div>
        </Section>
      </div>
      <footer className="mt-16 grid place-content-center text-sm text-muted-foreground py-8">
        &#169; College App
      </footer>
    </div>
  );
}

interface SectionProps extends ComponentProps<"section"> {
  icon?: string;
  title?: string;
  cta?: React.ReactNode;
}

function Section({
  icon,
  title,
  cta,
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section className={cn("mx-6", className)} {...props}>
      {(icon || title || cta) && (
        <div className="flex justify-between items-center mb-4">
          <div className="font-black text-2xl flex gap-2">
            {icon && <span>{icon}</span>}
            {title && <h2>{title}</h2>}
          </div>
          {cta && <div>{cta}</div>}
        </div>
      )}
      {/* {title ? <FadeIn>{children}</FadeIn> : children} */}
      {children}
    </section>
  );
}

interface CardProps extends ComponentProps<"div"> {}

function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition ease-in-out hover:-translate-y-1",
        className
      )}
      {...props}
    />
  );
}

interface CardGroupProps extends ComponentProps<"div"> {}

function CardGroup({ className, ...props }: CardGroupProps) {
  return <div className={cn("flex gap-4 flex-col", className)} {...props} />;
}
