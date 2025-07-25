"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, AlertTriangle, Clock, Brain, RefreshCw, Download } from "lucide-react"
import type { User } from "@/app/page"

interface PredictionsViewProps {
  user: User
}

export function PredictionsView({ user }: PredictionsViewProps) {
  const predictions = [
    {
      id: 1,
      type: "Crowd Surge",
      zone: "Zone A",
      probability: 85,
      timeframe: "8-12 minutes",
      severity: "high",
      description: "Expected crowd buildup near main entrance due to event start time",
    },
    {
      id: 2,
      type: "Traffic Congestion",
      zone: "Zone D",
      probability: 72,
      timeframe: "5-10 minutes",
      severity: "medium",
      description: "Parking area may experience congestion as attendees arrive",
    },
    {
      id: 3,
      type: "Emergency Exit Block",
      zone: "Zone E",
      probability: 45,
      timeframe: "10-15 minutes",
      severity: "low",
      description: "Potential obstruction near emergency exit due to vendor setup",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-slate-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI Predictions</h1>
          <p className="text-slate-600">15-minute anomaly forecasting powered by machine learning</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Update
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current">Current Predictions</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
          <TabsTrigger value="accuracy">Model Accuracy</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          {/* Prediction Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Risk Predictions</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-slate-600">Next 15 minutes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Medium Risk</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-slate-600">Moderate attention needed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Model Confidence</CardTitle>
                <Brain className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-slate-600">Average accuracy</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Predictions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Detailed Predictions</h3>
            {predictions.map((prediction) => (
              <Card key={prediction.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <AlertTriangle className={`h-5 w-5 ${getSeverityIcon(prediction.severity)}`} />
                      {prediction.type}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{prediction.zone}</Badge>
                      <Badge variant={getSeverityColor(prediction.severity)}>
                        {prediction.probability}% probability
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{prediction.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">Expected Timeframe</h4>
                      <p className="text-sm text-slate-600 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {prediction.timeframe}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">Severity Level</h4>
                      <Badge variant={getSeverityColor(prediction.severity)} className="capitalize">
                        {prediction.severity}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">Recommended Action</h4>
                      <p className="text-sm text-slate-600">
                        {prediction.severity === "high" && "Deploy responders immediately"}
                        {prediction.severity === "medium" && "Monitor closely and prepare"}
                        {prediction.severity === "low" && "Continue normal monitoring"}
                      </p>
                    </div>
                  </div>

                  {user.role === "admin" && (
                    <div className="mt-4 pt-4 border-t flex gap-2">
                      <Button size="sm" variant="default">
                        Create Task
                      </Button>
                      <Button size="sm" variant="outline">
                        Alert Responders
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Prediction Trends
              </CardTitle>
              <CardDescription>Historical accuracy and pattern analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                <p className="text-slate-600">Trend analysis chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accuracy" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Performance</CardTitle>
                <CardDescription>Last 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Accuracy Rate</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>False Positives</span>
                    <span className="font-medium">5%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "5%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Missed Events</span>
                    <span className="font-medium">3%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: "3%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prediction Categories</CardTitle>
                <CardDescription>Success rate by type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Crowd Surge</span>
                    <Badge variant="secondary">95% accurate</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Traffic Issues</span>
                    <Badge variant="secondary">88% accurate</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Emergency Blocks</span>
                    <Badge variant="secondary">91% accurate</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Weather Impact</span>
                    <Badge variant="secondary">85% accurate</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
