"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, CheckCircle, AlertCircle } from "lucide-react"
import type { User as UserType } from "@/app/page"

interface LostAndFoundProps {
  user: UserType
}

interface LostItem {
  id: string
  type: "lost" | "found"
  category: string
  description: string
  location: string
  dateReported: string
  contactName: string
  contactPhone: string
  contactEmail: string
  status: "active" | "matched" | "returned"
  imageUrl?: string
}

export function LostAndFound({ user }: LostAndFoundProps) {
  const [items, setItems] = useState<LostItem[]>([
    {
      id: "1",
      type: "lost",
      category: "Electronics",
      description: "Black iPhone 14 Pro with blue case, lost near main entrance",
      location: "Zone A - Main Entrance",
      dateReported: "2 hours ago",
      contactName: "Sarah Johnson",
      contactPhone: "+1 (555) 0123",
      contactEmail: "sarah.j@email.com",
      status: "active",
    },
    {
      id: "2",
      type: "found",
      category: "Personal Items",
      description: "Brown leather wallet with ID cards, found in food court",
      location: "Zone B - Food Court",
      dateReported: "1 hour ago",
      contactName: "Security Team",
      contactPhone: "+1 (555) 0199",
      contactEmail: "security@venue.com",
      status: "active",
    },
    {
      id: "3",
      type: "lost",
      category: "Accessories",
      description: "Silver watch with black leather strap, lost in exhibition hall",
      location: "Zone C - Exhibition Hall",
      dateReported: "3 hours ago",
      contactName: "Mike Chen",
      contactPhone: "+1 (555) 0124",
      contactEmail: "mike.c@email.com",
      status: "matched",
    },
    {
      id: "4",
      type: "found",
      category: "Clothing",
      description: "Red jacket, size M, found near emergency exit",
      location: "Zone E - Emergency Exit",
      dateReported: "4 hours ago",
      contactName: "Maintenance Team",
      contactPhone: "+1 (555) 0198",
      contactEmail: "maintenance@venue.com",
      status: "returned",
    },
  ])

  const [showReportForm, setShowReportForm] = useState(false)
  const [reportType, setReportType] = useState<"lost" | "found">("lost")
  const [newReport, setNewReport] = useState({
    category: "Electronics",
    description: "",
    location: "Zone A",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  })

  const categories = ["Electronics", "Personal Items", "Accessories", "Clothing", "Bags", "Keys", "Documents", "Other"]
  const zones = ["Zone A", "Zone B", "Zone C", "Zone D", "Zone E"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "matched":
        return "secondary"
      case "returned":
        return "secondary"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return AlertCircle
      case "matched":
        return CheckCircle
      case "returned":
        return CheckCircle
      default:
        return AlertCircle
    }
  }

  const handleSubmitReport = () => {
    const newItem: LostItem = {
      id: Date.now().toString(),
      type: reportType,
      ...newReport,
      dateReported: "Just now",
      status: "active",
    }
    setItems([newItem, ...items])
    setNewReport({
      category: "Electronics",
      description: "",
      location: "Zone A",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
    })
    setShowReportForm(false)
  }

  const updateItemStatus = (itemId: string, newStatus: LostItem["status"]) => {
    setItems(items.map((item) => (item.id === itemId ? { ...item, status: newStatus } : item)))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Lost & Found</h1>
          <p className="text-slate-600">Report lost items or search for found items</p>
        </div>
        <Button onClick={() => setShowReportForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Report Item
        </Button>
      </div>

      {/* Report Form */}
      {showReportForm && (
        <Card>
          <CardHeader>
            <CardTitle>Report Lost or Found Item</CardTitle>
            <CardDescription>Provide details about the item to help with matching</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Report Type Selection */}
            <div className="flex gap-4">
              <Button variant={reportType === "lost" ? "default" : "outline"} onClick={() => setReportType("lost")}>
                Lost Item
              </Button>
              <Button variant={reportType === "found" ? "default" : "outline"} onClick={() => setReportType("found")}>
                Found Item
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label className="text-sm font-medium">Location</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newReport.location}
                  onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
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
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder={`Describe the ${reportType} item in detail (color, brand, size, etc.)`}
                value={newReport.description}
                onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Name</label>
                <Input
                  placeholder="Your full name"
                  value={newReport.contactName}
                  onChange={(e) => setNewReport({ ...newReport, contactName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input
                  placeholder="+1 (555) 0123"
                  value={newReport.contactPhone}
                  onChange={(e) => setNewReport({ ...newReport, contactPhone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={newReport.contactEmail}
                  onChange={(e) => setNewReport({ ...newReport, contactEmail: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmitReport}>Submit Report</Button>
              <Button variant="outline" onClick={() => setShowReportForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lost Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {items.filter((item) => item.type === "lost" && item.status === "active").length}
            </div>
            <p className="text-xs text-slate-600">Awaiting match</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Found Items</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {items.filter((item) => item.type === "found" && item.status === "active").length}
            </div>
            <p className="text-xs text-slate-600">Available for pickup</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Matched</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {items.filter((item) => item.status === "matched").length}
            </div>
            <p className="text-xs text-slate-600">Successfully matched</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Returned</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {items.filter((item) => item.status === "returned").length}
            </div>
            <p className="text-xs text-slate-600">Completed cases</p>
          </CardContent>
        </Card>
      </div>

      {/* Items List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lost Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Lost Items
            </CardTitle>
            <CardDescription>Items reported as lost</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {items
              .filter((item) => item.type === "lost")
              .map((item) => {
                const StatusIcon = getStatusIcon(item.status)
                return (
                  <div key={item.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{item.category}</h4>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === "active"
                              ? "bg-red-100 text-red-800"
                              : item.status === "matched"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">{item.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
                      <div>Location: {item.location}</div>
                      <div>Reported: {item.dateReported}</div>
                      <div>Contact: {item.contactName}</div>
                      <div>Phone: {item.contactPhone}</div>
                    </div>
                    {user.role === "admin" && item.status === "active" && (
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" onClick={() => updateItemStatus(item.id, "matched")}>
                          Mark as Matched
                        </Button>
                      </div>
                    )}
                  </div>
                )
              })}
          </CardContent>
        </Card>

        {/* Found Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              Found Items
            </CardTitle>
            <CardDescription>Items reported as found</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {items
              .filter((item) => item.type === "found")
              .map((item) => {
                const StatusIcon = getStatusIcon(item.status)
                return (
                  <div key={item.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{item.category}</h4>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === "active"
                              ? "bg-blue-100 text-blue-800"
                              : item.status === "matched"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">{item.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
                      <div>Location: {item.location}</div>
                      <div>Reported: {item.dateReported}</div>
                      <div>Contact: {item.contactName}</div>
                      <div>Phone: {item.contactPhone}</div>
                    </div>
                    {user.role === "admin" && item.status === "active" && (
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" onClick={() => updateItemStatus(item.id, "matched")}>
                          Mark as Matched
                        </Button>
                        <Button size="sm" onClick={() => updateItemStatus(item.id, "returned")}>
                          Mark as Returned
                        </Button>
                      </div>
                    )}
                  </div>
                )
              })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
