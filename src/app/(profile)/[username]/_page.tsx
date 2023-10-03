// import { getProfile } from "@/app/api/fetcher/get-profile";
// import { notFound } from "next/navigation";
// import {
//   format,
//   formatDistanceToNow,
//   formatDuration,
//   intervalToDuration,
//   intlFormatDistance,
//   parseISO,
// } from "date-fns";
// import { container } from "@/styles/layouts";
// import Image from "next/image";
// import { Badge } from "@/components/ui/badge";
// import { Fragment, HTMLAttributes, forwardRef } from "react";
// import { cn } from "@/lib/utils";
// import { Separator } from "@/components/ui/separator";
// import { ja } from "date-fns/locale";
// import { Chip, ChipGroup } from "@/components/chip";
// import Link from "next/link";
// import {
//   Facebook,
//   Globe,
//   Instagram,
//   Linkedin,
//   Mail,
//   Twitter,
// } from "lucide-react";
// import { Bubble, Message } from "@/components/message";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { HistoryGroup, History } from "@/components/history";
// import { AvatarGroup } from "@/components/avatar-group";
// import ReactionBar from "@/components/reaction/reaction-bar";

// const BADGE_CATEGORY = {
//   COLLEGE_SKILL: 3,
//   INTEREST: 1,
//   LIFESTAGE: 2,
//   SPOKEN_LANGUAGE: 4,
// };
// export default async function Page({
//   params,
// }: {
//   params: { username: string };
// }) {
//   const { username } = params;
//   const user = await getProfile({ username });
//   if (!user) notFound();

//   const college_skills = user.badges.filter(
//     (badge) => badge.badge_categories?.parent_id == BADGE_CATEGORY.COLLEGE_SKILL
//   );

//   const interests = user.badges.filter(
//     (badge) => badge.badge_categories?.parent_id == BADGE_CATEGORY.INTEREST
//   );

//   const lifestages = user.badges.filter(
//     (badge) => badge.badge_categories?.parent_id == BADGE_CATEGORY.LIFESTAGE
//   );

//   const isAlumni = user.residential_histories.some(
//     (residential_history) =>
//       residential_history.move_out_date &&
//       parseISO(residential_history.move_out_date) < new Date()
//   );

//   const notableAnswers = user.answers.filter((answer) => answer.use_on_bio);

