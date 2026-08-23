import PortalHeader from "@/components/headers/PortalHeader";
import PageContainer from "@/components/PageContainer";
import PortalSidebar from "@/components/sidebars/PortalSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function PortalTemplate({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <PortalSidebar />
      <SidebarInset>
        <PortalHeader />
        <PageContainer size="dashboard">
          {children}
        </PageContainer>
      </SidebarInset>
    </SidebarProvider>
  );
}
