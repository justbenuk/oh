import Link from "next/link";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { CarTaxiFrontIcon, LayoutDashboardIcon } from "lucide-react";
import PortalDirectoryItems from "../menus/PortalDirectoryItems";

export default function PortalSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader className="px-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/"}>
                <CarTaxiFrontIcon className="text-primary" />
                <span>Go back Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuButton asChild>
            <Link href={"/portal"}>
              <LayoutDashboardIcon />
              <span>Portal</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenu>
        <PortalDirectoryItems />
      </SidebarContent>
      <SidebarFooter>fo</SidebarFooter>
    </Sidebar>
  );
}
