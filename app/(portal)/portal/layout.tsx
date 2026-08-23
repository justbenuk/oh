import PortalHeader from "@/components/headers/PortalHeader";
import PageContainer from "@/components/PageContainer";
import PortalSidebar from "@/components/sidebars/PortalSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { requireAdmin } from "@/lib/session";

export default async function PortalLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();

  return (
    <SidebarProvider>
      <PortalSidebar />
      <SidebarInset>
        <PortalHeader />
        <PageContainer size="dashboard">{children}</PageContainer>
      </SidebarInset>
    </SidebarProvider>
  );
}
