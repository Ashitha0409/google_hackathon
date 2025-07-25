"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  AlertTriangle,
  Flame,
  Users,
  Cloud,
  Shield,
  Clock,
  MapPin,
  Volume2,
  VolumeX,
  RefreshCw,
} from "lucide-react"
import type { User } from "@/app/page"

interface AlertsViewProps {
  user: User
}

interface Alert {
  id: string
  type: "fire" | "crowd" | "weather" | "security" | "medical" | "system"
  title: string
  description: string
  severity: "critical" | "high" | "medium" | "low"
  zone: string
  timestamp: string
  status: "active" | "acknowledged" | "resolved"
  source: string
}

export function AlertsView({ user }: AlertsViewProps) {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "crowd",
      title: "High Crowd Density Alert",
      description: "Crowd density in Zone A has exceeded 85% capacity. Immediate attention required.",
      severity: "critical",
      zone: "Zone A",
      timestamp: "2 minutes ago",
      status: "active",
      source: "Crowd Monitoring System",
    },
    {
      id: "2",
      type: "fire",
      title: "Fire Alarm Triggered",
      description: "Smoke detector activated in Zone C kitchen area. Fire department notified.",
      severity: "high",
      zone: "Zone C",
      timestamp: "5 minutes ago",
      status: "acknowledged",
      source: "Fire Safety System",
    },
    {
      id: "3",
      type: "weather",
      title: "Severe Weather Warning",
      description: "Heavy rain and strong winds expected in the next 30 minutes.",
      severity: "medium",
      zone: "All Zones",
      timestamp: "8 minutes ago",
      status: "active",
      source: "Weather Service",
    },
    {
      id: "4",
      type: "security",
      title: "Unauthorized Access Attempt",
      description: "Security breach detected at restricted area entrance.",
      severity: "high",
      zone: "Zone D",
      timestamp: "12 minutes ago",
      status: "resolved",
      source: "Security System",
    },
    {
      id: "5",
      type: "medical",
      title: "Medical Emergency",
      description: "First aid requested for visitor in exhibition hall.",
      severity: "medium",
      zone: "Zone B",
      timestamp: "15 minutes ago",
      status: "resolved",
      source: "Emergency Response",
    },
  ])

  const [soundEnabled, setSoundEnabled] = useState(true)

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "fire":
        return Flame
      case "crowd":
        return Users
      case "weather":
        return Cloud
      case "security":
        return Shield
      case "medical":
        return AlertTriangle
      case "system":
        return Bell
      default:
        return AlertTriangle
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "destructive"
      case "acknowledged":
        return "default"
      case "resolved":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, status: "acknowledged" } : alert)))
  }

  const resolveAlert = (alertId: string) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, status: "resolved" } : alert)))
  }

  const filteredAlerts = user.role === "user" ? alerts.filter((alert) => alert.type !== "system") : alerts

  const activeAlerts = filteredAlerts.filter((alert) => alert.status === "active")
  const criticalAlerts = filteredAlerts.filter((alert) => alert.severity === "critical")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {user.role === "user" ? "Real-time Alerts" : "System Alerts"}
          </h1>
          <p className="text-slate-600">
            {user.role === "user"
              ? "Stay informed about safety alerts and emergency notifications"
              : "Monitor and respond to system-wide alerts and notifications"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setSoundEnabled(!soundEnabled)}>
            {soundEnabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
            Sound {soundEnabled ? "On" : "Off"}
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalAlerts.length}</div>
            <p className="text-xs text-slate-600">Immediate attention required</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Bell className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{activeAlerts.length}</div>
            <p className="text-xs text-slate-600">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acknowledged</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {filteredAlerts.filter((a) => a.status === "acknowledged").length}
            </div>
            <p className="text-xs text-slate-600">Being handled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {filteredAlerts.filter((a) => a.status === "resolved").length}
            </div>
            <p className="text-xs text-slate-600">Completed today</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Alerts</TabsTrigger>
          <TabsTrigger value="all">All Alerts</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeAlerts.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">All Clear</h3>
                  <p className="text-slate-600">No active alerts at this time</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {activeAlerts.map((alert) => {
                const AlertIcon = getAlertIcon(alert.type)
                return (
                  <Card
                    key={alert.id}
                    className={`hover:shadow-md transition-shadow ${
                      alert.severity === "critical"
                        ? "border-red-300 bg-red-50"
                        : alert.severity === "high"
                          ? "border-orange-300 bg-orange-50"
                          : ""
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <AlertIcon
                            className={`h-5 w-5 ${
                              alert.type === "fire"
                                ? "text-red-600"
                                : alert.type === "crowd"
                                  ? "text-blue-600"
                                  : alert.type === "weather"
                                    ? "text-gray-600"
                                    : alert.type === "security"
                                      ? "text-purple-600"
                                      : alert.type === "medical"
                                        ? "text-green-600"
                                        : "text-slate-600"
                            }`}
                          />
                          {alert.title}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{alert.zone}</Badge>
                          <Badge variant={getSeverityColor(alert.severity)} className="capitalize">
                            {alert.severity}
                          </Badge>
                          <Badge variant={getStatusColor(alert.status)} className="capitalize">
                            {alert.status}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>{alert.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-500" />
                          <span>{alert.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-slate-500" />
                          <span>{alert.zone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-slate-500" />
                          <span>{alert.source}</span>
                        </div>
                      </div>

                      {(user.role === "admin" || user.role === "responder") && alert.status === "active" && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => acknowledgeAlert(alert.id)}>
                            Acknowledge
                          </Button>
                          <Button size="sm" onClick={() => resolveAlert(alert.id)}>
                            Resolve
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {filteredAlerts.map((alert) => {
              const AlertIcon = getAlertIcon(alert.type)
              return (
                <Card
                  key={alert.id}
                  className={`hover:shadow-md transition-shadow ${alert.status === "resolved" ? "opacity-75" : ""}`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <AlertIcon
                          className={`h-5 w-5 ${
                            alert.type === "fire"
                              ? "text-red-600"
                              : alert.type === "crowd"
                                ? "text-blue-600"
                                : alert.type === "weather"
                                  ? "text-gray-600"
                                  : alert.type === "security"
                                    ? "text-purple-600"
                                    : alert.type === "medical"
                                      ? "text-green-600"
                                      : "text-slate-600"
                          }`}
                        />
                        {alert.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{alert.zone}</Badge>
                        <Badge variant={getSeverityColor(alert.severity)} className="capitalize">
                          {alert.severity}
                        </Badge>
                        <Badge variant={getStatusColor(alert.status)} className="capitalize">
                          {alert.status}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>{alert.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-500" />
                        <span>{alert.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-slate-500" />
                        <span>{alert.zone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-slate-500" />
                        <span>{alert.source}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          <div className="space-y-4">
            {filteredAlerts
              .filter((alert) => alert.status === "resolved")
              .map((alert) => {
                const AlertIcon = getAlertIcon(alert.type)
                return (
                  <Card key={alert.id} className="opacity-75">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <AlertIcon className="h-5 w-5 text-green-600" />
                          {alert.title}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{alert.zone}</Badge>
                          <Badge variant="secondary">Resolved</Badge>
                        </div>
                      </div>
                      <CardDescription>{alert.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
