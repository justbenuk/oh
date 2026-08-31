"use client";
import TableContainer from "@/components/tables/TableContainer";
import { Button } from "@/components/ui/button";
import { DirectoryCategory } from "@prisma/client";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { EditIcon, EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteDirectoryCateforyForm from "../forms/DeleteDirectoryCateforyForm";
export default function CategoriesTable({
  categories,
}: {
  categories: DirectoryCategory[];
}) {
  const columnDefs: ColDef<DirectoryCategory>[] = [
    {
      field: "image",
      headerName: "Image",
      cellRenderer: (row: ICellRendererParams) => (
        <Image
          src={row.data.image}
          alt="category image"
          width={75}
          height={75}
        />
      ),
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
      cellRenderer: (row: ICellRendererParams) => (
        <div className="flex flex-row items-center gap-0.5">
          <div>
            <Button asChild variant={"ghost"} size={"icon"}>
              <Link href={`/directory/categories/${row.data.slug}`}>
                <EyeIcon />
              </Link>
            </Button>
          </div>
          <div>
            <Button
              asChild
              variant={"ghost"}
              size={"icon"}
              className=" text-yellow-500"
            >
              <Link href={`/portal/directory/categories/${row.data.id}`}>
                <EditIcon />
              </Link>
            </Button>
          </div>
          <div>
            <DeleteDirectoryCateforyForm id={row.data.id} />
          </div>
        </div>
      ),
    },
  ];

  return <TableContainer columns={columnDefs} data={categories} />;
}