//   const images = user.photos.sort((a, b) => {
//     if (a.created_at < b.created_at) return -1;
//     if (a.created_at > b.created_at) return 1;
//     return 0;
//   });
//   return (
//     <div>
//       <div className={container}>
//         <header className="h-[128px] sm:rounded-b-xl sm:overflow-hidden sm:mx-6 relative">
//           {user.header_url ? (
//             <Image
//               src={user.header_url}
//               alt={"header"}
//               fill
//               className="object-cover object-center h-[128px] w-full"
//             />
//           ) : (
//             <div className="h-[128px] w-full" />
//           )}
//         </header>
//         <article className="flex flex-col gap-24 snap-y">
//           <section className="mx-6 -mt-[64px] flex flex-col items-center gap-2">
//             <div className="w-[128px] h-[128px] rounded-full overflow-hidden border-background border-4 relative">
//               {user.avatar_url ? (
//                 <Image
//                   src={user.avatar_url}
//                   alt={"avatar"}
//                   className="object-cover object-center"
//                   fill
//                 />
//               ) : (
//                 <div className="w-full h-full bg-secondary grid place-content-center text-4xl">
//                   👤
//                 </div>
//               )}
//             </div>
//             <h1 className="font-bold text-2xl">{user.name}</h1>
//             <div className="mx-4 flex items-center gap-2 flex-wrap">
//               {user.groups
//                 .filter((group) => group.group_categories?.is_noteworthy)
//                 .map((group) => (
//                   <Badge key={group.id} variant={"secondary"}>
//                     {group.name}
//                   </Badge>
//                 ))}
//               {isAlumni && <Badge variant={"secondary"}>アラムナイ</Badge>}
//             </div>
//             {user.bio_tags && (
//               <div className="text-center max-w-sm mt-2 flex gap-1 flex-wrap-reverse flex-row-reverse justify-center text-sky-500">
//                 {user.bio_tags.reverse().map((tag, i) => (
//                   <p key={i}>#{tag}</p>
//                 ))}
//               </div>
//             )}
//           </section>
//           <Section icon="👋" title="Profile">
//             <ChipGroup>
//               {user.full_name && (
//                 <Chip icon="🪪" clickable={false}>
//                   {user.full_name}
//                 </Chip>
//               )}
//               {user.residential_histories.map((residential_history) => (
//                 <Chip key={residential_history.id} icon="👣" clickable={false}>
//                   {residential_history.move_in_date &&
//                     format(parseISO(residential_history.move_in_date), "y.M")}
//                   {" ~ "}
//                   {residential_history.move_out_date &&
//                     format(parseISO(residential_history.move_out_date), "y.M")}
//                 </Chip>
//               ))}
//               {user.post_number && (
//                 <Chip icon="📮" clickable={false}>
//                   {user.post_number}
//                 </Chip>
//               )}
//               {user.room_number && (
//                 <Chip icon="🛏️" clickable={false}>
//                   {user.room_number}
//                 </Chip>
//               )}
//               {user.date_of_birth && (
//                 <Chip icon="🎂" clickable={false}>
//                   {format(parseISO(user.date_of_birth), "MMM d, y")}
//                 </Chip>
//               )}
//               {user.badges
//                 .filter(
//                   (badge) => badge.category_id == BADGE_CATEGORY.SPOKEN_LANGUAGE
//                 )
//                 .map((badge) => (
//                   <Chip key={badge.id} icon={badge.emoji}>
//                     {badge.name}
//                   </Chip>
//                 ))}
//               {user.mbti && <Chip icon="🧩">{user.mbti.name}</Chip>}
//               {user.drinkings && <Chip icon="🍺">{user.drinkings.name}</Chip>}
//               {user.smokings && <Chip icon="🚬">{user.smokings.name}</Chip>}
//               {user.politics && <Chip icon="🗳️">{user.politics.name}</Chip>}
//               {user.religions && <Chip icon="🙏">{user.religions.name}</Chip>}
//             </ChipGroup>
//           </Section>
//           <Section icon="👥" title="Group">
//             {user.groups.length > 0 ? (
//               <div className="flex flex-col">
//                 {user.groups.map((group, i) => (
//                   <Fragment key={group.id}>
//                     {i > 0 && (
//                       <div className="flex gap-4">
//                         <div className="shrink-0 w-24" />
//                         <Separator className="shrink" />
//                       </div>
//                     )}
//                     <div className="flex gap-4 p-2 cursor-pointer rounded-lg overflow-hidden transition ease-in-out hover:bg-secondary">
//                       <div className="shrink-0 w-24 h-24 grid place-items-center">
//                         {group.image_url ? (
//                           <div className="aspect-square rounded-lg overflow-hidden w-full border-2 border-background">
//                             <Image
//                               src={group.image_url}
//                               fill
//                               alt="thumbnail"
//                               className="object-cover object-center"
//                             />
//                           </div>
//                         ) : (
//                           <div className="aspect-square rounded-lg overflow-hidden w-full border-2 border-background bg-secondary grid place-content-center text-2xl">
//                             👥
//                           </div>
//                         )}
//                       </div>
//                       <div className="grow flex flex-col justify-around">
//                         <div>
//                           <h3 className="font-bold text-lg/5 line-clamp-1">
//                             {group.full_name || group.name}
//                           </h3>
//                           {group.slack_channel && (
//                             <p className="text-sm text-muted-foreground line-clamp-1">
//                               #{group.slack_channel}
//                             </p>
//                           )}
//                         </div>
//                         <AvatarGroup max={5}>
//                           {group.users.map((member) => (
//                             <Avatar
//                               className="border-background border-2"
//                               key={member.id}
//                             >
//                               {member.avatar_url && (
//                                 <AvatarImage
//                                   src={member.avatar_url}
//                                   alt={member.name}
//                                   className="object-cover object-center"
//                                   width={300}
//                                   height={300}
//                                 />
//                               )}
//                               <AvatarFallback>
//                                 {member.name.substring(0, 1)}
//                               </AvatarFallback>
//                             </Avatar>
//                           ))}
//                         </AvatarGroup>
//                       </div>
//                     </div>
//                   </Fragment>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center">所属しているグループはありません。</p>
//             )}
//           </Section>
//           {images[0] && (
//             <Section className="mx-0 sm:mx-6 relative">
//               <div className="sm:overflow-hidden sm:rounded-lg ">
//                 <Image
//                   src={images[0].image_url}
//                   alt={images[0].caption || "image1"}
//                   width={images[0].width}
//                   height={images[0].height}
//                   className="object-cover object-center"
//                 />
//               </div>
//               <ReactionBar reactionId={images[0].reaction_id} />
//             </Section>
//           )}
//           {interests.length > 0 && (
//             <Section icon="🏄" title="Interests">
//               <ChipGroup>
//                 {interests.map((badge) => (
//                   <Chip key={badge.id} icon={badge.emoji}>
//                     {badge.name}
//                   </Chip>
//                 ))}
//               </ChipGroup>
//             </Section>
//           )}
//           {lifestages.length > 0 && (
//             <Section icon="👟" title="Lifestage">
//               <ChipGroup>
//                 {lifestages.map((badge) => (
//                   <Chip key={badge.id} icon={badge.emoji}>
//                     {badge.name}
//                   </Chip>
//                 ))}
//               </ChipGroup>
//             </Section>
//           )}
//           {college_skills.length > 0 && (
//             <Section icon="🍳" title="Skills">
//               <ChipGroup>
//                 {college_skills.map((badge) => (
//                   <Chip key={badge.id} icon={badge.emoji}>
//                     {badge.name}
//                   </Chip>
//                 ))}
//               </ChipGroup>
//             </Section>
//           )}
//           {images[1] && (
//             <Section className="mx-0 sm:mx-6 relative">
//               <div className="sm:overflow-hidden sm:rounded-lg">
//                 <Image
//                   src={images[1].image_url}
//                   alt={images[1].caption || "image2"}
//                   width={images[1].width}
//                   height={images[1].height}
//                   className="object-cover object-center"
//                 />
//               </div>
//               <ReactionBar reactionId={images[0].reaction_id} />
//             </Section>
//           )}
//           {user.educations && (
//             <Section icon="🎓" title="Education">
//               <HistoryGroup>
//                 {user.educations
//                   .sort((a, b) => {
//                     if (
//                       parseISO(a.graduation_date) < parseISO(b.graduation_date)
//                     )
//                       return -1;
//                     if (
//                       parseISO(a.graduation_date) > parseISO(b.graduation_date)
//                     )
//                       return 1;
//                     return 0;
//                   })
//                   .map((education) => (
//                     <History
//                       key={education.school_id}
//                       title={education.schools!.name}
//                       description={education.faculty ?? undefined}
//                       items={education.activities_and_societies ?? undefined}
//                       timestamp={
//                         parseISO(education.graduation_date) < new Date()
//                           ? format(parseISO(education.graduation_date), "y")
//                           : "現在"
//                       }
//                       avatar={
//                         <AvatarGroup max={5}>
//                           {education.schools?.users.map((member) => (
//                             <Avatar
//                               className="border-background border-2"
//                               key={member.id}
//                             >
//                               {member.avatar_url && (
//                                 <AvatarImage
//                                   src={member.avatar_url}
//                                   alt={member.name}
//                                   className="object-cover"
//                                   width={300}
//                                   height={300}
//                                 />
//                               )}
//                               <AvatarFallback>
//                                 {member.name.substring(0, 1)}
//                               </AvatarFallback>
//                             </Avatar>
//                           ))}
//                         </AvatarGroup>
//                       }
//                     />
//                   ))}
//               </HistoryGroup>
//             </Section>
//           )}
//           {user.experiences && (
//             <Section icon="💼" title="Experience">
//               <HistoryGroup>
//                 {user.experiences
//                   .sort((a, b) => {
//                     if (parseISO(a.start_date) < parseISO(b.start_date))
//                       return -1;
//                     if (parseISO(a.start_date) > parseISO(b.start_date))
//                       return 1;
//                     return 0;
//                   })
//                   .map((experience) => (
//                     <History
//                       key={experience.company_id}
//                       title={experience.companies!.name}
//                       description={experience.position}
//                       timestamp={`${format(
//                         parseISO(experience.start_date),
//                         "y.M"
//                       )} ~ ${
//                         experience.end_date
//                           ? format(parseISO(experience.end_date), "y.M")
//                           : "現在"
//                       } (${formatDuration(
//                         intervalToDuration({
//                           start: parseISO(experience.start_date),
//                           end: experience.end_date
//                             ? parseISO(experience.end_date)
//                             : new Date(),
//                         }),
//                         { locale: ja, format: ["years", "months"] }
//                       ).replace(/ /g, "")})`}
//                       items={experience.projects_and_skills ?? undefined}
//                       avatar={
//                         <AvatarGroup max={5}>
//                           {experience.companies?.users.map((member) => (
//                             <Avatar
//                               className="border-background border-2"
//                               key={member.id}
//                             >
//                               {member.avatar_url && (
//                                 <AvatarImage
//                                   src={member.avatar_url}
//                                   alt={member.name}
//                                   className="object-cover"
//                                   width={300}
//                                   height={300}
//                                 />
//                               )}
//                               <AvatarFallback>
//                                 {member.name.substring(0, 1)}
//                               </AvatarFallback>
//                             </Avatar>
//                           ))}
//                         </AvatarGroup>
//                       }
//                     />
//                   ))}
//               </HistoryGroup>
//             </Section>
//           )}
//           {images[2] && (
//             <Section className="mx-0 sm:mx-6 relative">
//               <div className="sm:overflow-hidden sm:rounded-lg">
//                 <Image
//                   src={images[2].image_url}
//                   alt={images[2].caption || "image3"}
//                   width={images[2].width}
//                   height={images[2].height}
//                   className="object-cover object-center"
//                 />
//               </div>
//               <ReactionBar reactionId={images[0].reaction_id} />
//             </Section>
//           )}
//           {notableAnswers.length > 0 && (
//             <Section icon="💬" title="Q&A">
//               <div className="flex flex-col gap-16">
//                 {notableAnswers
//                   .sort((a, b) => {
//                     if (parseISO(a.answered_at) < parseISO(b.answered_at))
//                       return -1;
//                     if (parseISO(a.answered_at) > parseISO(b.answered_at))
//                       return 1;
//                     return 0;
//                   })
//                   .map((answer) => (
//                     <div
//                       key={answer.question_id}
//                       className="flex flex-col gap-4 relative mb-4"
//                     >
//                       <div className="grid place-items-center">
//                         <span className="text-xs rounded-full py-1 px-2 bg-muted text-muted-foreground">
//                           {intlFormatDistance(
//                             parseISO(answer.answered_at),
//                             new Date(),
//                             { locale: "ja" }
//                           ).replace(/ /g, "")}{" "}
//                           {format(parseISO(answer.answered_at), "H:mm")}
//                         </span>
//                       </div>
//                       <div className="flex flex-col gap-2">
//                         <Message left={false}>
//                           <Bubble left={false}>{answer.questions!.body}</Bubble>
//                         </Message>
//                         {answer.body && (
//                           <Message>
//                             <Avatar>
//                               <AvatarImage
//                                 src={user.avatar_url || undefined}
//                                 alt={user.name}
//                                 className="object-cover object-center"
//                                 width={300}
//                                 height={300}
//                               />
//                               <AvatarFallback>
//                                 {user.name.substring(0, 1)}
//                               </AvatarFallback>
//                             </Avatar>
//                             <Bubble>{answer.body}</Bubble>
//                           </Message>
//                         )}
//                       </div>
//                       <ReactionBar reactionId={answer.reaction_id} />
//                     </div>
//                   ))}
//               </div>
//             </Section>
//           )}

