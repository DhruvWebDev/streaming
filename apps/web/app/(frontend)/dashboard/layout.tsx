"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  FileVideo,
  Grid,
  LogOut,
  Menu,
  Settings,
  Upload,
  User,
  Video,
} from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@repo/ui/components/ui/sheet";
import { ThemeToggle } from "@repo/ui/components/theme-toggle";
import { WalletConnectButton } from "@repo/ui/components/wallet-connect-button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Grid },
    { name: "My Videos", href: "/dashboard/videos", icon: FileVideo },
    { name: "Upload", href: "/dashboard/upload", icon: Upload },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Profile", href: "/dashboard/profile", icon: User },
  ];

  return (
    <div className="flex min-h-screen flex-col dark">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-72 border-border bg-background"
              >
                <div className="flex items-center gap-2 pb-4 pt-2">
                  <Video className="h-6 w-6" />
                  <span className="text-xl font-bold">OpenMux</span>
                </div>
                <nav className="grid gap-2 py-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? "bg-secondary text-secondary-foreground"
                          : "hover:bg-secondary/50"
                      }`}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/dashboard" className="flex items-center gap-2">
              <Video className="h-6 w-6" />
              <span className="text-xl font-bold hidden md:inline-block">
                OpenMux
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <WalletConnectButton />
            <ThemeToggle />
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <User className="h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Settings className="h-4 w-4" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-gradient-to-b from-background to-background/80">
        {children}
      </main>
    </div>
  );
}
