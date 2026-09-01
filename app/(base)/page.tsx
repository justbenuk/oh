import PageContainer from "@/components/PageContainer";
import HomeAllDirectoryCategoriesList from "@/features/directory/components/HomeAllDirectoryCategoriesList";
import { FetchAllDirectoryCategories } from "@/features/directory/DirectoryActions";

export default async function Home() {
  const [directoryCategories] = await Promise.all([
    FetchAllDirectoryCategories(6),
  ]);

  return (
    <PageContainer>
      <HomeAllDirectoryCategoriesList categories={directoryCategories.data} />
    </PageContainer>
  );
}
