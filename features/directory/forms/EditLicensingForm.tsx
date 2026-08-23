import type { Licensing } from "@prisma/client";
import LicensingForm from "./LicensingForm";

type EditLicensingFormProps = {
  authority: Licensing;
};

export default function EditLicensingForm({ authority }: EditLicensingFormProps) {
  return <LicensingForm mode="edit" authority={authority} />;
}
