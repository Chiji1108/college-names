import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const revalidate = 300;

export const getProfile = cache(async (username: string) => {
  return await prisma.profiles.findUnique({
    where: { username },
    include: {
      users: true,
      profiles_groups: {
        include: {
          groups: {
            include: {
              profiles_groups: {
                include: {
                  profiles: true,
                },
              },
              group_categories: true,
            },
          },
        },
      },
      residence_histories: true,
      educations: {
        include: {
          schools: {
            include: {
              educations: {
                include: {
                  profiles: true,
                },
              },
            },
          },
        },
      },
      experiences: {
        include: {
          companies: {
            include: {
              experiences: {
                include: {
                  profiles: true,
                },
              },
            },
          },
        },
      },
      profiles_badges: {
        include: {
          badges: {
            include: {
              badge_categories: true,
            },
          },
        },
      },
      profiles_contacts: true,
    },
  });
});
