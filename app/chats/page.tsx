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

type ChatMemory = {
  id: string;
  title: string;
  text: string;
};

type ChatApiResponse = {
  success: boolean;
  query: string;
  summary: string;
  results: ChatMemory[];
  meta?: {
    count: number;
    limit: number;
    offset: number;
  };
  message?: string;
};

const ChatPage = () => {
  const { data: user } = betterAuthClient.useSession();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState("");
  const [memories, setMemories] = useState<ChatMemory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setSummary("");
    setMemories([]);
    setError("");

    try {
      const res = await fetch(`/api/ai/chat?q=${encodeURIComponent(message)}`);
      const data: ChatApiResponse = await res.json();

      if (res.ok && data.success) {
        setSummary(data.summary);
        setMemories(data.results || []);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Header */}
      <div className="flex-row sticky top-0 z-50 w-full border-b bg-white text-black dark:text-white dark:bg-[#121212] border-gray-200 px-6 py-1 dark:border-gray-700 flex items-center justify-between">
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

      {/* Chat Area */}
      <div className="flex flex-1 items-center justify-center bg-white dark:bg-[#121212] px-4 py-10">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <BrainCircuit color="green" size={30} />
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-white">
              Hi, I&apos;m NeuroNote.
            </h1>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-center text-base sm:text-lg mb-8">
            How can I help you today?
          </p>

          {/* Chat Input */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mb-6">
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
              onClick={handleSend}
              disabled={loading}
            >
              <Send className="h-5 w-5 text-black dark:text-white" />
            </Button>
          </div>

          {/* Loading/Error */}
          {loading && (
            <p className="text-center text-sm text-muted-foreground mb-4">
              Thinking...
            </p>
          )}
          {error && (
            <p className="text-center text-sm text-red-500 mb-4">{error}</p>
          )}

          {/* AI Summary */}
          {summary && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg shadow">
              <h2 className="font-semibold mb-2 text-lg">AI Summary</h2>
              <p className="text-gray-800 dark:text-gray-200">{summary}</p>
            </div>
          )}

          {/* Relevant Memories */}
          {memories.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Relevant Memories</h2>
              {memories.map((m) => (
                <div
                  key={m.id}
                  className="p-4 border rounded-md dark:border-gray-700"
                >
                  <h3 className="font-semibold text-base mb-1">{m.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {m.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
