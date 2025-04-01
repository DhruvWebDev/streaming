"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github, Loader2, Video } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import { Separator } from "@repo/ui/components/ui/separator";
import { ThemeToggle } from "@repo/ui/components/theme-toggle";
import { WalletConnectButton } from "@repo/ui/components/wallet-connect-button";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOAuthLoading, setIsOAuthLoading] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  const handleOAuthLogin = (provider: string) => {
    setIsOAuthLoading(provider);

    // Simulate OAuth login process
    setTimeout(() => {
      setIsOAuthLoading(null);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col dark">
      <header className="border-b border-border">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Video className="h-6 w-6" />
            <span className="text-xl font-bold">OpenMux</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 bg-gradient-to-b from-background to-secondary/10">
        <div className="mx-auto max-w-md space-y-6 w-full fade-in">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome to OpenMux</h1>
            <p className="text-muted-foreground">
              Sign in to your account or create a new one
            </p>
          </div>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="scale-in">
              <Card>
                <form onSubmit={handleLogin}>
                  <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                      Enter your email and password to access your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link
                          href="/forgot-password"
                          className="text-sm text-primary underline-offset-4 hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input id="password" type="password" required />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button
                      type="submit"
                      className="w-full transition-all hover:scale-105"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Logging in...
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button>

                    <div className="relative flex items-center justify-center w-full">
                      <Separator className="w-full" />
                      <span className="absolute bg-card px-2 text-xs text-muted-foreground">
                        Or continue with
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleOAuthLogin("github")}
                        disabled={isOAuthLoading !== null}
                        className="transition-all hover:scale-105"
                      >
                        {isOAuthLoading === "github" ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Github className="mr-2 h-4 w-4" />
                        )}
                        GitHub
                      </Button>
                      <WalletConnectButton />
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="signup" className="scale-in">
              <Card>
                <form onSubmit={handleSignup}>
                  <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                      Create a new account to get started
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" required />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button
                      type="submit"
                      className="w-full transition-all hover:scale-105"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Create account"
                      )}
                    </Button>

                    <div className="relative flex items-center justify-center w-full">
                      <Separator className="w-full" />
                      <span className="absolute bg-card px-2 text-xs text-muted-foreground">
                        Or continue with
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleOAuthLogin("github")}
                        disabled={isOAuthLoading !== null}
                        className="transition-all hover:scale-105"
                      >
                        {isOAuthLoading === "github" ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Github className="mr-2 h-4 w-4" />
                        )}
                        GitHub
                      </Button>
                      <WalletConnectButton />
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="border-t border-border py-6">
        <div className="container flex flex-col items-center justify-center gap-4 text-center md:gap-6">
          <div className="flex items-center gap-2">
            <Video className="h-6 w-6" />
            <span className="text-lg font-bold">OpenMux</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2023 OpenMux Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
