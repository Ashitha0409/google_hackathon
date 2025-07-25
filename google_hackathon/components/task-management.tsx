"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, Clock, UserIcon, CheckCircle, XCircle, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { User as AppUser } from "@/app/page"

interface TaskManagementProps {
  user: AppUser
}

interface Task {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  status: "pending" | "in-progress" | "completed" | "cancelled"
  assignedTo?: string
  zone: string
  createdAt: string
  dueTime?: string
  type: "incident" | "maintenance" | "security" | "crowd-control"
}

export function TaskManagement({ user }: TaskManagementProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Crowd Control - Main Entrance",
      description: "Deploy additional personnel to manage crowd surge at main entrance",
      priority: "high",
      status: "pending",
      assignedTo: "Responder Team A",
      zone: "Zone A",
      createdAt: "2 minutes ago",
      dueTime: "5 minutes",
      type: "crowd-control",
    },
    {
      id: "2",
      title: "Security Check - Parking Area",
      description: "Investigate reported suspicious activity in parking zone",
      priority: "medium",
      status: "in-progress",
      assignedTo: "Security Team B",
      zone: "Zone D",
      createdAt: "8 minutes ago",
      dueTime: "15 minutes",
      type: "security",
    },
    {
      id: "3",
      title: "Equipment Maintenance",
      description: "Check and repair emergency lighting system",
      priority: "low",
      status: "completed",
      assignedTo: "Maintenance Team",
      zone: "Zone C",
      createdAt: "1 hour ago",
      type: "maintenance",
    },
  ])

  const [showCreateTask, setShowCreateTask] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    zone: "Zone A",
    type: "incident" as const,
    assignedTo: "",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "default"
      case "in-progress":
        return "secondary"
      case "completed":
        return "secondary"
      case "cancelled":
        return "destructive"
      default:
        return "default"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return Clock
      case "in-progress":
        return UserIcon
      case "completed":
        return CheckCircle
      case "cancelled":
        return XCircle
      default:
        return Clock
    }
  }

  const handleCreateTask = () => {
    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      status: "pending",
      createdAt: "Just now",
    }
    setTasks([task, ...tasks])
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      zone: "Zone A",
      type: "incident",
      assignedTo: "",
    })
    setShowCreateTask(false)
  }

  const updateTaskStatus = (taskId: string, newStatus: Task["status"]) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  const filteredTasks =
    user.role === "responder"
      ? tasks.filter((task) => task.zone === user.zone || task.assignedTo?.includes("Team A"))
      : tasks

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {user.role === "admin" ? "Task Management" : "My Tasks"}
          </h1>
          <p className="text-slate-600">
            {user.role === "admin"
              ? "Create, assign, and monitor tasks across all zones"
              : `View and manage tasks assigned to ${user.zone}`}
          </p>
        </div>
        {user.role === "admin" && (
          <Button onClick={() => setShowCreateTask(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Task
          </Button>
        )}
      </div>

      {/* Create Task Modal */}
      {showCreateTask && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Task</CardTitle>
            <CardDescription>Assign a new task to responders or teams</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Task Title</label>
                <Input
                  placeholder="Enter task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Zone</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newTask.zone}
                  onChange={(e) => setNewTask({ ...newTask, zone: e.target.value })}
                >
                  <option value="Zone A">Zone A</option>
                  <option value="Zone B">Zone B</option>
                  <option value="Zone C">Zone C</option>
                  <option value="Zone D">Zone D</option>
                  <option value="Zone E">Zone E</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Task Type</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newTask.type}
                  onChange={(e) => setNewTask({ ...newTask, type: e.target.value as any })}
                >
                  <option value="incident">Incident Response</option>
                  <option value="crowd-control">Crowd Control</option>
                  <option value="security">Security</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Provide detailed task description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Assign To</label>
              <Input
                placeholder="Team or individual name"
                value={newTask.assignedTo}
                onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateTask}>Create Task</Button>
              <Button variant="outline" onClick={() => setShowCreateTask(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Tasks</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search tasks..." className="pl-10" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Task List */}
          <div className="space-y-4">
            {filteredTasks
              .filter((task) => task.status !== "completed" && task.status !== "cancelled")
              .map((task) => {
                const StatusIcon = getStatusIcon(task.status)
                return (
                  <Card key={task.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <StatusIcon className="h-5 w-5" />
                          {task.title}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{task.zone}</Badge>
                          <Badge variant={getPriorityColor(task.priority)} className="capitalize">
                            {task.priority}
                          </Badge>
                          <Badge variant={getStatusColor(task.status)} className="capitalize">
                            {task.status.replace("-", " ")}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {task.status === "pending" && (
                                <DropdownMenuItem onClick={() => updateTaskStatus(task.id, "in-progress")}>
                                  Start Task
                                </DropdownMenuItem>
                              )}
                              {task.status === "in-progress" && (
                                <DropdownMenuItem onClick={() => updateTaskStatus(task.id, "completed")}>
                                  Mark Complete
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => updateTaskStatus(task.id, "cancelled")}>
                                Cancel Task
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <CardDescription>{task.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Assigned To:</span>
                          <p className="text-slate-600">{task.assignedTo || "Unassigned"}</p>
                        </div>
                        <div>
                          <span className="font-medium">Created:</span>
                          <p className="text-slate-600">{task.createdAt}</p>
                        </div>
                        <div>
                          <span className="font-medium">Due Time:</span>
                          <p className="text-slate-600">{task.dueTime || "No deadline"}</p>
                        </div>
                        <div>
                          <span className="font-medium">Type:</span>
                          <p className="text-slate-600 capitalize">{task.type.replace("-", " ")}</p>
                        </div>
                      </div>

                      {user.role === "responder" && task.status === "pending" && (
                        <div className="mt-4 pt-4 border-t">
                          <Button size="sm" onClick={() => updateTaskStatus(task.id, "in-progress")}>
                            Accept Task
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="space-y-4">
            {filteredTasks
              .filter((task) => task.status === "completed")
              .map((task) => {
                const StatusIcon = getStatusIcon(task.status)
                return (
                  <Card key={task.id} className="opacity-75">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <StatusIcon className="h-5 w-5 text-green-600" />
                          {task.title}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{task.zone}</Badge>
                          <Badge variant="secondary">Completed</Badge>
                        </div>
                      </div>
                      <CardDescription>{task.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {filteredTasks.map((task) => {
              const StatusIcon = getStatusIcon(task.status)
              return (
                <Card key={task.id} className={task.status === "completed" ? "opacity-75" : ""}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <StatusIcon className="h-5 w-5" />
                        {task.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{task.zone}</Badge>
                        <Badge variant={getPriorityColor(task.priority)} className="capitalize">
                          {task.priority}
                        </Badge>
                        <Badge variant={getStatusColor(task.status)} className="capitalize">
                          {task.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>{task.description}</CardDescription>
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
