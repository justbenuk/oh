import { cn } from "@/lib/utils";
import { CarTaxiFrontIcon } from "lucide-react";
import Link from "next/link";

const LogoSize = {
  large: "size-14",
  medium: "size-10",
  small: "size-5",
};

const TextSize = {
  large: "text-5xl",
  medium: "text-3xl",
  small: "text-xl",
};

export default function SiteLogo({ size = "medium" }: { size?: "large" | "medium" | "small" }) {
  return (
    <Link href={"/"} className="flex flex-row items-center gap-2">
      <CarTaxiFrontIcon className={cn("text-primary", LogoSize[size])} />
      <span className={cn("font-semibold", TextSize[size])}>OperatorHub</span>
    </Link>
  );
}
