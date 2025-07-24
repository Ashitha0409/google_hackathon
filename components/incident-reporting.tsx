"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquare,
  Camera,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  Upload,
  Phone,
  Mail,
  User,
} from "lucide-react"
import type { User as UserType } from "@/app/page"

interface IncidentReportingProps {
  user: UserType
}

interface IncidentReport {
  id: string
  title: string
  description: string
  category: string
  severity: "low" | "medium" | "high" | "critical"
  location: string
  zone: string
  status: "submitted" | "under-review" | "in-progress" | "resolved"
  reportedBy: string
  reportedAt: string
  contactPhone?: string
  contactEmail?: string
  mediaAttached: boolean
  assignedTo?: string
  responseTime?: string
}

export function IncidentReporting({ user }: IncidentReportingProps) {
  const [reports, setReports] = useState<IncidentReport[]>([
    {
      id: "1",
      title: "Suspicious Activity",
      description: "Person acting suspiciously near the main entrance, taking photos of security cameras",
      category: "Security",
      severity: "medium",
      location: "Main Entrance Gate",
      zone: "Zone A",
      status: "under-review",
      reportedBy: "John Doe",
      reportedAt: "10 minutes ago",
      contactPhone: "+1 (555) 0123",
      contactEmail: "john.doe@email.com",
      mediaAttached: true,
      assignedTo: "Security Team Alpha",
    },
    {
      id: "2",
      title: "Medical Emergency",
      description: "Elderly person collapsed near the food court, appears to be conscious but needs assistance",
      category: "Medical",
      severity: "high",
      location: "Food Court Area",
      zone: "Zone B",
      status: "in-progress",
      reportedBy: "Sarah Johnson",
      reportedAt: "25 minutes ago",
      contactPhone: "+1 (555) 0124",
      mediaAttached: false,
      assignedTo: "Medical Response Team",
      responseTime: "3 minutes",
    },
    {
      id: "3",
      title: "Crowd Congestion",
      description: "Large crowd gathering causing blockage in the main walkway",
      category: "Crowd Control",
      severity: "medium",
      location: "Central Walkway",
      zone: "Zone C",
      status: "resolved",
      reportedBy: "Mike Chen",
      reportedAt: "1 hour ago",
      contactPhone: "+1 (555) 0125",
      mediaAttached: true,
      assignedTo: "Crowd Control Team",
      responseTime: "5 minutes",
    },
  ])

  const [showReportForm, setShowReportForm] = useState(false)
  const [newReport, setNewReport] = useState({
    title: "",
    description: "",
    category: "General",
    severity: "medium" as const,
    location: "",
    zone: "Zone A",
    contactPhone: "",
    contactEmail: "",
    mediaFiles: [] as File[],
  })

  const categories = [
    "General",
    "Security",
    "Medical",
    "Fire Safety",
    "Crowd Control",
    "Infrastructure",
    "Weather",
    "Accessibility",
    "Other",
  ]

  const zones = ["Zone A", "Zone B", "Zone C", "Zone D", "Zone E"]

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
      case "submitted":
        return "default"
      case "under-review":
        return "secondary"
      case "in-progress":
        return "default"
      case "resolved":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return MessageSquare
      case "under-review":
        return Clock
      case "in-progress":
        return AlertTriangle
      case "resolved":
        return CheckCircle
      default:
        return MessageSquare
    }
  }

  const handleSubmitReport = () => {
    const report: IncidentReport = {
      id: Date.now().toString(),
      ...newReport,
      status: "submitted",
      reportedBy: user.name,
      reportedAt: "Just now",
      mediaAttached: newReport.mediaFiles.length > 0,
    }
    setReports([report, ...reports])
    setNewReport({
      title: "",
      description: "",
      category: "General",
      severity: "medium",
      location: "",
      zone: "Zone A",
      contactPhone: "",
      contactEmail: "",
      mediaFiles: [],
    })
    setShowReportForm(false)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setNewReport({ ...newReport, mediaFiles: [...newReport.mediaFiles, ...files] })
  }

  const userReports = reports.filter((report) => report.reportedBy === user.name)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Incident Reporting</h1>
          <p className="text-slate-600">Report incidents and track their resolution status</p>
        </div>
        <Button onClick={() => setShowReportForm(true)}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Report Incident
        </Button>
      </div>

      {/* Report Form */}
      {showReportForm && (
        <Card>
          <CardHeader>
            <CardTitle>Report New Incident</CardTitle>
            <CardDescription>Provide detailed information about the incident you're reporting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Incident Title</label>
                <Input
                  placeholder="Brief description of the incident"
                  value={newReport.title}
                  onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newReport.category}
                  onChange={(e) => setNewReport({ ...newReport, category: e.target.value })}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Severity Level</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newReport.severity}
                  onChange={(e) => setNewReport({ ...newReport, severity: e.target.value as any })}
                >
                  <option value="low">Low - Minor issue</option>
                  <option value="medium">Medium - Moderate concern</option>
                  <option value="high">High - Urgent attention needed</option>
                  <option value="critical">Critical - Emergency response required</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Zone</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newReport.zone}
                  onChange={(e) => setNewReport({ ...newReport, zone: e.target.value })}
                >
                  {zones.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Specific Location</label>
              <Input
                placeholder="e.g., Near main entrance, Food court table 5, etc."
                value={newReport.location}
                onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Detailed Description</label>
              <Textarea
                placeholder="Provide a detailed description of what happened, when it occurred, and any other relevant information"
                rows={4}
                value={newReport.description}
                onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Phone (Optional)</label>
                <Input
                  placeholder="+1 (555) 0123"
                  value={newReport.contactPhone}
                  onChange={(e) => setNewReport({ ...newReport, contactPhone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Email (Optional)</label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={newReport.contactEmail}
                  onChange={(e) => setNewReport({ ...newReport, contactEmail: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Attach Media (Photos/Videos)</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="media-upload"
                />
                <label htmlFor="media-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Click to upload photos or videos</p>
                  <p className="text-xs text-slate-500">PNG, JPG, MP4 up to 10MB each</p>
                </label>
                {newReport.mediaFiles.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium">{newReport.mediaFiles.length} file(s) selected</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmitReport} disabled={!newReport.title || !newReport.description}>
                Submit Report
              </Button>
              <Button variant="outline" onClick={() => setShowReportForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="my-reports" className="space-y-6">
        <TabsList>
          <TabsTrigger value="my-reports">My Reports</TabsTrigger>
          {user.role === "admin" && <TabsTrigger value="all-reports">All Reports</TabsTrigger>}
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="my-reports" className="space-y-4">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                <MessageSquare className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userReports.length}</div>
                <p className="text-xs text-slate-600">Submitted by you</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {userReports.filter((r) => r.status === "submitted" || r.status === "under-review").length}
                </div>
                <p className="text-xs text-slate-600">Awaiting response</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {userReports.filter((r) => r.status === "in-progress").length}
                </div>
                <p className="text-xs text-slate-600">Being handled</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {userReports.filter((r) => r.status === "resolved").length}
                </div>
                <p className="text-xs text-slate-600">Completed</p>
              </CardContent>
            </Card>
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {userReports.map((report) => {
              const StatusIcon = getStatusIcon(report.status)
              return (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <StatusIcon className="h-5 w-5" />
                        {report.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{report.zone}</Badge>
                        <Badge variant={getSeverityColor(report.severity)} className="capitalize">
                          {report.severity}
                        </Badge>
                        <Badge variant={getStatusColor(report.status)} className="capitalize">
                          {report.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-slate-500" />
                        <span>{report.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-500" />
                        <span>Reported {report.reportedAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-500" />
                        <span>{report.assignedTo || "Unassigned"}</span>
                      </div>
                    </div>

                    {report.responseTime && (
                      <div className="mt-3 p-2 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">
                          <strong>Response Time:</strong> {report.responseTime}
                        </p>
                      </div>
                    )}

                    {(report.contactPhone || report.contactEmail) && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm font-medium mb-2">Contact Information:</p>
                        <div className="flex gap-4 text-sm text-slate-600">
                          {report.contactPhone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {report.contactPhone}
                            </div>
                          )}
                          {report.contactEmail && (
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {report.contactEmail}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {report.mediaAttached && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                        <Camera className="h-4 w-4" />
                        <span>Media files attached</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {user.role === "admin" && (
          <TabsContent value="all-reports" className="space-y-4">
            <div className="space-y-4">
              {reports.map((report) => {
                const StatusIcon = getStatusIcon(report.status)
                return (
                  <Card key={report.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <StatusIcon className="h-5 w-5" />
                          {report.title}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{report.zone}</Badge>
                          <Badge variant={getSeverityColor(report.severity)} className="capitalize">
                            {report.severity}
                          </Badge>
                          <Badge variant={getStatusColor(report.status)} className="capitalize">
                            {report.status.replace("-", " ")}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>{report.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-slate-500" />
                          <span>{report.reportedBy}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-slate-500" />
                          <span>{report.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-500" />
                          <span>{report.reportedAt}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-slate-500" />
                          <span>{report.assignedTo || "Unassigned"}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        )}

        <TabsContent value="resolved" className="space-y-4">
          <div className="space-y-4">
            {reports
              .filter((report) => report.status === "resolved")
              .map((report) => {
                const StatusIcon = getStatusIcon(report.status)
                return (
                  <Card key={report.id} className="opacity-75">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <StatusIcon className="h-5 w-5 text-green-600" />
                          {report.title}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{report.zone}</Badge>
                          <Badge variant="secondary">Resolved</Badge>
                        </div>
                      </div>
                      <CardDescription>{report.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-slate-500" />
                          <span>{report.reportedBy}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-500" />
                          <span>{report.reportedAt}</span>
                        </div>
                        {report.responseTime && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Resolved in {report.responseTime}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
