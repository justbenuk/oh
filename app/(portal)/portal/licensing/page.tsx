import type { Metadata } from 'next';
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import AllAuthoritiesList from '@/features/directory/components/AllAuthoritiesList';

export const metadata: Metadata = {
  title: 'Licensing Authority'
};

export default function LicensingPage() {
  return <PageContainer size="dashboard">
    <div className='grid gap-6'>
      <div className="flex flex-row items-center justify-end">
        <Button asChild>
          <Link href="/portal/licensing/new">
            <PlusIcon />
            <span>New License Authority</span>
          </Link>
        </Button>
      </div>
      <AllAuthoritiesList />
    </div>
  </PageContainer>;
}
