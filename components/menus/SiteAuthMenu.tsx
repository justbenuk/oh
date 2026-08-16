"use client";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";

export default function SiteAuthMenu() {
  const { data: user } = authClient.useSession();

  if (!user?.user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" variant={"ghost"}>
          <Avatar className="h-8 w-8 rounded-lg dark:grayscale">
            <AvatarImage src={user?.user.image as string} />
            <AvatarFallback className="bg-primary">OH</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" side="bottom" align="end" sideOffset={4}>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.user.image as string} alt={user.user?.name} />
              <AvatarFallback className="rounded-lg">OH</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.user.name}</span>
              <span className="truncate text-xs text-muted-foreground">{user.user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/dashboard"}>
              <LayoutDashboardIcon />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
