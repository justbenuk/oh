'use client'
import {
  AllCommunityModule,
  themeQuartz,
  type ColDef,
} from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import TableSearch from "./TableSearch";
import { useState } from "react";

type TableRow = {
  id: string | number;
};

type TableContainerProps<TData extends TableRow> = {
  data: TData[];
  columns: ColDef<TData>[];
};

export default function TableContainer<TData extends TableRow>({
  data,
  columns,
}: TableContainerProps<TData>) {

   const modules = [AllCommunityModule];
  const [search, setSearch] = useState("");

  const defaultColDef: ColDef<TData> = {
    sortable: true,
    filter: true,
  };

  const myTheme = themeQuartz.withParams({
    backgroundColor: "var(--background)",
    foregroundColor: "var(--foreground)",
    borderColor: "var(--border)",
    headerBackgroundColor: "var(--muted)",
    borderRadius: "0px"
  });

  return (
        <AgGridProvider modules={modules}>
      <div className="grid gap-6">
        <div className="flex flex-row items-end-end md:w-1/2">
          <TableSearch
            title="Search users..."
            search={search}
            setSearch={setSearch}
          />
        </div>
        <AgGridReact<TData>
          quickFilterText={search}
          defaultColDef={defaultColDef}
          domLayout="autoHeight"
          theme={myTheme}
          rowData={data}
          columnDefs={columns}
          getRowId={(row) => String(row.data.id)}
          pagination={true}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          paginationPageSize={10}
          autoSizeStrategy={{
            type: "fitGridWidth",
          }}
        />
      </div>
    </AgGridProvider>  )
}
