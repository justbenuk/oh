import ErrorCard from "@/components/ErrorCard";
import { FetchAllLicensingAuthorities } from "../DirectoryActions";
import AuthoritiesTable from "../tables/AuthoritiesTable";

export default async function AllAuthoritiesList() {
  const authorities = await FetchAllLicensingAuthorities();

  if (!authorities.data)
    return (
      <ErrorCard
        title="Something Went Wrong"
        description="We failed to load the data"
      />
    );

  return <AuthoritiesTable authorities={authorities.data} />;
}
