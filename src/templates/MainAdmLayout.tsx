import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster";

export const MainAdmLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-amber-100  flex flex-col min-h-screen">
    <SidebarProvider>
      <AppSidebar />
            <SidebarTrigger />
            <main className="flex-grow">
                {children}
            </main>
            <Toaster />
    </SidebarProvider>
    </div>
  )
}

export default MainAdmLayout