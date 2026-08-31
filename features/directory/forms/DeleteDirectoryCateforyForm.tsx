import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { DeleteDirectoryCategoreyById } from "../DirectoryActions";

export default function DeleteDirectoryCateforyForm({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        await DeleteDirectoryCategoreyById(id);
      }}
    >
      <Button
        variant={"ghost"}
        size={"icon"}
        className="text-red-500"
        type="submit"
      >
        <TrashIcon />
      </Button>
    </form>
  );
}
