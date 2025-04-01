"use client";

import { useState } from "react";
import {
  Bell,
  Check,
  CreditCard,
  Globe,
  Lock,
  Moon,
  Save,
  Sun,
  User,
  Wallet,
  Github,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Toast } from "@repo/ui/components/ui/toast";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveSettings = () => {
    setIsLoading(true);

    // Simulate saving settings
    setTimeout(() => {
      setIsLoading(false);
      Toast({
        title: "Settings saved",
      });
    }, 1000);
  };

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8 lg:py-12 max-w-5xl mx-auto">
      <div className="flex flex-col gap-8 slide-up">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid grid-cols-4 md:grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline-block">Account</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              <span className="hidden sm:inline-block">Appearance</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline-block">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline-block">Billing</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline-block">Security</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-6 space-y-6 scale-in">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your account details and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john.doe@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="johndoe" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Preferences</h3>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="utc-8">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-12">UTC-12:00</SelectItem>
                        <SelectItem value="utc-8">UTC-08:00 (PST)</SelectItem>
                        <SelectItem value="utc-5">UTC-05:00 (EST)</SelectItem>
                        <SelectItem value="utc-0">UTC+00:00 (GMT)</SelectItem>
                        <SelectItem value="utc+1">UTC+01:00 (CET)</SelectItem>
                        <SelectItem value="utc+8">UTC+08:00 (CST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSaveSettings}
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
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="mt-6 space-y-6 scale-in">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of the application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme</h3>
                  <RadioGroup
                    defaultValue="dark"
                    className="grid grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="light"
                        id="theme-light"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="theme-light"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Sun className="mb-3 h-6 w-6" />
                        Light
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="dark"
                        id="theme-dark"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="theme-dark"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Moon className="mb-3 h-6 w-6" />
                        Dark
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="system"
                        id="theme-system"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="theme-system"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Globe className="mb-3 h-6 w-6" />
                        System
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Interface Density</h3>
                  <RadioGroup
                    defaultValue="comfortable"
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="comfortable"
                        id="density-comfortable"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="density-comfortable"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Comfortable
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="compact"
                        id="density-compact"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="density-compact"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Compact
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Animations</h3>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="animations"
                      className="flex flex-col space-y-1"
                    >
                      <span>Enable animations</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        Show animations and transitions in the interface
                      </span>
                    </Label>
                    <Switch id="animations" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSaveSettings}
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
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent
            value="notifications"
            className="mt-6 space-y-6 scale-in"
          >
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="email-processing-complete"
                        className="flex flex-col space-y-1"
                      >
                        <span>Processing complete</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Receive an email when video processing is complete
                        </span>
                      </Label>
                      <Switch id="email-processing-complete" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="email-new-features"
                        className="flex flex-col space-y-1"
                      >
                        <span>New features</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Receive updates about new features and improvements
                        </span>
                      </Label>
                      <Switch id="email-new-features" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="email-tips"
                        className="flex flex-col space-y-1"
                      >
                        <span>Tips and tutorials</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Receive tips and tutorials to get the most out of
                          OpenMux
                        </span>
                      </Label>
                      <Switch id="email-tips" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">In-App Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="inapp-processing-updates"
                        className="flex flex-col space-y-1"
                      >
                        <span>Processing updates</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Show notifications for video processing status updates
                        </span>
                      </Label>
                      <Switch id="inapp-processing-updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="inapp-system-notifications"
                        className="flex flex-col space-y-1"
                      >
                        <span>System notifications</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Show notifications for system updates and maintenance
                        </span>
                      </Label>
                      <Switch id="inapp-system-notifications" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSaveSettings}
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
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="mt-6 space-y-6 scale-in">
            <Card>
              <CardHeader>
                <CardTitle>Billing and Payments</CardTitle>
                <CardDescription>
                  Manage your subscription and payment methods.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Current Plan</h3>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">Pro Plan</h4>
                        <p className="text-sm text-muted-foreground">
                          $29/month, billed monthly
                        </p>
                        <div className="mt-2 flex items-center text-sm text-green-500">
                          <Check className="mr-1 h-4 w-4" />
                          Active
                        </div>
                      </div>
                      <Button variant="outline">Change Plan</Button>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">
                        Next billing date: April 15, 2023
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Payment Methods</h3>
                    <Button variant="outline" size="sm">
                      Add Method
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <CreditCard className="h-6 w-6" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">
                            Expires 12/24
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
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
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Billing History</h3>
                  <div className="rounded-lg border">
                    <div className="flex items-center justify-between border-b p-4">
                      <div>
                        <p className="font-medium">Pro Plan - Monthly</p>
                        <p className="text-sm text-muted-foreground">
                          March 15, 2023
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">$29.00</p>
                        <Button variant="ghost" size="sm">
                          Receipt
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-b p-4">
                      <div>
                        <p className="font-medium">Pro Plan - Monthly</p>
                        <p className="text-sm text-muted-foreground">
                          February 15, 2023
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">$29.00</p>
                        <Button variant="ghost" size="sm">
                          Receipt
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Pro Plan - Monthly</p>
                        <p className="text-sm text-muted-foreground">
                          January 15, 2023
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">$29.00</p>
                        <Button variant="ghost" size="sm">
                          Receipt
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6 space-y-6 scale-in">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and authentication methods.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <Button className="gap-2 transition-all hover:scale-105">
                    <Lock className="h-4 w-4" />
                    Update Password
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Two-Factor Authentication
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p>Enhance your account security by enabling 2FA</p>
                      <p className="text-sm text-muted-foreground">
                        We'll ask for a verification code in addition to your
                        password when you sign in.
                      </p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Connected Accounts</h3>
                  <div className="space-y-2">
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
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sessions</h3>
                  <div className="rounded-lg border">
                    <div className="flex items-center justify-between border-b p-4">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">
                          Chrome on Windows • New York, USA
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                        <span className="text-sm text-muted-foreground">
                          Active now
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Previous Session</p>
                        <p className="text-sm text-muted-foreground">
                          Safari on macOS • San Francisco, USA
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          2 days ago
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Sign Out All Other Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
