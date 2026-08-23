import { MENUITEMS } from "@/data/menus";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function SiteMenu() {
  return (
    <nav className="flex flex-row items-center justify-center gap-6">
      {MENUITEMS.map((item) => (
        <div key={item.name} className="group relative">
          {item.items ? (
            <span
              className="flex cursor-default items-center gap-1"
              aria-haspopup="menu"
              tabIndex={0}
            >
              {item.name}
              <ChevronDown className="size-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
            </span>
          ) : (
            <Link href={item.href}>{item.name}</Link>
          )}

          {item.items ? (
            <div className="invisible absolute top-full left-1/2 z-50 min-w-40 -translate-x-1/2 pt-2 opacity-0 transition-[opacity,visibility] group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-2xl bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/5 dark:ring-foreground/10">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className="block rounded-xl px-3 py-2 text-sm whitespace-nowrap hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </nav>
  );
}
