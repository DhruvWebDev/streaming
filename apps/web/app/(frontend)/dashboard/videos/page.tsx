"use client";

import { useState } from "react";
import Link from "next/link";
import { Filter, Search } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Sample video data
  const videos = [
    {
      id: "1",
      title: "Product Demo",
      thumbnail: "/placeholder.svg?height=120&width=200",
      duration: "2:45",
      status: "Completed",
      date: "2023-06-15",
      views: 245,
    },
    {
      id: "2",
      title: "Marketing Video",
      thumbnail: "/placeholder.svg?height=120&width=200",
      duration: "4:12",
      status: "Processing",
      date: "2023-06-14",
      views: 0,
    },
    {
      id: "3",
      title: "Team Meeting",
      thumbnail: "/placeholder.svg?height=120&width=200",
      duration: "32:10",
      status: "Queued",
      date: "2023-06-14",
      views: 0,
    },
    {
      id: "4",
      title: "Tutorial: Advanced Features",
      thumbnail: "/placeholder.svg?height=120&width=200",
      duration: "15:22",
      status: "Completed",
      date: "2023-06-10",
      views: 189,
    },
    {
      id: "5",
      title: "Customer Testimonial",
      thumbnail: "/placeholder.svg?height=120&width=200",
      duration: "3:45",
      status: "Completed",
      date: "2023-06-08",
      views: 312,
    },
    {
      id: "6",
      title: "Product Launch",
      thumbnail: "/placeholder.svg?height=120&width=200",
      duration: "28:15",
      status: "Completed",
      date: "2023-06-05",
      views: 1024,
    },
  ];

  // Filter videos based on search query
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Sort videos based on selected sort option
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === "views") {
      return b.views - a.views;
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8 lg:py-12">
      <div className="flex flex-col gap-4 md:gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">My Videos</h1>
          <Link href="/dashboard/upload">
            <Button>Upload New Video</Button>
          </Link>
        </div>

        <Tabs defaultValue="all">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="all">All Videos</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
            </TabsList>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search videos..."
                  className="pl-8 sm:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="views">Most Views</SelectItem>
                    <SelectItem value="title">Title (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedVideos.map((video) => (
                <Link key={video.id} href={`/dashboard/videos/${video.id}`}>
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    <div className="relative aspect-video w-full overflow-hidden">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="object-cover"
                        width={400}
                        height={225}
                      />
                      <div className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white">
                        {video.duration}
                      </div>
                      <div className="absolute left-2 top-2 rounded bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                        {video.status}
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="line-clamp-1 text-lg">
                        {video.title}
                      </CardTitle>
                      <CardDescription className="flex items-center justify-between">
                        <span>{new Date(video.date).toLocaleDateString()}</span>
                        {video.status === "Completed" && (
                          <span className="flex items-center gap-1 text-xs">
                            {video.views} views
                          </span>
                        )}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedVideos
                .filter((video) => video.status === "Completed")
                .map((video) => (
                  <Link key={video.id} href={`/dashboard/videos/${video.id}`}>
                    <Card className="overflow-hidden transition-all hover:shadow-md">
                      <div className="relative aspect-video w-full overflow-hidden">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="object-cover"
                          width={400}
                          height={225}
                        />
                        <div className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white">
                          {video.duration}
                        </div>
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="line-clamp-1 text-lg">
                          {video.title}
                        </CardTitle>
                        <CardDescription className="flex items-center justify-between">
                          <span>
                            {new Date(video.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1 text-xs">
                            {video.views} views
                          </span>
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="processing" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedVideos
                .filter(
                  (video) =>
                    video.status === "Processing" || video.status === "Queued",
                )
                .map((video) => (
                  <Link key={video.id} href={`/dashboard/videos/${video.id}`}>
                    <Card className="overflow-hidden transition-all hover:shadow-md">
                      <div className="relative aspect-video w-full overflow-hidden">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="object-cover"
                          width={400}
                          height={225}
                        />
                        <div className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white">
                          {video.duration}
                        </div>
                        <div className="absolute left-2 top-2 rounded bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                          {video.status}
                        </div>
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="line-clamp-1 text-lg">
                          {video.title}
                        </CardTitle>
                        <CardDescription>
                          {new Date(video.date).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
