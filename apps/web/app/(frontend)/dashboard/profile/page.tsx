"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Edit2,
  FileVideo,
  Link2,
  Mail,
  MapPin,
  Save,
  Upload,
  Github,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Toast } from "@repo/ui/components/ui/toast";
import { formatDate } from "@repo/lib";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample user data
  const user = {
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Video editor and content creator. I love creating stunning visuals and experimenting with new effects.",
    location: "New York, USA",
    website: "https://johndoe.com",
    joinedDate: "2022-06-15",
    stats: {
      videos: 24,
      processingHours: 48.5,
      storage: "120 GB",
    },
    recentVideos: [
      {
        id: "1",
        title: "Product Demo",
        thumbnail: "/placeholder.svg?height=120&width=200",
        date: "2023-03-15",
      },
      {
        id: "2",
        title: "Marketing Video",
        thumbnail: "/placeholder.svg?height=120&width=200",
        date: "2023-03-10",
      },
      {
        id: "3",
        title: "Team Meeting",
        thumbnail: "/placeholder.svg?height=120&width=200",
        date: "2023-03-05",
      },
    ],
  };

  const handleSaveProfile = () => {
    setIsLoading(true);

    // Simulate saving profile
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      Toast({
        title: "Profile updated",
      });
    }, 1000);
  };

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8 lg:py-12 max-w-5xl mx-auto">
      <div className="flex flex-col gap-8 slide-up">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          {isEditing ? (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveProfile}
                disabled={isLoading}
                className="gap-2 transition-all hover:scale-105"
              >
                {isLoading ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="gap-2 transition-all hover:scale-105"
            >
              <Edit2 className="h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <div className="flex flex-col gap-6">
            <Card className="scale-in">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <Image
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      width={150}
                      height={150}
                      className="rounded-full border-4 border-background"
                    />
                    {isEditing && (
                      <Button
                        size="icon"
                        className="absolute bottom-0 right-0 rounded-full"
                      >
                        <Upload className="h-4 w-4" />
                        <span className="sr-only">Upload avatar</span>
                      </Button>
                    )}
                  </div>
                  {isEditing ? (
                    <div className="w-full space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                  ) : (
                    <div className="text-center">
                      <h2 className="text-2xl font-bold">{user.name}</h2>
                      <p className="text-muted-foreground">@{user.username}</p>
                    </div>
                  )}
                </div>

                {!isEditing && (
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user.email}</span>
                    </div>
                    {user.location && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    {user.website && (
                      <div className="flex items-center gap-2 text-sm">
                        <Link2 className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={user.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {user.website.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Joined {formatDate(user.joinedDate)}</span>
                    </div>
                  </div>
                )}

                {isEditing && (
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user.email}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue={user.location} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" defaultValue={user.website} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="scale-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle>Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{user.stats.videos}</p>
                    <p className="text-sm text-muted-foreground">Videos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {user.stats.processingHours}
                    </p>
                    <p className="text-sm text-muted-foreground">Hours</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{user.stats.storage}</p>
                    <p className="text-sm text-muted-foreground">Storage</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="scale-in">
              <CardHeader>
                <CardTitle>About</CardTitle>
                {!isEditing && (
                  <CardDescription>
                    Bio and personal information
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      defaultValue={user.bio}
                      rows={5}
                      placeholder="Tell us about yourself"
                    />
                  </div>
                ) : (
                  <p className="text-muted-foreground">{user.bio}</p>
                )}
              </CardContent>
            </Card>

            <Card className="scale-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle>Recent Videos</CardTitle>
                <CardDescription>Your recently uploaded videos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  {user.recentVideos.map((video) => (
                    <div
                      key={video.id}
                      className="group overflow-hidden rounded-lg border transition-all hover:shadow-md"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          width={200}
                          height={120}
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="p-2">
                        <h3 className="font-medium line-clamp-1">
                          {video.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(video.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full transition-all hover:scale-105"
                >
                  <FileVideo className="mr-2 h-4 w-4" />
                  View All Videos
                </Button>
              </CardFooter>
            </Card>

            <Card className="scale-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>
                  Accounts linked to your profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <Github className="h-6 w-6" />
                      <div>
                        <p className="font-medium">GitHub</p>
                        <p className="text-sm text-muted-foreground">
                          Connected
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Disconnect
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <Wallet className="h-6 w-6" />
                      <div>
                        <p className="font-medium">Solana Wallet</p>
                        <p className="text-sm text-muted-foreground">
                          Connected
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Disconnect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
