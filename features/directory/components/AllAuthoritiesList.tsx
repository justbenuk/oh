"use client";

import { Licensing } from "@prisma/client";
import { useEffect, useState } from "react";
import { FetchAllLicensingAuthorities } from "../DirectoryActions";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import ErrorCard from "@/components/ErrorCard";
import AuthoritiesTable from "../tables/AuthoritiesTable";

export default function AllAuthoritiesList() {
  const [authorities, setAuthorities] = useState<Licensing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const response = await FetchAllLicensingAuthorities();

      if (response.success && response.data) {
        setAuthorities(response.data);
      } else {
        setError("Failed to load data");
      }
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) return <TableSkeleton />;
  if (error)
    return (
      <ErrorCard title="Sorry! Something Went Wrong" description={error} />
    );

  return <AuthoritiesTable authorities={authorities} />;
}
