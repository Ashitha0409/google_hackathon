"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Upload } from "lucide-react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useToast } from "@/components/ui/use-toast";

export function LostAndFound({ user }: { user: any }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [matchFound, setMatchFound] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    lastLocation: "",
    lastTime: "",
    clothing: "",
    description: "",
    contact: "",
    relationship: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoURL = null;
      
      // Upload photo if exists
      if (photoFile) {
        const storageRef = ref(storage, `missing-persons/${Date.now()}-${photoFile.name}`);
        const uploadResult = await uploadBytes(storageRef, photoFile);
        photoURL = await getDownloadURL(uploadResult.ref);
      }

      // Add document to Firestore
      const docRef = await addDoc(collection(db, "missing-persons"), {
        ...formData,
        photoURL,
        reportedBy: user?.uid || 'anonymous',
        status: 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      toast({
        title: "Report Submitted Successfully",
        description: "Your missing person report has been recorded.",
        variant: "default",
      });

      // Reset form
      setFormData({
        fullName: "",
        age: "",
        lastLocation: "",
        lastTime: "",
        clothing: "",
        description: "",
        contact: "",
        relationship: "",
      });
      setPhotoPreview(null);
      setPhotoFile(null);

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
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Upload className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Report Missing Person</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age" 
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Age"
                  className="mt-1"
                  required
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <Label>Recent Photo</Label>
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {photoPreview ? (
                  <div className="relative">
                    <img 
                      src={photoPreview} 
                      alt="Preview" 
                      className="mx-auto h-48 w-48 object-cover rounded"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        setPhotoPreview(null);
                        setPhotoFile(null);
                      }}
                    >
                      Remove Photo
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <label 
                        htmlFor="photo-upload" 
                        className="cursor-pointer rounded-md bg-white px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-500"
                      >
                        Upload Photo
                        <input
                          id="photo-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Upload the most recent clear photo
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Last Seen Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lastLocation">Last Seen Location</Label>
                <Input 
                  id="lastLocation" 
                  value={formData.lastLocation}
                  onChange={handleInputChange}
                  placeholder="Address or landmark"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastTime">Time Last Seen</Label>
                <Input 
                  id="lastTime" 
                  type="datetime-local"
                  value={formData.lastTime}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                />
              </div>
            </div>

            {/* Clothing Description */}
            <div>
              <Label htmlFor="clothing">Clothing Description</Label>
              <Input 
                id="clothing" 
                value={formData.clothing}
                onChange={handleInputChange}
                placeholder="Color and type of clothes worn"
                className="mt-1"
                required
              />
            </div>

            {/* Additional Details */}
            <div>
              <Label htmlFor="description">Description & Circumstances</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Physical description, circumstances of disappearance..."
                className="mt-1"
                rows={4}
                required
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact">Emergency Contact</Label>
                <Input 
                  id="contact" 
                  type="tel"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="Phone number for updates"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="relationship">Your Relationship</Label>
                <Input 
                  id="relationship" 
                  value={formData.relationship}
                  onChange={handleInputChange}
                  placeholder="e.g., Parent, Spouse, Friend"
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Missing Person Report"}
            </Button>
          </form>

          {/* Alert System Demo */}
          {matchFound && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-800">Possible Match Found!</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Our system detected a potential match in the CCTV feed. Please verify the images below.
                  </p>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {[1, 2, 3].map((frame) => (
                      <div 
                        key={frame}
                        className="h-24 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500"
                      >
                        CCTV Frame {frame}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700">
                      Confirm Match
                    </Button>
                    <Button variant="outline" className="bg-gray-600 text-white hover:bg-gray-700">
                      Not a Match
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg">
            <div className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              <p className="text-sm">
                <strong>Important:</strong> This will immediately alert authorities and activate AI search across the CCTV network.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
