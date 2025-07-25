"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface IncidentReportingProps {
  user: any; // Replace 'any' with your User type if available
}

export function IncidentReporting({ user }: IncidentReportingProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    severity: "medium", // default value
    type: "general", // default value
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add document to 'user-reports' collection
      const docRef = await addDoc(collection(db, "user-reports"), {
        ...formData,
        reportedBy: user?.uid || 'anonymous',
        reporterName: user?.displayName || 'Anonymous User',
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      toast({
        title: "Report Submitted Successfully",
        description: "Your incident report has been recorded.",
        variant: "default",
      });

      // Reset form
      setFormData({
        title: "",
        location: "",
        description: "",
        severity: "medium",
        type: "general",
      });

    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            Report an Incident
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Incident Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Brief title of the incident"
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Where did this happen?"
                required
              />
            </div>

            <div>
              <Label htmlFor="type">Incident Type</Label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-2"
                required
              >
                <option value="general">General</option>
                <option value="security">Security</option>
                <option value="medical">Medical</option>
                <option value="fire">Fire</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <Label htmlFor="severity">Severity Level</Label>
              <select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-2"
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Detailed description of the incident..."
                rows={4}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Incident Report"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5" />
              <p className="text-sm">
                <strong>Important:</strong> This will immediately alert relevant authorities.
                Please ensure all information is accurate.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
