"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import { UserIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: user } = betterAuthClient.useSession();
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Header */}
      <div className="flex-row sticky top-0 z-50 w-full border-b bg-white dark:bg-[#121212] border-gray-200 px-6 py-1 dark:border-gray-700  flex items-center justify-between">
        <h1 className="text-xl font-bold">Sticky Header</h1>
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
                <Avatar className="h-10 w-10 rounded-2xl">
                  <AvatarImage
                    src={user?.user.image || "https://github.com/shadcn.png"}
                    alt={user?.user.name || "User"}
                  />
                  <AvatarFallback>
                    {user?.user.name?.charAt(0).toUpperCase() || "U"}
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
                  if (response.data) router.replace("/log-in");
                }}
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 p-4 space-y-1">
        {Array.from({ length: 100 }).map((_, i) => (
          <p key={i} className="text-sm">
            This is some scrollable content item {i + 1}.
          </p>
        ))}
      </div>
      <div className="flex-row sticky bottom-0 z-50 w-full border-b  dark:bg-[#121212] border-gray-200 dark:border-gray-700 p-4 flex items-center justify-center">
        <h1 className="text-xl font-bold">Sticky Header</h1>
        </div>
    </div>
  );
};

export default Page;
