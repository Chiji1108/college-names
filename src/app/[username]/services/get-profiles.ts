import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const revalidate = 3600;

export const getProfiles = cache(async () => {
  return await prisma.profiles.findMany({});
});
