import { DirectoryCategory } from "@prisma/client";
import DirectoryCategoryForm from "./DirectoryCategoryForm";

interface EditCategoryProps {
  category: DirectoryCategory;
}

export default function EditDirectoryCategoryForm({
  category,
}: EditCategoryProps) {
  return <DirectoryCategoryForm category={category} mode="edit" />;
}
