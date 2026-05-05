"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export function LoginButton() {
  return (
    <Button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
      Continue with Google
    </Button>
  );
}
