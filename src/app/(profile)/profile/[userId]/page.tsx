import { getUsername } from "@/app/api/fetcher/get-username";
import { notFound, redirect } from "next/navigation";

export const revalidate = 3600;

// export async function generateStaticParams() {
//   const userIds = await getUserIds();
//   return userIds.map((userId) => ({ userId }));
// }

export default async function Page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const username = await getUsername({ userId });
  if (!username) notFound();
  redirect(`/${username}`);
}
