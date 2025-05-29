"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BrainCircuit, LogOutIcon, Send, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const { data: user } = betterAuthClient.useSession();
  const router = useRouter();
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Header */}
      <div className="flex-row sticky top-0 z-50 w-full border-b bg-white dark:bg-[#121212] border-gray-200 px-6 py-1 dark:border-gray-700 flex items-center justify-between">
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

      {/* Fullscreen Centered Chat Area */}
      <div className="flex flex-1 items-center justify-center bg-white dark:bg-[#121212] px-4 py-10">
        <div className="w-full max-w-2xl text-center">
          {/* Header Row */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <BrainCircuit color="green" size={30} />
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-white">
              Hi, I&apos;m NeuroNote.
            </h1>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mb-8">
            How can I help you today?
          </p>

          {/* Chat Input */}
          <div className="w-full">
            <div className="flex items-center w-full gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-neutral-800 dark:text-white placeholder:text-gray-400"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  console.log("Sending:", message);
                  setMessage("");
                }}
              >
                <Send className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
