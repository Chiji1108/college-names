import { Badge } from "@/components/badge";
import { Database } from "@/lib/database.types";
import { cn } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cva } from "class-variance-authority";
import { prisma } from "@/lib/prisma";
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

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  // const supabase = createServerComponentClient<Database>({ cookies });
  // const { data, error } = await supabase
  //   .from("profiles")
  //   .select(
  //     `
  //     *,
  //     groups(*),
  //     profiles_groups(*),
  //     profiles_contacts(profile_id, twitter)
  //   `
  //   )
  //   .eq("username", params.username)
  //   .maybeSingle();

  if (!data) {
    notFound();
  }
  console.log(data);

  return (
    <div>
      {/* <header className="w-full aspect-video">
        <Image
          src="https://picsum.photos/1600/900"
          alt="image1"
          width={1600}
          height={900}
        />
      </header> */}
      <article className="mt-48 flex flex-col gap-10">
        <section className="mb-12 container -mt-[64px] flex flex-col items-center gap-1">
          <div className="w-[128px] h-[128px] rounded-full overflow-hidden border-background border-4">
            {data.avatar_url ? (
              <Image
                src={data.avatar_url}
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
          <h1 className="font-bold text-2xl">{data.nick_name}</h1>
          <div className="flex gap-1 flex-wrap">
            {/* {data.groups.map((group) => (
              <Badge key={group.id}>{group.name}</Badge>
            ))} */}
            {/* <Badge
              size="sm"
              // icon={
              //   <div className="rounded-full h-2 w-2 overflow-hidden bg-emerald-400" />
              // }
            >
              RP2
            </Badge>
            <Badge size="sm">チューター</Badge> */}
          </div>
          {data.bio_tags && (
            <div className="flex gap-1 flex-wrap justify-center text-sky-500">
              {data.bio_tags.map((tag) => (
                <p key={tag}>#{tag}</p>
              ))}
            </div>
          )}
        </section>
        <BadgeGroup title="👋 基本情報">
          <Badge icon="🪪">千々岩真吾</Badge>
          <Badge icon="👣">Apr &apos;22 -</Badge>
          <Badge icon="📮">325</Badge>
          <Badge icon="🛏️">207</Badge>
          <Badge icon="🎂">Nov 8, 1999</Badge>
          <Badge icon="💬">日本語</Badge>
          <Badge icon="🧩">INFP</Badge>
          <Badge icon="🚬">吸わない</Badge>
          <Badge icon="🍺">付き合いで飲む程度</Badge>
        </BadgeGroup>
        <BadgeGroup title="👥 グループ">
          <Badge>House B</Badge>
          <Badge icon="📚">カレッジライフ分科会</Badge>
          <Badge icon="🧘‍♂️">ヨガ</Badge>
        </BadgeGroup>
        {/* <section>
          <div className="w-full aspect-video">
            <Image
              src="https://picsum.photos/1600/900"
              alt="image1"
              width={1600}
              height={900}
            />
          </div>
          <div className="w-full aspect-video">
            <Image
              src="https://picsum.photos/1600/900"
              alt="image1"
              width={1600}
              height={900}
            />
          </div>
        </section> */}
        <BadgeGroup title="🍳 カレッジスキル">
          <Badge icon="🤖">Slackボット</Badge>
          <Badge icon="🧑‍💻">プログラミング</Badge>
        </BadgeGroup>
        <BadgeGroup title="🏄 趣味・興味">
          <Badge icon="✏️">デザイン</Badge>
          <Badge icon="🎲">ボードゲーム</Badge>
          <Badge icon="🚶">ウォーキング</Badge>
        </BadgeGroup>
        <BadgeGroup title="👟 ライフステージ">
          <Badge icon="🌎">海外に行きたい</Badge>
          <Badge icon="💫">セラピーに通院</Badge>
        </BadgeGroup>
        <section>
          <div className="w-full aspect-video">
            <Image
              src="https://picsum.photos/1600/900"
              alt="image1"
              width={1600}
              height={900}
            />
          </div>
        </section>
        <section className="container">
          <H2>🎓 Education</H2>
          <div className="flex gap-3 flex-col">
            <HistoryItem
              primary="慶應義塾大学"
              secondary="環境情報学部"
              date="現在"
            />
            <HistoryItem primary="慶應義塾高校" date="2018" />
          </div>
        </section>
        <section className="container">
          <H2>💼 Experience</H2>
          <div className="flex gap-3 flex-col">
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
          </div>
        </section>
        <section>
          <div className="w-full aspect-video">
            <Image
              src="https://picsum.photos/1600/900"
              alt="image1"
              width={1600}
              height={900}
            />
          </div>
        </section>
        <section className="container">
          <H2>💬 質問箱チョイス</H2>
          <div className="flex gap-3 flex-col">
            <div className={card()}>
              <p className="text-sm text-muted-foreground mb-0.5">
                Youは何しにカレッジへ？
              </p>
              <p>寮生活が楽しそうだったから！</p>
            </div>
            <div className={card()}>
              <p className="text-sm text-muted-foreground mb-0.5">
                趣味について詳しく👀
              </p>
              <p>サービス開発が大好き！みんなの役にたつアプリを作りたい！</p>
            </div>
            <div className={card()}>
              <p className="text-sm text-muted-foreground mb-0.5">
                今カレッジに求めることは？
              </p>
              <p>心理的安全性</p>
            </div>
          </div>
        </section>
        <section>
          <div className="w-full aspect-video">
            <Image
              src="https://picsum.photos/1600/900"
              alt="image1"
              width={1600}
              height={900}
            />
          </div>
        </section>
        <BadgeGroup title="✉️ SNS・連絡先">
          <Link href="https://twitter.com/Chijidosu">
            <Badge icon={<Twitter size={16} />}>
              <span className="text-sky-500">chijidosu</span>
            </Badge>
          </Link>
          <Link href="https://twitter.com/Chijidosu">
            <Badge icon={<Instagram size={16} />}>
              <span className="text-sky-500">chijiiwashingo</span>
            </Badge>
          </Link>
          <Link href="https://twitter.com/Chijidosu">
            <Badge icon={<Facebook size={16} />}>
              <span className="text-sky-500">Chijidosu</span>
            </Badge>
          </Link>
          <Link href="https://twitter.com/Chijidosu">
            <Badge icon={<Linkedin size={16} />}>
              <span className="text-sky-500">chiji1108</span>
            </Badge>
          </Link>
          <Link href="https://twitter.com/Chijidosu">
            <Badge
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
            </Badge>
          </Link>
          <Link href="https://twitter.com/Chijidosu">
            <Badge icon={<Slack size={16} />}>
              <span className="text-sky-500">s.chijiiwa@hlab.college</span>
            </Badge>
          </Link>
          <Link href="https://twitter.com/Chijidosu">
            <Badge icon={<Mail size={16} />}>
              <span className="text-sky-500">chiji@keio.jp</span>
            </Badge>
          </Link>
        </BadgeGroup>
      </article>
      <footer className="mt-16 grid place-content-center text-sm text-muted-foreground py-8">
        &#169; College App
      </footer>
    </div>
  );
}

interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

function BadgeGroup({ title, children }: BadgeGroupProps) {
  return (
    <section className="container">
      <H2>{title}</H2>
      <div className="flex gap-2 flex-wrap">{children}</div>
    </section>
  );
}

interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {}

function H2({ children }: H2Props) {
  return <h2 className="font-bold mb-3 text-lg">{children}</h2>;
}

interface HistoryItemProps extends React.HTMLAttributes<HTMLDivElement> {
  primary: string;
  secondary?: string;
  date: string;
}

function HistoryItem({ primary, secondary, date }: HistoryItemProps) {
  return (
    <div className={cn("leading-tight", card())}>
      <div className="mb-0.5">
        <p>{primary}</p>
        {secondary && <p>{secondary}</p>}
      </div>
      <p className="text-sm text-muted-foreground">{date}</p>
    </div>
  );
}

const card = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm p-6"
);
