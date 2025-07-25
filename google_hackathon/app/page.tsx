"use client"

import { useState } from "react"
import { LandingPage } from "@/components/landing-page"
import { LoginPage } from "@/components/login-page"
import { Dashboard } from "@/components/dashboard"

export type UserRole = "admin" | "responder" | "user"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  zone?: string
}

export default function App() {
  const [currentView, setCurrentView] = useState<"landing" | "login" | "dashboard">("landing")
  const [user, setUser] = useState<User | null>(null)

  const handleGetStarted = () => {
    setCurrentView("login")
  }

  const handleLogin = (userData: User) => {
    setUser(userData)
    setCurrentView("dashboard")
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView("landing")
  }

  const handleBackToLanding = () => {
    setCurrentView("landing")
  }

  if (currentView === "landing") {
    return <LandingPage onGetStarted={handleGetStarted} />
  }

  if (currentView === "login") {
    return <LoginPage onLogin={handleLogin} onBackToHome={handleBackToLanding} />
  }

  if (currentView === "dashboard" && user) {
    return <Dashboard user={user} onLogout={handleLogout} />
  }

  return <LandingPage onGetStarted={handleGetStarted} />
}
