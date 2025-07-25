"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Map, Users, TrendingUp, RefreshCw, Maximize2 } from "lucide-react"
import type { User } from "@/app/page"

interface HeatmapViewProps {
  user: User
}

export function HeatmapView({ user }: HeatmapViewProps) {
  const zones = [
    { id: "A", name: "Main Entrance", density: 85, status: "high", color: "bg-red-500" },
    { id: "B", name: "Food Court", density: 72, status: "medium", color: "bg-yellow-500" },
    { id: "C", name: "Exhibition Hall", density: 45, status: "low", color: "bg-green-500" },
    { id: "D", name: "Parking Area", density: 30, status: "low", color: "bg-green-500" },
    { id: "E", name: "Emergency Exit", density: 15, status: "low", color: "bg-green-500" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Live Heatmap</h1>
          <p className="text-slate-600">Real-time crowd density monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Maximize2 className="h-4 w-4 mr-2" />
            Fullscreen
          </Button>
        </div>
      </div>

      <Tabs defaultValue="live" className="space-y-6">
        <TabsList>
          <TabsTrigger value="live">Live View</TabsTrigger>
          <TabsTrigger value="historical">Historical</TabsTrigger>
          <TabsTrigger value="zones">Zone Details</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          {/* Main Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                Interactive Heatmap
              </CardTitle>
              <CardDescription>Live crowd density visualization - Updated every 30 seconds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-96 bg-slate-100 rounded-lg overflow-hidden">
                {/* Simulated heatmap visualization */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-200 to-yellow-200">
                  {zones.map((zone, index) => (
                    <div
                      key={zone.id}
                      className={`absolute w-16 h-16 ${zone.color} rounded-full opacity-70 flex items-center justify-center text-white font-bold cursor-pointer hover:opacity-90 transition-opacity`}
                      style={{
                        left: `${20 + index * 15}%`,
                        top: `${30 + (index % 2) * 20}%`,
                      }}
                    >
                      {zone.id}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                  <h4 className="font-medium text-sm mb-2">Density Level</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span>High (70%+)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <span>Medium (40-70%)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span>Low (&lt;40%)</span>
                    </div>
                  </div>
                </div>

                {/* Live indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-md">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium">LIVE</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Zone Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {zones.map((zone) => (
              <Card key={zone.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Zone {zone.id}</CardTitle>
                    <Badge
                      variant={
                        zone.status === "high" ? "destructive" : zone.status === "medium" ? "default" : "secondary"
                      }
                    >
                      {zone.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">{zone.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Density</span>
                      <span className="font-bold text-lg">{zone.density}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${zone.color}`} style={{ width: `${zone.density}%` }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="historical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Historical Trends
              </CardTitle>
              <CardDescription>Crowd density patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                <p className="text-slate-600">Historical trend chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zones" className="space-y-6">
          <div className="grid gap-4">
            {zones.map((zone) => (
              <Card key={zone.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Zone {zone.id} - {zone.name}
                    </CardTitle>
                    <Badge
                      variant={
                        zone.status === "high" ? "destructive" : zone.status === "medium" ? "default" : "secondary"
                      }
                    >
                      {zone.density}% Capacity
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Current Status</h4>
                      <p className="text-sm text-slate-600">
                        {zone.status === "high" && "High density - Monitor closely"}
                        {zone.status === "medium" && "Moderate density - Normal operations"}
                        {zone.status === "low" && "Low density - All clear"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Estimated Count</h4>
                      <p className="text-sm text-slate-600">{Math.round(zone.density * 5)} people</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Last Updated</h4>
                      <p className="text-sm text-slate-600">30 seconds ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
