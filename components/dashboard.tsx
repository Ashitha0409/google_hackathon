"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Eye,
  Home,
  Map,
  TrendingUp,
  Brain,
  ClipboardList,
  Users,
  AlertTriangle,
  Search,
  Calendar,
  Settings,
  LogOut,
  Bell,
  MessageSquare,
} from "lucide-react"
import { DashboardHome } from "@/components/dashboard-home"
import { HeatmapView } from "@/components/heatmap-view"
import { PredictionsView } from "@/components/predictions-view"
import { GeminiSummaries } from "@/components/gemini-summaries"
import { TaskManagement } from "@/components/task-management"
import { ResponderDispatch } from "@/components/responder-dispatch"
import { AlertsView } from "@/components/alerts-view"
import { LostAndFound } from "@/components/lost-and-found"
import { IncidentReporting } from "@/components/incident-reporting"

interface DashboardProps {
  user: any
  onLogout: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeView, setActiveView] = useState("home")

  const getMenuItems = () => {
    const commonItems = [
      { id: "home", label: "Dashboard", icon: Home },
      { id: "heatmap", label: "Heatmap", icon: Map },
      { id: "predictions", label: "Predictions", icon: TrendingUp },
      { id: "summaries", label: "AI Summaries", icon: Brain },
    ]

    const roleSpecificItems = {
      admin: [
        ...commonItems,
        { id: "tasks", label: "Task Management", icon: ClipboardList },
        { id: "responders", label: "Responder Dispatch", icon: Users },
        { id: "events", label: "Event Registration", icon: Calendar },
      ],
      responder: [
        ...commonItems,
        { id: "tasks", label: "My Tasks", icon: ClipboardList },
        { id: "alerts", label: "Zone Alerts", icon: AlertTriangle },
      ],
      user: [
        ...commonItems,
        { id: "report", label: "Report Incident", icon: MessageSquare },
        { id: "alerts", label: "Real-time Alerts", icon: Bell },
        { id: "lost-found", label: "Lost & Found", icon: Search },
      ],
    }

    return roleSpecificItems[user.role] || commonItems
  }

  const renderContent = () => {
    switch (activeView) {
      case "home":
        return <DashboardHome user={user} />
      case "heatmap":
        return <HeatmapView user={user} />
      case "predictions":
        return <PredictionsView user={user} />
      case "summaries":
        return <GeminiSummaries user={user} />
      case "tasks":
        return <TaskManagement user={user} />
      case "responders":
        return <ResponderDispatch user={user} />
      case "alerts":
        return <AlertsView user={user} />
      case "lost-found":
        return <LostAndFound user={user} />
      case "report":
        return <IncidentReporting user={user} />
      default:
        return <DashboardHome user={user} />
    }
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center gap-3 px-2 py-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">SafetySight Vision</span>
                  <Badge variant="secondary" className="w-fit text-xs capitalize">
                    {user.role}
                  </Badge>
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {getMenuItems().map((item) => {
                  const Icon = item.icon
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton isActive={activeView === item.id} onClick={() => setActiveView(item.id)}>
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>System</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <Bell className="h-4 w-4" />
                    <span>{user.name}</span>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                  <DropdownMenuItem>
                    <Bell className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <Separator />
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">
              {getMenuItems().find((item) => item.id === activeView)?.label || "Dashboard"}
            </h2>
            {user.zone && (
              <Badge variant="outline" className="text-xs">
                {user.zone}
              </Badge>
            )}
          </div>
        </header>

        <div className="flex-1 p-6">{renderContent()}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
