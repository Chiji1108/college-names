"use server";

import { getRevalidateTags } from "@/app/(profile)/get-profile-by-username";
import { createClient } from "@/lib/supabase/server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { nanoid } from "nanoid";
import { getUsername } from "../../profile/[userId]/get-username-by-userId";

const bucketName = "avatars";

export async function updateAvatar(userId: string, fileName: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // update avatar_url
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName).getPublicUrl(`${userId}/${fileName}`);
  const { error } = await supabase
    .from("users")
    .update({ avatar_url: publicUrl })
    .eq("id", userId);
  if (error) throw error;

  // remove old avatars
  const { data } = await supabase.storage.from(bucketName).list(userId);
  const files = data!
    .filter((file) => file.name !== fileName)
    .map((file) => `${userId}/${file.name}`);
  if (files.length > 0) {
    const { error } = await supabase.storage.from(bucketName).remove(files);
    if (error) throw error;
  }

  // revalidate profile
  const { data: user } = await getUsername({ userId });
  if (!user) throw new Error("User not found");
  getRevalidateTags(user.username).forEach((tag) => revalidateTag(tag));
}

export async function updateName(userId: string, name: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase
    .from("users")
    .update({ name })
    .eq("id", userId);
  if (error) throw error;

  // revalidate profile
  const { data: user } = await getUsername({ userId });
  if (!user) throw new Error("User not found");
  getRevalidateTags(user.username).forEach((tag) => revalidateTag(tag));
}

export async function updateBioTags(username: string, bioTags: string[]) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  console.log(bioTags);
  const { error } = await supabase
    .from("users")
    .update({ bio_tags: bioTags })
    .eq("username", username);
  if (error) throw error;

  getRevalidateTags(username).forEach((tag) => revalidateTag(tag));
}
