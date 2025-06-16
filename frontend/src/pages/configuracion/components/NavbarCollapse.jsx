import { ChevronRight } from "lucide-react"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

const NavBarCollapse = ({ data }) => {
  const location = useLocation()

  return (
    <>
      {data.map((item) => {
        if (item.type === "item") {
          const isActive = location.pathname === item.href

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 text-sidebar-foreground/70 transition-all duration-200 ease-in-out",
                    "hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                    "group-data-[collapsible=icon]:justify-center",
                    isActive && [
                      "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                      "shadow-sm border-l-2 border-sidebar-primary",
                      "hover:bg-sidebar-accent",
                    ],
                  )}
                >
                  {item.icon && (
                    <item.icon
                      className={cn(
                        "size-4 shrink-0 transition-colors duration-200 group-hover:text-sidebar-primary",
                      )}
                    />
                  )}
                  <span className="truncate group-data-[collapsible=icon]:sr-only">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        }

        if (item.type === "submenu") {
          const hasActiveChild = item.items?.some((subItem) => location.pathname === subItem.url)

          return (
            <Collapsible asChild key={item.title} className="group/collapsible" defaultOpen={hasActiveChild}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={cn(
                      "flex items-center gap-3 text-sidebar-foreground/70 transition-all duration-200 ease-in-out",
                      "hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                      "group-data-[collapsible=icon]:justify-center",
                      hasActiveChild && ["text-sidebar-foreground font-medium", "bg-sidebar-accent/30"],
                    )}
                  >
                    {item.icon && (
                      <item.icon
                        className={cn(
                          "size-4 shrink-0 transition-colors duration-200 group-hover:text-sidebar-primary",
                        )}
                      />
                    )}
                    <span className="truncate group-data-[collapsible=icon]:sr-only">{item.title}</span>
                    <ChevronRight
                      className={cn(
                        "ml-auto size-4 shrink-0 transition-all duration-300 ease-in-out",
                        "group-data-[state=open]/collapsible:rotate-90",
                        "group-data-[collapsible=icon]:hidden",
                        hasActiveChild && "text-sidebar-primary",
                      )}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                  <SidebarMenuSub className="border-l-2 border-sidebar-border/50 ml-2 pl-4 mt-1">
                    {item.items?.map((subItem) => {
                      const isSubActive = location.pathname === subItem.url

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild isActive={isSubActive}>
                            <Link
                              to={subItem.url}
                              className={cn(
                                "flex items-center gap-2 text-sidebar-foreground/60 transition-all duration-200 ease-in-out",
                                "hover:text-sidebar-foreground hover:bg-sidebar-accent/30",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                                "relative before:absolute before:left-[-1rem] before:top-1/2 before:h-px before:w-3 before:bg-sidebar-border/50 before:transition-colors",
                                isSubActive && [
                                  "bg-sidebar-accent/50 text-sidebar-accent-foreground font-medium",
                                  "before:bg-sidebar-primary before:w-4",
                                  "shadow-sm",
                                ],
                              )}
                            >
                              <span className="truncate text-sm">{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        }

        return null
      })}
    </>
  )
}

export default NavBarCollapse
