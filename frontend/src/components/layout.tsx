import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/header"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"


export default function Layout() {
    return (
        <div>
            <SidebarProvider>
            <AppSidebar />
            <div className="w-full">
                <header className="flex w-full h-15 justify-between items-center border-gray-800 border-b-1">
                    <SidebarTrigger />
                    <Header />
                </header>
                <main> <Outlet /> </main>
                <Toaster position="bottom-right"/>
            </div>     
            </SidebarProvider>   
        </div>
    )
}