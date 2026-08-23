"use client";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { DeleteAuthorityById } from "../DirectoryActions";

export default function DeleteAuthorityForm({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        await DeleteAuthorityById(id);
      }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="text-red-500"
        type="submit"
      >
        <TrashIcon />
      </Button>
    </form>
  );
}
