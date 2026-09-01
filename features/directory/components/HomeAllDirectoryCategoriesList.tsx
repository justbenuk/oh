import { Spinner } from "@/components/ui/spinner";
import { DirectoryCategory } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function HomeAllDirectoryCategoriesList({
  categories,
}: {
  categories: DirectoryCategory[];
}) {
  if (!categories)
    return (
      <div className="flex flex-row justify-center items-center">
        <Spinner className="size-8 text-primary" />
      </div>
    );
  return (
    <div className="grid gap-2">
      <div className="space-y-4">
        <div className="flex flex-row items-center justify-between">
          <span className="font-semibold text-sm">Vehicle Categories</span>
          <Link href={"/directory/categories"} className="underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              href={`/directory/categories/${cat.slug}`}
              key={cat.id}
              className="border rounded-xl"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={500}
                  height={300}
                  className="aspect-square w-56 h-36 p-6"
                />
                <div className="p-2 text-xs text-center">
                  <h1 className="font-semibold">{cat.name}</h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
