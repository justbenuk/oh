import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Search Bar / Actions Row Placeholder */}
      <div className="flex items-center justify-between py-4">
        <Skeleton className="h-10 w-62.5" /> {/* Search Input */}
        <Skeleton className="h-10 w-25" /> {/* Filter/Action Button */}
      </div>

      {/* Table Border Outline */}
      <div className="rounded-md border border-muted">
        {/* Table Header Wrapper */}
        <div className="grid grid-cols-4 gap-4 border-b border-muted bg-muted/40 px-6 py-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-30" />
          <Skeleton className="h-4 w-25" />
          <Skeleton className="h-4 w-15 justify-self-end" />
        </div>

        {/* Table Body Rows (Generating 5 skeleton rows) */}
        <div className="divide-y divide-muted">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 px-6 py-4 items-center"
            >
              {/* Column 1: Maybe an Avatar + Name or ID */}
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                <Skeleton className="h-4 w-25" />
              </div>

              {/* Column 2: Email or Text */}
              <Skeleton className="h-4 w-35" />

              {/* Column 3: Status Badge or Date */}
              <Skeleton className="h-5 w-17.5 rounded-full" />

              {/* Column 4: Action Menu Button (three dots) */}
              <Skeleton className="h-8 w-8 rounded-md justify-self-end" />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Footer Placeholder */}
      <div className="flex items-center justify-between px-2 py-4">
        <Skeleton className="h-4 w-37.5" /> {/* "Showing 0 of 00 rows" text */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-17.5" /> {/* Previous button */}
          <Skeleton className="h-8 w-12.5" /> {/* Next button */}
        </div>
      </div>
    </div>
  );
}
