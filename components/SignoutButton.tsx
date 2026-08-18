"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LockIcon } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export default function SignoutButton() {
  const router = useRouter();

  async function handleSignout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/");
          router.refresh();
        },
      },
    });
  }
  return (
    <DropdownMenuItem asChild variant="destructive">
      <Button type="button" onClick={handleSignout} variant={"ghost"} className="w-full flex flex-row items-start justify-start">
        <LockIcon />
        <span>Logout</span>
      </Button>
    </DropdownMenuItem>
  );
}
