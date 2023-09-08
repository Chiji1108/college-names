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
import { format, formatDuration, intervalToDuration } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { AvatarGroup } from "@/components/avatar-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ComponentProps, Fragment, forwardRef } from "react";
import { Separator } from "@/components/ui/separator";
import { getProfiles } from "./services/get-profiles";
import { getProfile } from "./services/get-profile";
import { History, HistoryGroup } from "@/components/history";
import { Bubble, Message } from "@/components/message";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  const profiles = await getProfiles();

  return profiles.map((profile) => ({
    username: profile.username,
  }));
}

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const profile = await getProfile(params.username);

  if (!profile) notFound();

  const college_skills = profile.profiles_badges.filter(
    (profiles_badge) =>
      Number(profiles_badge.badges.badge_categories.parent_id) == 3
  );

  const interests = profile.profiles_badges.filter(
    (profiles_badge) =>
      Number(profiles_badge.badges.badge_categories.parent_id) == 1
  );

  const lifestages = profile.profiles_badges.filter(
    (profiles_badge) =>
      Number(profiles_badge.badges.badge_categories.parent_id) == 2
  );

  const isAlumni = profile.residence_histories.some(
    (residence_history) =>
      residence_history.move_out_date &&
      residence_history.move_out_date < new Date()
  );

  return (
    <div className="mx-auto w-full px-4.5 xs:px-6 sm:px-10 md:px-11 lg:px-12 max-w-2xl">
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
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url}
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
          <h1 className="font-bold text-2xl">{profile.nick_name}</h1>
          <div className="mx-4 flex items-center gap-2 flex-wrap">
            {profile.profiles_groups
              .filter(
                (profiles_group) =>
                  profiles_group.groups.group_categories.is_noteworthy
              )
              .map((profiles_group) => (
                <Badge
                  key={Number(profiles_group.groups.id)}
                  variant={"secondary"}
                >
                  {profiles_group.groups.name}
                </Badge>
              ))}
            {isAlumni && <Badge variant={"secondary"}>アラムナイ</Badge>}
          </div>
          {profile.bio_tags && (
            <div className="text-center max-w-sm mt-2 flex gap-1 flex-wrap-reverse flex-row-reverse justify-center text-sky-500">
              {profile.bio_tags.reverse().map((tag) => (
                <p key={tag}>#{tag}</p>
              ))}
            </div>
          )}
        </section>
        <Section icon="👋" title="Profile">
          <ChipGroup>
            {profile.full_name && (
              <Chip icon="🪪" clickable={false}>
                {profile.full_name}
              </Chip>
            )}
            {profile.residence_histories.map((residence_history) => (
              <Chip
                key={Number(residence_history.id)}
                icon="👣"
                clickable={false}
              >
                {residence_history.move_in_date &&
                  format(residence_history.move_in_date, "y.M")}
                {" ~ "}
                {residence_history.move_out_date &&
                  format(residence_history.move_out_date, "y.M")}
              </Chip>
            ))}
            {profile.post_number && (
              <Chip icon="📮" clickable={false}>
                {profile.post_number}
              </Chip>
            )}
            {profile.room_number && (
              <Chip icon="🛏️" clickable={false}>
                {profile.room_number}
              </Chip>
            )}
            {profile.date_of_birth && (
              <Chip icon="🎂" clickable={false}>
                {format(profile.date_of_birth, "MMM d, y")}
              </Chip>
            )}
            {profile.profiles_badges
              .filter(
                (profiles_badge) =>
                  Number(profiles_badge.badges.category_id) == 4
              )
              .map((profiles_badge) => (
                <Chip
                  key={Number(profiles_badge.badges.id)}
                  icon={profiles_badge.badges.emoji}
                >
                  {profiles_badge.badges.name}
                </Chip>
              ))}
            {profile.profiles_badges
              .filter(
                (profiles_badge) =>
                  Number(profiles_badge.badges.category_id) == 5
              )
              .map((profiles_badge) => (
                <Chip
                  key={Number(profiles_badge.badges.id)}
                  icon={profiles_badge.badges.emoji}
                >
                  {profiles_badge.badges.name}
                </Chip>
              ))}
            {profile.profiles_badges
              .filter(
                (profiles_badge) =>
                  Number(profiles_badge.badges.category_id) == 6
              )
              .map((profiles_badge) => (
                <Chip
                  key={Number(profiles_badge.badges.id)}
                  icon={profiles_badge.badges.emoji}
                >
                  {profiles_badge.badges.name}
                </Chip>
              ))}
            {profile.profiles_badges
              .filter(
                (profiles_badge) =>
                  Number(profiles_badge.badges.category_id) == 7
              )
              .map((profiles_badge) => (
                <Chip
                  key={Number(profiles_badge.badges.id)}
                  icon={profiles_badge.badges.emoji}
                >
                  {profiles_badge.badges.name}
                </Chip>
              ))}
          </ChipGroup>
        </Section>
        <Section icon="👥" title="Group">
          {profile.profiles_groups.length > 0 ? (
            <div className="flex flex-col gap-2">
              {profile.profiles_groups.map((profiles_group, i) => (
                <Fragment key={Number(profiles_group.groups.id)}>
                  {/* <Card className="flex">
                    <div className="shrink-0 h-28 w-28">
                      {profiles_group.groups.image_url ? (
                        <Image
                          src={profiles_group.groups.image_url}
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

                    <div className="grow flex flex-col justify-around py-2 px-4">
                      <div>
                        <h3 className="font-bold text-lg/5 line-clamp-1">
                          {profiles_group.groups.full_name ||
                            profiles_group.groups.name}
                        </h3>
                        {profiles_group.groups.slack_channel && (
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            #{profiles_group.groups.slack_channel}
                          </p>
                        )}
                      </div>
                      <AvatarGroup max={5}>
                        {profiles_group.groups.profiles_groups.map((member) => (
                          <Avatar
                            className="border-background border-2"
                            key={member.profile_id}
                          >
                            {member.profiles.avatar_url && (
                              <AvatarImage
                                src={member.profiles.avatar_url}
                                alt={
                                  member.profiles.nick_name ||
                                  member.profiles.full_name
                                }
                                className="object-cover"
                                width={300}
                                height={300}
                              />
                            )}
                            <AvatarFallback>
                              {(
                                member.profiles.nick_name ||
                                member.profiles.full_name
                              ).substring(0, 1)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </AvatarGroup>
                    </div>
                  </Card> */}
                  {i > 0 && (
                    <div className="flex gap-4">
                      <div className="shrink-0 w-24" />
                      <Separator className="shrink" />
                    </div>
                  )}
                  <div className="flex gap-4 cursor-pointer rounded-lg overflow-hidden hover:ring hover:ring-border hover:ring-offset-2 transition hover:-translate-y-1 ease-in-out">
                    <div className="shrink-0 w-24 h-24 aspect-square rounded-lg overflow-hidden">
                      {profiles_group.groups.image_url ? (
                        <Image
                          src={profiles_group.groups.image_url}
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
                          {profiles_group.groups.full_name ||
                            profiles_group.groups.name}
                        </h3>
                        {profiles_group.groups.slack_channel && (
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            #{profiles_group.groups.slack_channel}
                          </p>
                        )}
                      </div>
                      <AvatarGroup max={5}>
                        {profiles_group.groups.profiles_groups.map((member) => (
                          <Avatar
                            className="border-background border-2"
                            key={member.profile_id}
                          >
                            {member.profiles.avatar_url && (
                              <AvatarImage
                                src={member.profiles.avatar_url}
                                alt={
                                  member.profiles.nick_name ||
                                  member.profiles.full_name
                                }
                                className="object-cover"
                                width={300}
                                height={300}
                              />
                            )}
                            <AvatarFallback>
                              {(
                                member.profiles.nick_name ||
                                member.profiles.full_name
                              ).substring(0, 1)}
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
        <Section className="mx-0">
          <div className="sm:overflow-hidden sm:rounded-lg sm:mx-6">
            <Image
              src="https://picsum.photos/900/1200"
              alt="image1"
              width={900}
              height={1200}
              className="object-cover object-center"
            />
          </div>
        </Section>
        {interests.length > 0 && (
          <Section icon="🏄" title="Interests">
            <ChipGroup>
              {interests.map((profiles_badge) => (
                <Chip
                  key={Number(profiles_badge.badges.id)}
                  icon={profiles_badge.badges.emoji}
                >
                  {profiles_badge.badges.name}
                </Chip>
              ))}
            </ChipGroup>
          </Section>
        )}
        {lifestages.length > 0 && (
          <Section icon="👟" title="Lifestage">
            <ChipGroup>
              {lifestages.map((profiles_badge) => (
                <Chip
                  key={Number(profiles_badge.badges.id)}
                  icon={profiles_badge.badges.emoji}
                >
                  {profiles_badge.badges.name}
                </Chip>
              ))}
            </ChipGroup>
          </Section>
        )}
        {college_skills.length > 0 && (
          <Section icon="🍳" title="Skills">
            <ChipGroup>
              {college_skills.map((profiles_badge) => (
                <Chip
                  key={Number(profiles_badge.badges.id)}
                  icon={profiles_badge.badges.emoji}
                >
                  {profiles_badge.badges.name}
                </Chip>
              ))}
            </ChipGroup>
          </Section>
        )}
        <Section className="sm:overflow-hidden sm:rounded-lg sm:mx-6 mx-0">
          <Image
            src="https://picsum.photos/1024/1024"
            alt="image2"
            width={1024}
            height={1024}
            className="object-cover object-center"
          />
        </Section>
        {profile.educations && (
          <Section icon="🎓" title="Education">
            <HistoryGroup>
              {profile.educations
                .sort((a, b) => {
                  if (a.graduation_date < b.graduation_date) return -1;
                  if (a.graduation_date > b.graduation_date) return 1;
                  return 0;
                })
                .map((education) => (
                  <History
                    key={Number(education.school_id)}
                    title={education.schools.name}
                    description={education.faculty ?? undefined}
                    items={education.activities_and_societies ?? undefined}
                    timestamp={
                      education.graduation_date < new Date()
                        ? format(education.graduation_date, "y")
                        : "現在"
                    }
                    avatar={
                      <AvatarGroup max={5}>
                        {education.schools.educations.map((member) => (
                          <Avatar
                            className="border-background border-2"
                            key={member.profile_id}
                          >
                            {member.profiles.avatar_url && (
                              <AvatarImage
                                src={member.profiles.avatar_url}
                                alt={
                                  member.profiles.nick_name ||
                                  member.profiles.full_name
                                }
                                className="object-cover"
                                width={300}
                                height={300}
                              />
                            )}
                            <AvatarFallback>
                              {(
                                member.profiles.nick_name ||
                                member.profiles.full_name
                              ).substring(0, 1)}
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
        {profile.experiences && (
          <Section icon="💼" title="Experience">
            <HistoryGroup>
              {profile.experiences
                .sort((a, b) => {
                  if (a.start_date < b.start_date) return -1;
                  if (a.start_date > b.start_date) return 1;
                  return 0;
                })
                .map((experience) => (
                  <History
                    key={Number(experience.company_id)}
                    title={experience.companies.name}
                    description={experience.position}
                    timestamp={`${format(experience.start_date, "y.M")} ~ ${
                      experience.end_date
                        ? format(experience.end_date, "y.M")
                        : "現在"
                    } (${formatDuration(
                      intervalToDuration({
                        start: experience.start_date,
                        end: experience.end_date ?? new Date(),
                      }),
                      { locale: ja, format: ["years", "months"] }
                    ).replace(/ /g, "")})`}
                    items={experience.details}
                    avatar={
                      <AvatarGroup max={5}>
                        {experience.companies.experiences.map((member) => (
                          <Avatar
                            className="border-background border-2"
                            key={member.profile_id}
                          >
                            {member.profiles.avatar_url && (
                              <AvatarImage
                                src={member.profiles.avatar_url}
                                alt={
                                  member.profiles.nick_name ||
                                  member.profiles.full_name
                                }
                                className="object-cover"
                                width={300}
                                height={300}
                              />
                            )}
                            <AvatarFallback>
                              {(
                                member.profiles.nick_name ||
                                member.profiles.full_name
                              ).substring(0, 1)}
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
        <Section className="sm:overflow-hidden sm:rounded-lg sm:mx-6 mx-0">
          <Image
            src="https://picsum.photos/1200/1200"
            alt="image3"
            width={1200}
            height={1200}
            className="object-cover object-center"
          />
        </Section>
        <Section icon="💬" title="Q&A" cta={<Button>質問する</Button>}>
          <Card className="p-6">
            <div className="flex flex-col gap-2">
              <Message left={false}>
                <Bubble left={false}>Youは何しにカレッジへ？</Bubble>
              </Message>
              <Message>
                <Avatar>
                  <AvatarImage
                    src={profile.avatar_url || undefined}
                    alt={profile.nick_name || profile.full_name}
                    className="object-cover"
                    width={300}
                    height={300}
                  />
                  <AvatarFallback>
                    {(profile.nick_name || profile.full_name).substring(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <Bubble>寮生活が楽しそうだったから！</Bubble>
              </Message>
              {/* <HeartCount count={0} hearted={false} /> */}
            </div>
          </Card>
          {/* <CardGroup>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-0.5">
                Youは何しにカレッジへ？
              </p>
              <p>寮生活が楽しそうだったから！</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-0.5">
                趣味について詳しく👀
              </p>
              <p>サービス開発が大好き！みんなの役にたつアプリを作りたい！</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-0.5">
                今カレッジに求めることは？
              </p>
              <p>心理的安全性</p>
            </Card>
          </CardGroup> */}
        </Section>
        <Section className="sm:overflow-hidden sm:rounded-lg sm:mx-6 mx-0">
          <Image
            src="https://picsum.photos/900/900"
            alt="image4"
            width={900}
            height={900}
            className="object-cover object-center"
          />
        </Section>
        {profile.profiles_contacts && (
          <Section icon="✉️" title="Contacts">
            <ChipGroup>
              {profile.users.email && (
                <Link href={`mailto:${profile.users.email}`}>
                  <Chip icon={<Slack size={16} />}>
                    <span className="text-sky-500">{profile.users.email}</span>
                  </Chip>
                </Link>
              )}
              {profile.profiles_contacts.email && (
                <Link href={`mailto:${profile.profiles_contacts.email}`}>
                  <Chip icon={<Mail size={16} />}>
                    <span className="text-sky-500">
                      {profile.profiles_contacts.email}
                    </span>
                  </Chip>
                </Link>
              )}
              {profile.profiles_contacts.web && (
                <Link
                  href={profile.profiles_contacts.web}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Chip icon={<Globe size={16} />}>
                    <span className="text-sky-500">
                      {profile.profiles_contacts.web}
                    </span>
                  </Chip>
                </Link>
              )}
              {profile.profiles_contacts.twitter && (
                <Link
                  href={`https://twitter.com/${profile.profiles_contacts.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Chip icon={<Twitter size={16} />}>
                    <span className="text-sky-500">
                      {profile.profiles_contacts.twitter}
                    </span>
                  </Chip>
                </Link>
              )}
              {profile.profiles_contacts.instagram && (
                <Link
                  href={`https://www.instagram.com/${profile.profiles_contacts.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Chip icon={<Instagram size={16} />}>
                    <span className="text-sky-500">
                      {profile.profiles_contacts.instagram}
                    </span>
                  </Chip>
                </Link>
              )}
              {profile.profiles_contacts.facebook && (
                <Link
                  href={`https://www.facebook.com/${profile.profiles_contacts.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Chip icon={<Facebook size={16} />}>
                    <span className="text-sky-500">
                      {profile.profiles_contacts.facebook}
                    </span>
                  </Chip>
                </Link>
              )}
              {profile.profiles_contacts.linkedin && (
                <Link
                  href={`https://www.linkedin.com/in/${profile.profiles_contacts.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Chip icon={<Linkedin size={16} />}>
                    <span className="text-sky-500">
                      {profile.profiles_contacts.linkedin}
                    </span>
                  </Chip>
                </Link>
              )}
              {profile.profiles_contacts.paypay && (
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
                  {profile.profiles_contacts.paypay}
                </Chip>
              )}
            </ChipGroup>
          </Section>
        )}
        <Section icon="👀" title="おすすめのユーザー">
          <div>ちょっと待ってね</div>
        </Section>
      </article>
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
        <div className="flex justify-between">
          <div className="font-black mb-4 text-2xl flex gap-2">
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
