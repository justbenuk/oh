import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
  size?: "large" | "dashboard" | "read";
}

const sizes = {
  large: "container",
  dashboard: "max-w-5xl",
  read: "max-w-3xl",
};

export default function PageContainer({ children, size = "large" }: PageProps) {
  return <div className={cn("w-full mx-auto px-6 2xl:px-0", sizes[size])}>{children}</div>;
}
