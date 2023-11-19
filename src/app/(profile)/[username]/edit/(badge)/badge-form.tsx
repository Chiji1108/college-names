"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Database } from "@/lib/supabase/database.types";
import { CategoriesWithBadges } from "./get-categories";
import Section from "../../section";
import { Chip, ChipGroup } from "@/components/chip";
import { useCallback, useOptimistic, useState } from "react";
import { BackButton } from "../back-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toggleBadge } from "./actions";
import toast from "react-hot-toast";

export default function BadgeForm({
  initialBadgeIds,
  categories,
  username,
}: {
  initialBadgeIds: number[];
  categories: CategoriesWithBadges;
  username: string;
}) {
  const toggleBadgeWithUsername = toggleBadge.bind(null, username);
  const [optimisticBadgeIds, toggleOptimisticBadgeIds] = useOptimistic(
    initialBadgeIds,
    (state, newBadgeId: number) => {
      console.log(newBadgeId);
      return state.includes(newBadgeId)
        ? state.filter((badgeId) => badgeId !== newBadgeId)
        : [...state, newBadgeId];
    }
  );

  const defaultValue = categories
    .filter((category) =>
      category.badges.some((badge) => optimisticBadgeIds.includes(badge.id))
    )
    .map((category) => category.name);

  const selectable = optimisticBadgeIds.length < 5;

  return (
    <div className="relative mb-12">
      <header className="grid place-items-center h-16 sticky top-0 bg-background/50 backdrop-blur z-10">
        <h1 className="font-bold">{optimisticBadgeIds.length} / 5 </h1>
        <div className="inset-y-0 right-0 mx-2 absolute grid place-items-center">
          <BackButton>完了</BackButton>
        </div>
      </header>
      {/* <div className="mt-16" /> */}
      <Accordion
        type="multiple"
        // collapsible
        className="mx-6"
        defaultValue={defaultValue}
      >
        {categories.map((category) => {
          return (
            <AccordionItem value={category.name} key={category.id}>
              <AccordionTrigger>{category.name}</AccordionTrigger>
              <AccordionContent>
                <ChipGroup>
                  {category.badges.map((badge) => (
                    <Chip
                      key={badge.id}
                      icon={badge.emoji}
                      selected={optimisticBadgeIds.includes(badge.id)}
                      disabled={
                        !optimisticBadgeIds.includes(badge.id) && !selectable
                      }
                      onClick={() => {
                        toggleOptimisticBadgeIds(badge.id);
                        const myPromise = toggleBadgeWithUsername(badge.id);
                        toast.promise(myPromise, {
                          loading: "更新中...",
                          success: "更新しました",
                          error: "更新できませんでした",
                        });
                      }}
                    >
                      {badge.name}
                    </Chip>
                  ))}
                </ChipGroup>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
