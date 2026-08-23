"use client";

import { Licensing } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { FetchAllLicensingAuthorities } from "../DirectoryActions";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import ErrorCard from "@/components/ErrorCard";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import TableContainer from "@/components/tables/TableContainer";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EditIcon, EyeIcon, TrashIcon } from "lucide-react";

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

  const columnDefs = useMemo<ColDef<Licensing>[]>(
    () => [
      {
        field: "logo",
        headerName: "Image",
        cellRenderer: (row: ICellRendererParams) => (
          <div className="flex h-full items-center">
            <Avatar>
              <AvatarImage src={row.value} alt="profile pic" />
            </Avatar>
          </div>
        ),
      },
      {
        field: "name",
        headerName: "Name",
      },
      {
        field: "email",
        headerName: "Email",
      },
      {
        field: "contactNumber",
        headerName: "Contact Number",
      },
      {
        field: "websiteUrl",
        headerName: "URL",
        cellRenderer: (row: ICellRendererParams) => (
          <Link href={row.data.websiteUrl} target="_blank">
            {row.data.websiteUrl}
          </Link>
        ),
      },
      {
        headerName: "Actions",
        cellRenderer: (row: ICellRendererParams) => (
          <div className="flex flex-row items-center gap-0.5">
            <Button asChild variant={"ghost"} size={"icon"}>
              <Link href={`/licensing/${row.data.slug}`}>
                <EyeIcon />
              </Link>
            </Button>
            <Button
              asChild
              variant={"ghost"}
              size={"icon"}
              className=" text-yellow-500"
            >
              <Link href={`/portal/licensing/${row.data.id}`}>
                <EditIcon />
              </Link>
            </Button>
            <Button asChild variant={"ghost"} size={"icon"} className="text-red-500">
              <Link href={`/licensing/${row.data.slug}`}>
                <TrashIcon />
              </Link>
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  if (loading) return <TableSkeleton />;
  if (error)
    return (
      <ErrorCard title="Sorry! Something Went Wrong" description={error} />
    );

  return <TableContainer data={authorities} columns={columnDefs}/>;
}