//           {images[3] && (
//             <Section className="mx-0 sm:mx-6 relative">
//               <div className="sm:overflow-hidden sm:rounded-lg">
//                 <Image
//                   src={images[3].image_url}
//                   alt={images[3].caption || "image4"}
//                   width={images[3].width}
//                   height={images[3].height}
//                   className="object-cover object-center"
//                 />
//               </div>
//               <ReactionBar reactionId={images[0].reaction_id} />
//             </Section>
//           )}
//           <Section icon="✉️" title="Contacts">
//             <ChipGroup>
//               {user.email && (
//                 <Link href={`mailto:${user.email}`}>
//                   <Chip icon={<Mail size={16} />}>
//                     <span className="text-sky-500">{user.email}</span>
//                   </Chip>
//                 </Link>
//               )}
//               {user.website && (
//                 <Link
//                   href={user.website}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <Chip icon={<Globe size={16} />}>
//                     <span className="text-sky-500">{user.website}</span>
//                   </Chip>
//                 </Link>
//               )}
//               {user.twitter && (
//                 <Link
//                   href={`https://twitter.com/${user.twitter}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <Chip icon={<Twitter size={16} />}>
//                     <span className="text-sky-500">{user.twitter}</span>
//                   </Chip>
//                 </Link>
//               )}
//               {user.instagram && (
//                 <Link
//                   href={`https://www.instagram.com/${user.instagram}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <Chip icon={<Instagram size={16} />}>
//                     <span className="text-sky-500">{user.instagram}</span>
//                   </Chip>
//                 </Link>
//               )}
//               {user.facebook && (
//                 <Link
//                   href={`https://www.facebook.com/${user.facebook}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <Chip icon={<Facebook size={16} />}>
//                     <span className="text-sky-500">{user.facebook}</span>
//                   </Chip>
//                 </Link>
//               )}
//               {user.linkedin && (
//                 <Link
//                   href={`https://www.linkedin.com/in/${user.linkedin}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <Chip icon={<Linkedin size={16} />}>
//                     <span className="text-sky-500">{user.linkedin}</span>
//                   </Chip>
//                 </Link>
//               )}
//               {user.paypay && (
//                 <Chip
//                   icon={
//                     <Image
//                       src="/paypay.png"
//                       alt="PayPay Logo"
//                       width={180}
//                       height={180}
//                     />
//                   }
//                   clickable={false}
//                 >
//                   {user.paypay}
//                 </Chip>
//               )}
//             </ChipGroup>
//           </Section>

