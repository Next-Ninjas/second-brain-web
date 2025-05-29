"use client";

import Link from "next/link";
import { BrainCircuit, Github, LogOutIcon, UserIcon } from "lucide-react";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { data: user } = betterAuthClient.useSession();
  return (
    <header className="sticky top-0 z-50 w-full border-b text-black dark:text-white dark:border-green-200 border-green-400 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <BrainCircuit color="green" size={30} />
          <span className="font-semibold text-lg">NeuroNote</span>
        </div>

        {/* Right-side icons: GitHub and ModeToggle */}
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/orgs/Next-Ninjas/repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <Github size={24} />
          </Link>
          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user?.user.image || "https://github.com/shadcn.png"}
                    alt={user?.user.name || "User"}
                  />
                  <AvatarFallback>
                    {user?.user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">{user?.user.name}</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user?.user.image || "https://github.com/shadcn.png"}
                      alt={user?.user.name || "User"}
                    />
                    <AvatarFallback>
                      {user?.user.name.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="truncate font-medium">
                      {user?.user.name}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    const response = await betterAuthClient.signOut();
                    if (response.data) router.replace("/");
                  }}
                >
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
