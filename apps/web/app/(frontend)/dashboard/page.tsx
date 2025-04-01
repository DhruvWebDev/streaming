import Link from "next/link";
import { ArrowRight, Clock, FileVideo, Upload, Zap } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Progress } from "@repo/ui/components/ui/progress";

export default function DashboardPage() {
  // Sample data for dashboard
  const stats = [
    {
      title: "Total Videos",
      value: "12",
      icon: FileVideo,
      change: "+2 this month",
    },
    {
      title: "Processing Hours",
      value: "24.5",
      icon: Clock,
      change: "+5.2 this month",
    },
    {
      title: "Active Tasks",
      value: "3",
      icon: Zap,
      change: "2 completed today",
    },
  ];

  const recentVideos = [
    {
      id: "1",
      title: "Product Demo",
      thumbnail: "/placeholder.svg?height=120&width=200",
      duration: "2:45",
      status: "Completed",
      progress: 100,
    },
    {
      id: "2",
      title: "Marketing Video",
      thumbnail: "/placeholder.svg?height=120&width=200",
      duration: "4:12",
      status: "Processing",
      progress: 65,
    },
    {
      id: "3",
      title: "Team Meeting",
      thumbnail: "/placeholder.svg?height=120&width=200",
      duration: "32:10",
      status: "Queued",
      progress: 0,
    },
  ];

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8 lg:py-12">
      <div className="flex flex-col gap-4 md:gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Link href="/dashboard/upload">
            <Button className="gap-1.5">
              <Upload className="h-4 w-4" />
              Upload Video
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Recent Videos</CardTitle>
              <CardDescription>
                Your recently uploaded and processed videos
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {recentVideos.map((video) => (
                <div key={video.id} className="flex items-center gap-4">
                  <div className="relative aspect-video w-32 overflow-hidden rounded-md">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="object-cover"
                      width={200}
                      height={120}
                    />
                    <div className="absolute bottom-1 right-1 rounded bg-black/60 px-1 text-xs text-white">
                      {video.duration}
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="font-medium">{video.title}</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span
                        className={`mr-2 h-2 w-2 rounded-full ${
                          video.status === "Completed"
                            ? "bg-green-500"
                            : video.status === "Processing"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                        }`}
                      ></span>
                      {video.status}
                    </div>
                    {video.status === "Processing" && (
                      <Progress value={video.progress} className="h-2 w-full" />
                    )}
                  </div>
                  <Link href={`/dashboard/videos/${video.id}`}>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/videos">
                <Button variant="outline" className="w-full">
                  View All Videos
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Link href="/dashboard/upload">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload New Video
                </Button>
              </Link>
              <Link href="/dashboard/videos">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <FileVideo className="h-4 w-4" />
                  Browse All Videos
                </Button>
              </Link>
              <Link href="/dashboard/tasks">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Zap className="h-4 w-4" />
                  Manage Processing Tasks
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
