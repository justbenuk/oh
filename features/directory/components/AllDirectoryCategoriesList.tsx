import ErrorCard from "@/components/ErrorCard";
import { FetchAllDirectoryCategories } from "../DirectoryActions";
import CategoriesTable from "../tables/CategoriesTable";

export default async function AllDirectoryCategoriesList() {
  const categories = await FetchAllDirectoryCategories();

  if (!categories.data)
    return (
      <ErrorCard
        title="Sorry! Something went wrong"
        description="Failed to load categories"
      />
    );

  return <CategoriesTable categories={categories.data} />;
}
