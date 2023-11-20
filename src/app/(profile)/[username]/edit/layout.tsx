import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getUserId } from "../../get-userId-by-username";
import { container } from "@/styles/layouts";
import { BackButton } from "./back-button";
import { Toaster } from "react-hot-toast";

export default async function EditLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const { username } = params;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();
  if (!currentUser) redirect("/login");

  const { data: user } = await getUserId({ username });
  if (!user) notFound();
  // access denied
  if (user.id !== currentUser.id) redirect("/login");
  //TODO: add admin check

  return (
    <section className={container}>
      {children}
      <Toaster />
    </section>
  );
}
