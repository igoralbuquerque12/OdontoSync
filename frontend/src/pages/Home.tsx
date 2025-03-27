import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/header"

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex w-full h-15 justify-between items-center border-gray-800 border-b-1">
        <SidebarTrigger />
        <Header />
      </div>
    </SidebarProvider>
  )
}