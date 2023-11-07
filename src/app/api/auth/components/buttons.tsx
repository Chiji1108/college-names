"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

// ログインボタン
export const LoginButton = () => {
  return (
    <Button variant={"default"} onClick={() => signIn()}>
      Sign in
    </Button>
  );
};

// ログアウトボタン
export const LogoutButton = () => {
  return (
    <Button variant={"secondary"} onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};
