import { Chip } from "@/components/chip";
import { cn } from "@/lib/utils";

import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Slack,
  Twitter,
} from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { AvatarGroup } from "@/components/avatar-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChipGroup } from "@/components/chip-group";
import { ComponentProps, Fragment, forwardRef } from "react";
import { Separator } from "@/components/ui/separator";
import { getProfiles } from "./services/get-profiles";
import { getProfile } from "./services/get-profile";
// import { FadeIn } from "@/components/fade-in";

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
      <header className="mt-6 mx-6 overflow-hidden rounded-lg shadow-inner">
        <Image
          src="https://picsum.photos/1600/900"
          alt="header"
          width={1600}
          height={900}
          className="object-cover object-center"
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
            <div className="text-center mx-4 mt-2 flex gap-1 flex-wrap justify-center text-sky-500">
              {profile.bio_tags.map((tag) => (
                <p key={tag}>#{tag}</p>
              ))}
            </div>
          )}
        </section>
        <Section title="👋 基本情報">
          <ChipGroup>
            {profile.full_name && <Chip icon="🪪">{profile.full_name}</Chip>}
            {profile.residence_histories.map((residence_history) => (
              <Chip key={Number(residence_history.id)} icon="👣">
                {residence_history.move_in_date &&
                  format(residence_history.move_in_date, "MMM d, y")}{" "}
                -{" "}
                {residence_history.move_out_date &&
                  format(residence_history.move_out_date, "MMM d, y")}
              </Chip>
            ))}
            {profile.post_number && (
              <Chip icon="📮">{profile.post_number}</Chip>
            )}
            {profile.room_number && (
              <Chip icon="🛏️">{profile.room_number}</Chip>
            )}
            {profile.date_of_birth && (
              <Chip icon="🎂">{format(profile.date_of_birth, "MMM d, y")}</Chip>
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
        <Section title="👥 グループ">
          {profile.profiles_groups.length > 0 ? (
            <div className="grid grid-cols-[6rem_minmax(0,_1fr)] gap-y-2 gap-x-4">
              {profile.profiles_groups.map((profiles_group, i) => (
                <Fragment key={Number(profiles_group.groups.id)}>
                  {i > 0 && (
                    <>
                      <div />
                      <Separator />
                    </>
                  )}
                  <div className="w-24 h-24 aspect-square rounded-lg overflow-hidden shrink-0">
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
                  <div className="flex flex-col justify-around">
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
                  {/* </div> */}
                </Fragment>
              ))}
            </div>
          ) : (
            <p className="text-center">所属しているグループはありません。</p>
          )}
        </Section>
        <Section className="overflow-hidden rounded-lg shadow-inner snap-center">
          <Image
            src="https://picsum.photos/900/1200"
            alt="image1"
            width={900}
            height={1200}
            className="object-cover object-center"
          />
        </Section>
        {interests.length > 0 && (
          <Section title="🏄 趣味・興味">
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
          <Section title="👟 ライフステージ">
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
          <Section title="🍳 カレッジスキル">
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
        <Section className="overflow-hidden rounded-lg shadow-inner snap-center">
          <Image
            src="https://picsum.photos/1024/1024"
            alt="image1"
            width={1024}
            height={1024}
            className="object-cover object-center"
          />
        </Section>
        <Section title="🎓 Education">
          <CardGroup>
            <HistoryItem
              primary="慶應義塾大学"
              secondary="環境情報学部"
              date="現在"
            />
            <HistoryItem primary="慶應義塾高校" date="2018" />
          </CardGroup>
        </Section>
        <Section title="💼 Experience">
          <CardGroup>
            <HistoryItem
              primary="ソフトウェアエンジニア"
              secondary="株式会社Plugo"
              date="1年8ヶ月"
            />
            <HistoryItem
              primary="ソフトウェアエンジニア"
              secondary="株式会社Penmark"
              date="1ヶ月"
            />
          </CardGroup>
        </Section>
        <Section className="overflow-hidden rounded-lg shadow-inner snap-center">
          <Image
            src="https://picsum.photos/1200/1200"
            alt="image1"
            width={1200}
            height={1200}
            className="object-cover object-center"
          />
        </Section>
        <Section title="💬 質問箱チョイス">
          <CardGroup>
            <Card>
              <p className="text-sm text-muted-foreground mb-0.5">
                Youは何しにカレッジへ？
              </p>
              <p>寮生活が楽しそうだったから！</p>
            </Card>
            <Card>
              <p className="text-sm text-muted-foreground mb-0.5">
                趣味について詳しく👀
              </p>
              <p>サービス開発が大好き！みんなの役にたつアプリを作りたい！</p>
            </Card>
            <Card>
              <p className="text-sm text-muted-foreground mb-0.5">
                今カレッジに求めることは？
              </p>
              <p>心理的安全性</p>
            </Card>
          </CardGroup>
        </Section>
        <Section className="overflow-hidden rounded-lg shadow-inner snap-center">
          <Image
            src="https://picsum.photos/900/900"
            alt="image1"
            width={900}
            height={900}
            className="object-cover object-center"
          />
        </Section>
        <Section title="✉️ SNS・連絡先">
          <ChipGroup>
            <Link href="https://twitter.com/Chijidosu">
              <Chip icon={<Twitter size={16} />}>
                <span className="text-sky-500">chijidosu</span>
              </Chip>
            </Link>
            <Link href="https://twitter.com/Chijidosu">
              <Chip icon={<Instagram size={16} />}>
                <span className="text-sky-500">chijiiwashingo</span>
              </Chip>
            </Link>
            <Link href="https://twitter.com/Chijidosu">
              <Chip icon={<Facebook size={16} />}>
                <span className="text-sky-500">Chijidosu</span>
              </Chip>
            </Link>
            <Link href="https://twitter.com/Chijidosu">
              <Chip icon={<Linkedin size={16} />}>
                <span className="text-sky-500">chiji1108</span>
              </Chip>
            </Link>
            <Link href="https://twitter.com/Chijidosu">
              <Chip
                icon={
                  <Image
                    src="/paypay.png"
                    alt="PayPay Logo"
                    width={180}
                    height={180}
                  />
                }
              >
                <span className="text-sky-500">chiji1108</span>
              </Chip>
            </Link>
            <Link href="https://twitter.com/Chijidosu">
              <Chip icon={<Slack size={16} />}>
                <span className="text-sky-500">s.chijiiwa@hlab.college</span>
              </Chip>
            </Link>
            <Link href="https://twitter.com/Chijidosu">
              <Chip icon={<Mail size={16} />}>
                <span className="text-sky-500">chiji@keio.jp</span>
              </Chip>
            </Link>
          </ChipGroup>
        </Section>
      </article>
      <footer className="mt-16 grid place-content-center text-sm text-muted-foreground py-8">
        &#169; College App
      </footer>
    </div>
  );
}

interface SectionProps extends ComponentProps<"section"> {
  title?: string;
}

function Section({ title, children, className, ...props }: SectionProps) {
  return (
    <section className={cn("mx-6", className)} {...props}>
      {title && <h2 className="font-bold mb-4 text-lg">{title}</h2>}
      {/* {title ? <FadeIn>{children}</FadeIn> : children} */}
      {children}
    </section>
  );
}

interface HistoryItemProps extends ComponentProps<"div"> {
  primary: string;
  secondary?: string;
  date: string;
}

function HistoryItem({ primary, secondary, date, ...props }: HistoryItemProps) {
  return (
    <Card className="leading-tight" {...props}>
      <div className="mb-0.5">
        <p>{primary}</p>
        {secondary && <p>{secondary}</p>}
      </div>
      <p className="text-sm text-muted-foreground">{date}</p>
    </Card>
  );
}

interface CardProps extends ComponentProps<"div"> {}

function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm p-6",
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
