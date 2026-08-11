import SiteHeader from "@/components/headers/SiteHeader";
import { ReactNode } from "react";

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-between h-screen">
      <SiteHeader />
      {children}
      <footer></footer>
    </div>
  );
}
