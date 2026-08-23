import { FetchSingleLicensingActionById } from "@/features/directory/DirectoryActions";
import EditLicensingForm from "@/features/directory/forms/EditLicensingForm";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function LicensingSinglePage({ params }: Props) {
  const id = await params;

  const authority = await FetchSingleLicensingActionById(id);
  if (!authority) return notFound();

  return (
    <div>
      <EditLicensingForm authority={authority} />
    </div>
  );
}
