import type { Metadata } from "next";
import AllDirectoryCategoriesList from "@/features/directory/components/AllDirectoryCategoriesList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Directory Categories",
};

export default function page() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-row items-center justify-end">
        <Button asChild>
          <Link href={"/portal/directory/categories/new"}>
            <PlusIcon />
            <span>Add New Category</span>
          </Link>
        </Button>
      </div>
      <AllDirectoryCategoriesList />
    </div>
  );
}
