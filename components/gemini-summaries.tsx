"use client";

import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "@/lib/firebase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Brain,
  RefreshCw,
  Download,
  Clock,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import type { User } from "@/app/page";

import { formatDistanceToNow } from "date-fns";

interface GeminiSummariesProps {
  user: User;
}

export function GeminiSummaries({ user }: GeminiSummariesProps) {
  const [liveGeminiSummary, setLiveGeminiSummary] = useState<string | null>(null);
  const [liveGeminiInsights, setLiveGeminiInsights] = useState<string[]>([]);
  const [liveGeminiRecommendations, setLiveGeminiRecommendations] = useState<string[]>([]);
  const [summaryTimestamp, setSummaryTimestamp] = useState<string | null>(null);

  // Firebase Realtime listener for structured summary data
  useEffect(() => {
    const db = getDatabase(app);
    const summaryRef = ref(db, "summaries/current");
    const unsubscribe = onValue(summaryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setLiveGeminiSummary(data.summary ?? null);
        setLiveGeminiInsights(data.insights ?? []);
        setLiveGeminiRecommendations(data.recommendations ?? []);
        setSummaryTimestamp(data.timestamp ?? null);
      } else {
        setLiveGeminiSummary(null);
        setLiveGeminiInsights([]);
        setLiveGeminiRecommendations([]);
        setSummaryTimestamp(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Derive priority from severity insight (fallback to "low")
  const severityInsight = liveGeminiInsights.find((i) =>
    i.toLowerCase().startsWith("severity:")
  );
  const severity =
    severityInsight?.split(":")[1]?.trim().toLowerCase() ?? "low";

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
      default:
        return "secondary";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return AlertTriangle;
      case "medium":
        return TrendingUp;
      case "low":
      default:
        return Clock;
    }
  };

  const summaries = [
    {
      id: 1,
      title: "Current Situation Overview",
      timestamp: summaryTimestamp
        ? formatDistanceToNow(new Date(summaryTimestamp)) + " ago"
        : "Just now",
      priority: severity,
      summary: liveGeminiSummary ?? "No live summary available.",
      insights: liveGeminiInsights,
      recommendations: liveGeminiRecommendations,
    },
    // You can keep other static summaries here if you want
    {
      id: 2,
      title: "Safety Trend Analysis",
      timestamp: "5 minutes ago",
      priority: "medium",
      summary:
        "Overall safety metrics remain within acceptable parameters. Minor congestion patterns detected in parking areas, but no immediate safety concerns. Weather conditions are favorable with no predicted impact on crowd behavior.",
      insights: ["Safety metrics: 94% within normal range", "Parking utilization at 72%", "Weather impact: Minimal"],
      recommendations: [
        "Continue standard monitoring protocols",
        "Monitor parking overflow areas",
        "Maintain current staffing levels",
      ],
    },
    {
      id: 3,
      title: "Predictive Risk Assessment",
      timestamp: "8 minutes ago",
      priority: "low",
      summary:
        "Machine learning models indicate low probability of major incidents in the next hour. Historical data suggests current crowd patterns are typical for this event type and time. Emergency systems are fully operational.",
      insights: [
        "Risk probability: 15% (Low)",
        "Pattern recognition: Normal for event type",
        "Emergency systems: 100% operational",
      ],
      recommendations: [
        "Continue standard monitoring protocols",
        "Monitor parking overflow areas",
        "Maintain current staffing levels",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI Summaries</h1>
          <p className="text-slate-600">
            Gemini-powered intelligent situation analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate New
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current">Current Summaries</TabsTrigger>
          <TabsTrigger value="historical">Historical Analysis</TabsTrigger>
          <TabsTrigger value="settings">AI Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          {/* AI Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Gemini AI Status
              </CardTitle>
              <CardDescription>
                Real-time AI analysis and insights generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">Online</div>
                  <p className="text-sm text-slate-600">System Status</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{summaries.length}</div>
                  <p className="text-sm text-slate-600">Active Summaries</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">2min</div>
                  <p className="text-sm text-slate-600">Last Update</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">98%</div>
                  <p className="text-sm text-slate-600">Confidence Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summaries */}
          <div className="space-y-4">
            {summaries.map((summary) => {
              const PriorityIcon = getPriorityIcon(summary.priority);
              return (
                <Card
                  key={summary.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <PriorityIcon className="h-5 w-5" />
                        {summary.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={getPriorityColor(summary.priority)}
                          className="capitalize"
                        >
                          {summary.priority} Priority
                        </Badge>
                        <span className="text-sm text-slate-500">
                          {summary.timestamp}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Main Summary */}
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">AI Analysis</h4>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {summary.summary}
                      </p>
                    </div>

                    {/* Insights */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Key Insights</h4>
                      <ul className="space-y-1">
                        {summary.insights.map((insight, index) => (
                          <li
                            key={index}
                            className="text-sm text-slate-600 flex items-start gap-2"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Recommendations</h4>
                      <ul className="space-y-1">
                        {summary.recommendations.map((rec, index) => (
                          <li
                            key={index}
                            className="text-sm text-slate-600 flex items-start gap-2"
                          >
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions for Admin */}
                    {user.role === "admin" && (
                      <div className="pt-4 border-t flex gap-2">
                        <Button size="sm" variant="default">
                          Implement Recommendations
                        </Button>
                        <Button size="sm" variant="outline">
                          Share Summary
                        </Button>
                        <Button size="sm" variant="outline">
                          Request Detailed Analysis
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="historical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historical AI Analysis</CardTitle>
              <CardDescription>Past summaries and trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                <p className="text-slate-600">Historical analysis timeline would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Your AI settings cards */}
          {/* ... (as per your existing code) */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
