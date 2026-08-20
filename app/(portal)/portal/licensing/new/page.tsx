import type { Metadata } from 'next';
import PageContainer from "@/components/PageContainer";
import AddLicensingForm from "@/features/directory/forms/AddLicensingForm";

export const metadata: Metadata = {
  title: 'New License Authority',
};

export default function NewLicensingPage() {
  return <PageContainer size="dashboard">
    <AddLicensingForm />
  </PageContainer>;
}
