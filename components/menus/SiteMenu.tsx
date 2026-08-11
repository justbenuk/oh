import { MENUITEMS } from "@/data/menus";
import Link from "next/link";

export default function SiteMenu() {
  return (
    <nav className="hidden lg:flex flex-row items-center justify-center gap-6">
      {MENUITEMS.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
