import { cn } from "@/lib/utils";
import { CarTaxiFrontIcon } from "lucide-react";
import Link from "next/link";

const LogoSize = {
  large: "size-14",
  medium: "size-8",
  small: "size-6",
};

const TextSize = {
  large: "hidden sm:block sm:text-3xl lg:text-5xl",
  medium: "hidden md:block text-xl",
  small: "text-md",
};

export default function SiteLogo({ size = "medium" }: { size?: "large" | "medium" | "small" }) {
  return (
    <Link href={"/"} className="flex flex-row items-center gap-2">
      <CarTaxiFrontIcon className={cn("text-primary", LogoSize[size])} />
      <span className={cn("font-semibold", TextSize[size])}>OperatorHub</span>
    </Link>
  );
}
