import { getSession } from "@/lib/session";
import { Button } from "../ui/button";
import Link from "next/link";
import { CarTaxiFront, PlusIcon } from "lucide-react";
import SiteAuthMenu from "./SiteAuthMenu";

export default async function SiteLoggedInMenu() {
  const session = await getSession();
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
        <SiteAuthMenu user={session.user} />
      )}
    </div>
  );
}
