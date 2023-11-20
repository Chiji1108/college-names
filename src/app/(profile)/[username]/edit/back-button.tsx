"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function BackButton({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  return (
    <Button variant={"ghost"} onClick={() => router.back()}>
      {children ?? "戻る"}
    </Button>
  );
}
