'use client'

import { Licensing } from "@prisma/client"
import { useEffect, useMemo, useState } from "react"
import { FetchAllLicensingAuthorities } from "../DirectoryActions"
import TableSkeleton from "@/components/skeletons/TableSkeleton"
import ErrorCard from "@/components/ErrorCard"
import {ColDef, ICellRendererParams} from "ag-grid-community";
import TableContainer from "@/components/tables/TableContainer"
import Image from 'next/image'
import Link from "next/link"

export default function AllAuthoritiesList() {
  const [authorities, setAuthorities] = useState<Licensing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>()

  useEffect(() => {
    async function loadData(){
      setLoading(true)
      const response = await FetchAllLicensingAuthorities()

      if(response.success && response.data){
        setAuthorities(response.data)
      } else {
        setError('Failed to load data')
      }
      setLoading(false)
    }
    loadData()
  }, [])

  
  const columnDefs  = useMemo<ColDef<Licensing>[]>(
    () => [
            {
        field: "logo",
        headerName: "Image",
        cellRenderer: (row: ICellRendererParams) => (
          <div className="flex h-full items-center">
            <Image
              src={row.value}
              alt="profile pic"
              width={30}
              height={30}
              className="rounded-full h-6 w-6"
            />
          </div>
        ),
      },
    {
      field: 'name',
        headerName: 'Name'
    },
      {
        field: 'email',
        headerName: 'Email'
      },
      { 
        field: 'contactNumber',
        headerName: 'Contact Number'
      },{
        field: 'websiteUrl',
        headerName: 'URL',
        cellRenderer: (row: ICellRendererParams) => <Link href={row.data.websiteUrl} target="_blank">{row.data.websiteUrl}</Link>
      },{
        headerName: 'Actions'
      }
  ],
    []
  )

if(loading) return <TableSkeleton />
  if(error) return <ErrorCard title="Sorry! Something Went Wrong" description={error}/>


  return (
    <TableContainer data={authorities} columns={columnDefs}/>
  )
}

