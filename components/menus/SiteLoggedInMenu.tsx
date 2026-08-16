import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "../ui/button";
import Link from "next/link";
import { CarTaxiFront, PlusIcon } from "lucide-react";
import SiteAuthMenu from "./SiteAuthMenu";

export default async function SiteLoggedInMenu() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="flex flex-row gap-3">
      {!session?.user ? (
        <div className="flex flex-row items-center justify-center gap-3">
          <Button asChild variant={"secondary"}>
            <Link href={"/register"}>
              <PlusIcon />
              <span>New Listing</span>
            </Link>
          </Button>
          <Button asChild>
            <Link href={"/login"}>
              <CarTaxiFront />
              <span>Operator Login</span>
            </Link>
          </Button>
        </div>
      ) : (
        <SiteAuthMenu />
      )}
    </div>
  );
}
