"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Search,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  UserCheck,
  Radio,
} from "lucide-react"
import type { User } from "@/app/page"

interface ResponderDispatchProps {
  user: User
}

interface Responder {
  id: string
  name: string
  role: string
  zone: string
  status: "available" | "busy" | "offline" | "emergency"
  location: string
  lastUpdate: string
  contact: string
  currentTask?: string
  skills: string[]
}

export function ResponderDispatch({ user }: ResponderDispatchProps) {
  const [responders] = useState<Responder[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Security Lead",
      zone: "Zone A",
      status: "available",
      location: "Main Entrance",
      lastUpdate: "2 minutes ago",
      contact: "+1 (555) 0123",
      skills: ["Crowd Control", "Emergency Response", "First Aid"],
    },
    {
      id: "2",
      name: "Mike Chen",
      role: "Crowd Control",
      zone: "Zone B",
      status: "busy",
      location: "Food Court",
      lastUpdate: "1 minute ago",
      contact: "+1 (555) 0124",
      currentTask: "Managing crowd surge",
      skills: ["Crowd Control", "Communication"],
    },
    {
      id: "3",
      name: "Emma Davis",
      role: "Medical Response",
      zone: "Zone C",
      status: "available",
      location: "Exhibition Hall",
      lastUpdate: "30 seconds ago",
      contact: "+1 (555) 0125",
      skills: ["First Aid", "Medical Emergency", "Evacuation"],
    },
    {
      id: "4",
      name: "James Wilson",
      role: "Security Officer",
      zone: "Zone D",
      status: "emergency",
      location: "Parking Area",
      lastUpdate: "5 minutes ago",
      contact: "+1 (555) 0126",
      currentTask: "Investigating security incident",
      skills: ["Security", "Investigation", "Patrol"],
    },
    {
      id: "5",
      name: "Lisa Rodriguez",
      role: "Maintenance",
      zone: "Zone E",
      status: "offline",
      location: "Emergency Exit",
      lastUpdate: "15 minutes ago",
      contact: "+1 (555) 0127",
      skills: ["Technical Support", "Equipment Repair"],
    },
  ])

  const [selectedZone, setSelectedZone] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "secondary"
      case "busy":
        return "default"
      case "emergency":
        return "destructive"
      case "offline":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return CheckCircle
      case "busy":
        return Clock
      case "emergency":
        return AlertTriangle
      case "offline":
        return UserCheck
      default:
        return UserCheck
    }
  }

  const filteredResponders = selectedZone === "all" ? responders : responders.filter((r) => r.zone === selectedZone)

  const zones = ["Zone A", "Zone B", "Zone C", "Zone D", "Zone E"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Responder Dispatch</h1>
          <p className="text-slate-600">Monitor and coordinate response teams across all zones</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Radio className="h-4 w-4 mr-2" />
            Broadcast
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Group Message
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {responders.filter((r) => r.status === "available").length}
            </div>
            <p className="text-xs text-slate-600">Ready for dispatch</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Duty</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {responders.filter((r) => r.status === "busy").length}
            </div>
            <p className="text-xs text-slate-600">Currently assigned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emergency</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {responders.filter((r) => r.status === "emergency").length}
            </div>
            <p className="text-xs text-slate-600">Urgent response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offline</CardTitle>
            <UserCheck className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-600">
              {responders.filter((r) => r.status === "offline").length}
            </div>
            <p className="text-xs text-slate-600">Not available</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Responders</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="zones">By Zone</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search responders..." className="pl-10" />
            </div>
            <select
              className="p-2 border rounded-md"
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
            >
              <option value="all">All Zones</option>
              {zones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>

          {/* Responder Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResponders.map((responder) => {
              const StatusIcon = getStatusIcon(responder.status)
              return (
                <Card key={responder.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{responder.name}</CardTitle>
                      <Badge variant={getStatusColor(responder.status)} className="capitalize">
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {responder.status}
                      </Badge>
                    </div>
                    <CardDescription>{responder.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-slate-500" />
                        <span>
                          {responder.zone} - {responder.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-500" />
                        <span>{responder.contact}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-500" />
                        <span>Last update: {responder.lastUpdate}</span>
                      </div>
                    </div>

                    {responder.currentTask && (
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-900">Current Task:</p>
                        <p className="text-sm text-blue-700">{responder.currentTask}</p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {responder.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      {responder.status === "available" && (
                        <Button size="sm" className="flex-1">
                          Assign
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {responders
              .filter((r) => r.status === "available")
              .map((responder) => {
                const StatusIcon = getStatusIcon(responder.status)
                return (
                  <Card key={responder.id} className="hover:shadow-md transition-shadow border-green-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{responder.name}</CardTitle>
                        <Badge variant="secondary" className="capitalize">
                          <StatusIcon className="h-3 w-3 mr-1 text-green-600" />
                          Available
                        </Badge>
                      </div>
                      <CardDescription>{responder.role}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-slate-500" />
                          <span>
                            {responder.zone} - {responder.location}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {responder.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full">
                        <Users className="h-4 w-4 mr-2" />
                        Assign Task
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </TabsContent>

        <TabsContent value="zones" className="space-y-4">
          {zones.map((zone) => {
            const zoneResponders = responders.filter((r) => r.zone === zone)
            return (
              <Card key={zone}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {zone}
                  </CardTitle>
                  <CardDescription>{zoneResponders.length} responders assigned</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {zoneResponders.map((responder) => {
                      const StatusIcon = getStatusIcon(responder.status)
                      return (
                        <div key={responder.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <StatusIcon
                              className={`h-4 w-4 ${
                                responder.status === "available"
                                  ? "text-green-600"
                                  : responder.status === "busy"
                                    ? "text-blue-600"
                                    : responder.status === "emergency"
                                      ? "text-red-600"
                                      : "text-slate-600"
                              }`}
                            />
                            <div>
                              <p className="font-medium text-sm">{responder.name}</p>
                              <p className="text-xs text-slate-600">{responder.role}</p>
                            </div>
                          </div>
                          <Badge variant={getStatusColor(responder.status)} className="text-xs capitalize">
                            {responder.status}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}
