import { FetchDirectoryCategoryById } from "@/features/directory/DirectoryActions";
import EditDirectoryCategoryForm from "@/features/directory/forms/EditDirectoryCategoryForm";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCategoryPage({ params }: Props) {
  const id = await params;

  const category = await FetchDirectoryCategoryById(id);
  if (!category) return notFound();

  return <EditDirectoryCategoryForm category={category} />;
}