//           <div className="mx-6 text-muted-foreground text-sm text-center">
//             {formatDistanceToNow(parseISO(user.updated_at || user.created_at), {
//               locale: ja,
//               addSuffix: true,
//             })}
//             に更新
//           </div>
//         </article>
//         <Separator className="my-8" />
//         <Section icon="👀" title="もっと見る">
//           <div className="my-16 grid place-items-center">工事中🚧</div>
//         </Section>
//       </div>
//       <footer className="mt-16 grid place-content-center text-sm text-muted-foreground py-8">
//         &#169; College App
//       </footer>
//     </div>
//   );
// }

// interface SectionProps extends HTMLAttributes<HTMLDivElement> {
//   icon?: string;
//   title?: string;
//   cta?: React.ReactNode;
// }

// function Section({
//   icon,
//   title,
//   cta,
//   children,
//   className,
//   ...props
// }: SectionProps) {
//   return (
//     <section className={cn("mx-6", className)} {...props}>
//       {(icon || title || cta) && (
//         <div className="flex justify-between items-center mb-4">
//           <div className="font-black text-2xl flex gap-2">
//             {icon && <span>{icon}</span>}
//             {title && <h2>{title}</h2>}
//           </div>
//           {cta && <div>{cta}</div>}
//         </div>
//       )}
//       {/* {title ? <FadeIn>{children}</FadeIn> : children} */}
//       {children}
//     </section>
//   );
// }
