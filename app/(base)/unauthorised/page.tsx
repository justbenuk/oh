import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function UnauthorisedPage() {
  return (
    <main className="grid min-h-[60vh] place-items-center px-6 text-center">
      <div className="grid gap-4">
        <h1 className="text-2xl font-semibold">Access denied</h1>
        <p className="text-muted-foreground">
          You need an administrator account to view this page.
        </p>
        <Button asChild>
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </main>
  );
}
