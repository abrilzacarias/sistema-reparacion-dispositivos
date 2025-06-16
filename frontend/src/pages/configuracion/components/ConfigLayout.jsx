import CrudsTemplate from "@/components/molecules/CrudsTemplate"
import { Separator } from "@/components/ui/separator"
import { SidebarProvider } from "@/components/ui/sidebar" 
import { Outlet, useLocation } from "react-router-dom"
import NavBarCollapse from "./NavbarCollapse"
import { Building2, User } from "lucide-react"
import SettingsProfilePage from "./SettingsProfilePage"

const sidebarNavItems = [
  {
    type: "item",
    title: "Perfil",
    href: "/configuracion/perfil",
    icon: User,
  },
  {
    type: "submenu",
    title: "Negocio",
    icon: Building2,
    items: [
      { title: "Tipos de Dispositivo", url: "/configuracion/negocio/dispositivos-pregunta" },
      { title: "Marcas", url: "/configuracion/negocio/marcas" },
      { title: "Modelos", url: "/configuracion/negocio/modelos" },
    ],
  },
]

export default function ConfigLayout() {
  const location = useLocation()
  const isRootSettings = location.pathname === "/configuracion/perfil"

  return (
    <CrudsTemplate className="py-0 m-0">
      <SidebarProvider>
        <div className="space-y-6">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Configuración</h2>
            <p className="text-muted-foreground">
              Administra la configuración de tu cuenta y establece las
              preferencias de correo electrónico.
            </p>
          </div>
          <Separator className="my-6" />
           <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 min-h-[calc(100vh-200px)]">
            <aside className="w-full lg:w-64">
              <NavBarCollapse data={sidebarNavItems} />
            </aside>
            <div className="flex-1 py-0 min-h-full">
              <div className="h-full lg:min-w-[800px]">{isRootSettings ? <SettingsProfilePage /> : <Outlet />}</div>
            </div>
            </div>
        </div>
      </SidebarProvider>
    </CrudsTemplate>
  )
}
