"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Map,
  TrendingUp,
  Brain,
  AlertTriangle,
  Users,
  ClipboardList,
  Activity,
  Shield,
  MessageSquare,
  Bell,
} from "lucide-react"
import type { User } from "@/app/page"

interface DashboardHomeProps {
  user: User
}

export function DashboardHome({ user }: DashboardHomeProps) {
  const getStatsCards = () => {
    const commonStats = [
      { title: "Active Incidents", value: "12", change: "+3", icon: AlertTriangle, color: "text-red-600" },
      { title: "Crowd Density", value: "68%", change: "+5%", icon: Users, color: "text-blue-600" },
      { title: "System Status", value: "Online", change: "99.9%", icon: Activity, color: "text-green-600" },
    ]

    const roleSpecificStats = {
      admin: [
        ...commonStats,
        { title: "Active Responders", value: "24", change: "+2", icon: Shield, color: "text-purple-600" },
      ],
      responder: [
        ...commonStats,
        { title: "Assigned Tasks", value: "8", change: "+1", icon: ClipboardList, color: "text-orange-600" },
      ],
      user: [
        ...commonStats,
        { title: "My Reports", value: "3", change: "+1", icon: MessageSquare, color: "text-indigo-600" },
      ],
    }

    return roleSpecificStats[user.role] || commonStats
  }

  const getQuickActions = () => {
    const roleActions = {
      admin: [
        { title: "Register New Event", description: "Create and configure new events", icon: ClipboardList },
        { title: "View Responder Status", description: "Check all responder availability", icon: Users },
        { title: "Generate Reports", description: "Create system analytics reports", icon: TrendingUp },
      ],
      responder: [
        { title: "View Zone Tasks", description: "Check assigned tasks in your zone", icon: ClipboardList },
        { title: "Update Status", description: "Report your current availability", icon: Activity },
        { title: "Emergency Alert", description: "Send urgent alerts to command", icon: AlertTriangle },
      ],
      user: [
        { title: "Report Incident", description: "Submit new incident report", icon: MessageSquare },
        { title: "Check Alerts", description: "View latest safety alerts", icon: Bell },
        { title: "Lost & Found", description: "Report or search for items", icon: Map },
      ],
    }

    return roleActions[user.role] || []
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user.name}</h1>
          <p className="text-slate-600 mt-1">
            {user.role === "admin" && "Monitor and manage the entire safety system"}
            {user.role === "responder" && `Manage incidents and tasks in ${user.zone}`}
            {user.role === "user" && "Stay informed and report incidents"}
          </p>
        </div>
        <Badge variant="secondary" className="text-sm capitalize px-3 py-1">
          {user.role} Portal
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getStatsCards().map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <p className="text-xs text-slate-600 mt-1">
                  <span className="text-green-600">{stat.change}</span> from last hour
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Frequently used actions for your role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {getQuickActions().map((action, index) => {
              const Icon = action.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{action.title}</h4>
                    <p className="text-sm text-slate-600">{action.description}</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system updates and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">High crowd density detected</p>
                  <p className="text-xs text-slate-600">Zone B - 2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New incident reported</p>
                  <p className="text-xs text-slate-600">Zone A - 5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Task completed successfully</p>
                  <p className="text-xs text-slate-600">Zone C - 8 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Weather alert issued</p>
                  <p className="text-xs text-slate-600">All zones - 12 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Map className="h-5 w-5 text-blue-600" />
              Live Heatmap
            </CardTitle>
            <CardDescription>Real-time crowd density visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <p className="text-slate-600 text-sm">Interactive heatmap view</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
              AI Predictions
            </CardTitle>
            <CardDescription>15-minute anomaly forecasting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
              <p className="text-slate-600 text-sm">Predictive analytics</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="h-5 w-5 text-purple-600" />
              Gemini Insights
            </CardTitle>
            <CardDescription>AI-powered situation summaries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
              <p className="text-slate-600 text-sm">AI-generated summaries</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
