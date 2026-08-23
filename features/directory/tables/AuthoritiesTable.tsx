import { Licensing } from "@prisma/client";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import TableContainer from "@/components/tables/TableContainer";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EditIcon, EyeIcon } from "lucide-react";
import DeleteAuthorityForm from "../forms/DeleteAuthorityForm";

export default function AuthoritiesTable({
  authorities,
}: {
  authorities: Licensing[];
}) {
  const columnDefs: ColDef<Licensing>[] = [
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
          <div>
            <Button asChild variant={"ghost"} size={"icon"}>
              <Link href={`/licensing/${row.data.slug}`}>
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
              <Link href={`/portal/licensing/${row.data.id}`}>
                <EditIcon />
              </Link>
            </Button>
          </div>
          <div>
            <DeleteAuthorityForm id={row.data.id} />
          </div>
        </div>
      ),
    },
  ];

  return <TableContainer data={authorities} columns={columnDefs} />;
}
