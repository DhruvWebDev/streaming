"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Download,
  Edit,
  Eye,
  FileVideo,
  MoreVertical,
  Share2,
  Trash2,
  Zap,
  Plus,
} from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { Progress } from "@repo/ui/components/ui/progress";

export default function VideoDetailPage() {
  const params = useParams();
  const videoId = params.id as string;
  const [activeTab, setActiveTab] = useState("details");

  // Sample video data - in a real app, you would fetch this based on the ID
  const video = {
    id: videoId,
    title: videoId === "new-upload" ? "Marketing Video" : "Product Demo",
    description:
      "This is a detailed description of the video that explains what it's about and its purpose.",
    thumbnail: "/placeholder.svg?height=400&width=700",
    videoUrl: "#",
    duration: videoId === "new-upload" ? "4:12" : "2:45",
    status: videoId === "new-upload" ? "Processing" : "Completed",
    progress: videoId === "new-upload" ? 65 : 100,
    date: "2023-06-15",
    views: videoId === "new-upload" ? 0 : 245,
    category: "Marketing",
    tasks: [
      { id: "color-correction", name: "Color Correction", status: "Completed" },
      {
        id: "noise-reduction",
        name: "Noise Reduction",
        status: videoId === "new-upload" ? "Processing" : "Completed",
      },
      {
        id: "stabilization",
        name: "Video Stabilization",
        status: videoId === "new-upload" ? "Queued" : "Completed",
      },
    ],
    versions: [
      { id: "original", name: "Original", date: "2023-06-15", size: "245 MB" },
      {
        id: "processed",
        name: "Processed",
        date: "2023-06-15",
        size: "220 MB",
      },
    ],
  };

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8 lg:py-12">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/videos">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {video.title}
          </h1>
          <div className="ml-auto flex items-center gap-2">
            {video.status === "Completed" ? (
              <>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </>
            ) : (
              <Badge variant="outline" className="ml-auto">
                {video.status}
              </Badge>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Details
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Add Processing Task
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive">
                  <Trash2 className="h-4 w-4" />
                  Delete Video
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {video.status === "Processing" && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Processing video...</span>
              <span>{video.progress}%</span>
            </div>
            <Progress value={video.progress} className="h-2 w-full" />
          </div>
        )}

        <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
          {video.status === "Completed" ? (
            <video
              src={video.videoUrl}
              poster={video.thumbnail}
              controls
              className="h-full w-full"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute flex flex-col items-center justify-center gap-2 rounded-lg bg-black/50 p-4 text-white">
                <FileVideo className="h-10 w-10" />
                <p>Video is currently being processed</p>
              </div>
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="tasks">Processing Tasks</TabsTrigger>
            <TabsTrigger value="versions">Versions</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Description</h3>
                    <p className="text-sm text-muted-foreground">
                      {video.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Category</h3>
                    <p className="text-sm text-muted-foreground">
                      {video.category}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Uploaded on {new Date(video.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{video.views} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileVideo className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Duration: {video.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Processing Tasks</CardTitle>
                <CardDescription>Tasks applied to this video</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {video.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <Zap className="h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-medium">{task.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {task.status === "Completed"
                              ? "Task completed successfully"
                              : task.status === "Processing"
                                ? "Task is currently processing"
                                : "Task is queued for processing"}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          task.status === "Completed"
                            ? "default"
                            : task.status === "Processing"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {task.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full gap-1.5">
                    <Plus className="h-4 w-4" />
                    Add New Processing Task
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="versions" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Versions</CardTitle>
                <CardDescription>
                  Different versions of your video
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {video.versions.map((version) => (
                    <div
                      key={version.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <FileVideo className="h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-medium">{version.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Created on{" "}
                            {new Date(version.date).toLocaleDateString()} •{" "}
                            {version.size}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
