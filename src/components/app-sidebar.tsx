import { Calendar, Home, Inbox, Search, Settings, Archive } from "lucide-react"
import { HiBuildingStorefront, HiOutlineUsers } from "react-icons/hi2";
import { BiLineChart } from "react-icons/bi";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { PublicRoutes } from "../models";

const handleLogout = () => {
  localStorage.removeItem('authToken'); 
  window.location.reload(); 
};

// Menu items.
const items = [
  {
    title: "Home",
    url: "/adm",
    icon: Home,
  },
  {
    title: "Inventario",
    url: "/adm/inventory",
    icon: Archive,
  },
  {
    title: "Usuarios",
    url: "/adm/users",
    icon: HiOutlineUsers,
  },
  {
    title: "Ventas",
    url: "/adm/ventas",
    icon: BiLineChart ,
  },
  {
    title: "Tienda",
    url: '/shop',
    icon: HiBuildingStorefront,
  },
  {
    title: "Cerrar Sesión",
    url: "/",
    icon: BiLineChart ,
    onClick: handleLogout,
  },
]

export function AppSidebar() {
  return (
    <Sidebar  >
      <SidebarContent className="bg-amber-900 text-amber-300 shadow-md" >
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="hover:bg-amber-500 transition-colors duration-200  border-b  " asChild>
                    <a href={item.url}
                      onClick={item.onClick}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar