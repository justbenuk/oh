"use client";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { DeleteAuthorityById } from "../DirectoryActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteAuthorityForm({ id }: { id: string }) {
  const router = useRouter();
  async function handleDelete() {
    const response = await DeleteAuthorityById(id);

    if (!response) {
      toast.error("Failed to delete authority");
    } else {
      toast.success("Authority Deleted");
      router.refresh();
      return;
    }
  }

  return (
    <form onSubmit={handleDelete}>
      <Button variant="ghost" size="icon" className="text-red-500">
        <TrashIcon />
      </Button>
    </form>
  );
}
