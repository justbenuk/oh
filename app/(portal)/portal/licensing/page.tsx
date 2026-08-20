import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function LicensingPage() {
  return <PageContainer size="dashboard">
    <div className="flex flex-row items-center justify-end">
      <Button asChild>
        <Link href="/portal/licensing/new">
          <PlusIcon />
          <span>New License Authority</span>
        </Link>
      </Button>
    </div>
  </PageContainer>;
}
