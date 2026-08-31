"use client";
import TableContainer from "@/components/tables/TableContainer";
import { DirectoryCategory } from "@prisma/client";
import { ColDef } from "ag-grid-community";
export default function CategoriesTable({
  categories,
}: {
  categories: DirectoryCategory[];
}) {
  const columnDefs: ColDef<DirectoryCategory>[] = [
    {
      field: "image",
    },
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "slug",
      headerName: "Slug",
    },
    {
      field: "description",
      headerName: "Description",
    },
    {
      headerName: "Actions",
    },
  ];

  return <TableContainer columns={columnDefs} data={categories} />;
}
