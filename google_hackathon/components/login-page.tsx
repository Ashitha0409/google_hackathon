"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, User, Eye, AlertTriangle } from "lucide-react"
import type { User as UserType, UserRole } from "@/app/page"

interface LoginPageProps {
  onLogin: (user: UserType) => void
  onBackToHome?: () => void
}

export function LoginPage({ onLogin, onBackToHome }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [selectedRole, setSelectedRole] = useState<UserRole>("user")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    zone: "",
  })

  const roles = [
    {
      id: "admin" as UserRole,
      title: "Admin Portal",
      description: "Manage events, view analytics, assign tasks",
      icon: Shield,
      color: "bg-red-500",
      features: ["Event Registration", "Heatmap Analytics", "Task Assignment", "Responder Management"],
    },
    {
      id: "responder" as UserRole,
      title: "Responder Portal",
      description: "Accept tasks, view zone data, respond to incidents",
      icon: Users,
      color: "bg-blue-500",
      features: ["Zone Tasks", "Dispatch System", "Real-time Updates", "Incident Response"],
    },
    {
      id: "user" as UserRole,
      title: "User Portal",
      description: "Report incidents, view alerts, lost & found",
      icon: User,
      color: "bg-green-500",
      features: ["Incident Reporting", "Real-time Alerts", "Lost & Found", "Safety Updates"],
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const userData: UserType = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} User`,
      email: formData.email || `${selectedRole}@safetysight.com`,
      role: selectedRole,
      zone: selectedRole === "responder" ? formData.zone || "Zone A" : undefined,
    }
    onLogin(userData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          {onBackToHome && (
            <Button variant="ghost" onClick={onBackToHome} className="mb-4">
              ← Back to Home
            </Button>
          )}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Eye className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SafetySight Vision
            </h1>
          </div>
          <p className="text-slate-600 text-lg">Advanced Disaster & Crowd Management System</p>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedRole === role.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${role.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {role.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Login/Register Form */}
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="capitalize">
                {selectedRole}
              </Badge>
              Portal Access
            </CardTitle>
            <CardDescription>{isLogin ? "Sign in to your account" : "Create a new account"}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={isLogin ? "login" : "register"} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" onClick={() => setIsLogin(true)}>
                  Login
                </TabsTrigger>
                <TabsTrigger value="register" onClick={() => setIsLogin(false)}>
                  Register
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-4 mt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    />
                  </div>
                  {selectedRole === "responder" && (
                    <div className="space-y-2">
                      <Label htmlFor="zone">Assigned Zone</Label>
                      <Input
                        id="zone"
                        placeholder="e.g., Zone A, Zone B"
                        value={formData.zone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, zone: e.target.value }))}
                      />
                    </div>
                  )}
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Demo Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">Demo Mode: Click any role and sign in to explore</span>
          </div>
        </div>
      </div>
    </div>
  )
}
