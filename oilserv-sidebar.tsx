"use client"

import type React from "react"

import { ChevronLeft, Package, Eye, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar"
import { useRouter, usePathname } from "next/navigation"
import { LabelsProvider } from "@/context/labels-context"

const navigationItems = [
  {
    title: "Create New Label",
    icon: Package,
    href: "/labels/create",
    type: "link",
  },
  {
    title: "Labels Library",
    icon: Eye,
    href: "/labels",
    type: "link",
  },
]

function AppSidebar() {
  const { toggleSidebar, state } = useSidebar()
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  const handleHomeClick = () => {
    router.push("/csms")
  }

  const handleBackClick = () => {
    router.back()
  }

  const handleHomeNavClick = () => {
    router.push("/labels")
  }

  const isChildActive = (children: any[]) => {
    return children.some((child) => pathname === child.href)
  }

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <div className="flex h-full w-full flex-col" style={{ backgroundColor: "#5a6b7d" }}>
        <SidebarHeader className="border-b border-gray-400 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
              <span className="text-white font-bold text-lg group-data-[collapsible=icon]:hidden">OILSERV CSMS</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-gray-600 group-data-[collapsible=icon]:mx-auto"
              onClick={toggleSidebar}
            >
              <ChevronLeft className={`h-5 w-5 transition-transform ${state === "collapsed" ? "rotate-180" : ""}`} />
            </Button>
          </div>
        </SidebarHeader>

        <SidebarContent style={{ backgroundColor: "#5a6b7d" }}>
          <SidebarGroup className="px-4 py-6 group-data-[collapsible=icon]:px-2">
            <Button
              variant="ghost"
              className="text-white font-bold text-sm mb-4 px-0 group-data-[collapsible=icon]:hidden hover:text-oilserv-orange justify-start flex items-center gap-2"
              onClick={handleHomeNavClick}
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.type === "section" ? (
                      <div className="space-y-1">
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === item.href || isChildActive(item.children || [])}
                          tooltip={state === "collapsed" ? item.title : undefined}
                          className={`
                            w-full justify-start gap-3 px-3 py-3 text-left font-bold
                            ${pathname === item.href || isChildActive(item.children || []) ? "bg-teal-500 text-white hover:bg-teal-600" : "text-white hover:bg-gray-600 hover:text-oilserv-orange"}
                            rounded-md transition-colors
                            group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2
                          `}
                        >
                          <a
                            href={item.href}
                            className="flex items-center gap-3 group-data-[collapsible=icon]:gap-0"
                            onClick={(e) => {
                              e.preventDefault()
                              handleNavigation(item.href)
                            }}
                          >
                            <item.icon className="h-5 w-5 flex-shrink-0" />
                            <span className="font-bold group-data-[collapsible=icon]:hidden">{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                        <div className="ml-8 space-y-1 group-data-[collapsible=icon]:hidden">
                          {item.children?.map((child) => (
                            <SidebarMenuButton
                              key={child.title}
                              asChild
                              isActive={pathname === child.href}
                              className={`
                                w-full justify-start gap-3 px-3 py-2 text-left font-medium text-sm
                                ${pathname === child.href ? "bg-teal-400 text-white hover:bg-teal-500" : "text-gray-200 hover:bg-gray-600 hover:text-white"}
                                rounded-md transition-colors
                              `}
                            >
                              <a
                                href={child.href}
                                className="flex items-center gap-3"
                                onClick={(e) => {
                                  e.preventDefault()
                                  handleNavigation(child.href)
                                }}
                              >
                                <span className="font-medium">{child.title}</span>
                              </a>
                            </SidebarMenuButton>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={state === "collapsed" ? item.title : undefined}
                        className={`
                          w-full justify-start gap-3 px-3 py-3 text-left font-bold
                          ${pathname === item.href ? "bg-teal-500 text-white hover:bg-teal-600" : "text-white hover:bg-gray-600 hover:text-oilserv-orange"}
                          rounded-md transition-colors
                          group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2
                        `}
                      >
                        <a
                          href={item.href}
                          className="flex items-center gap-3 group-data-[collapsible=icon]:gap-0"
                          onClick={(e) => {
                            e.preventDefault()
                            handleNavigation(item.href)
                          }}
                        >
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          <span className="font-bold group-data-[collapsible=icon]:hidden">{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  )
}

export default function OilservSidebar({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleHomeClick = () => {
    router.push("/csms")
  }

  const handleBackClick = () => {
    router.back()
  }

  const renderContent = () => {
    return children
  }

  const getPageTitle = () => {
    if (pathname === "/labels/create") {
      return "Create New Label"
    } else if (pathname === "/labels") {
      return "Labels Library"
    } else {
      return "OILSERV"
    }
  }

  return (
    <div className="flex h-screen">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset className="flex-1">
          <LabelsProvider>
            <main className="flex-1 bg-gray-900 text-white">
              <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 px-4 bg-white shadow-lg">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBackClick}
                    className="text-gray-600 hover:bg-gray-100"
                    title="Go Back"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleHomeClick}
                    className="text-gray-600 hover:bg-gray-100"
                    title="Go Home"
                  >
                    <Home className="h-5 w-5" />
                  </Button>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 ml-4">{getPageTitle()}</h1>
              </header>
              {renderContent()}
            </main>
          </LabelsProvider>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
