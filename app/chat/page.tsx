"use client";

import { useState, useEffect } from "react";
import {
  BrainCircuit,
  Plus,
  Search,
  Menu,
  LogOutIcon,
  UserIcon,
  Send,
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";

const serverUrl = "http://localhost:3000"; // replace with your backend API

const staticMenuItems = [
  {
    title: "New Chat",
    url: "/chats",
    icon: Plus,
  },
  {
    title: "My Memories",
    url: "/dashboard/search",
    icon: Search,
  },
];

type ChatSession = {
  id: string;
  title: string;
  content: string;
};

export default function Page() {
  const [collapsed, setCollapsed] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const { data: user } = betterAuthClient.useSession();
  const router = useRouter();

  // Chat page state
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState("");
  const [animatedSummary, setAnimatedSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Fetch chat sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch(`${serverUrl}/chats/all/sessions`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setSessions(data.sessions);
        }
      } catch (err) {
        console.error("Failed to fetch sessions", err);
      }
    };

    fetchSessions();
  }, []);

  // Typing animation for summary
  useEffect(() => {
    if (summary) {
      let i = 0;
      setAnimatedSummary("");
      const interval = setInterval(() => {
        setAnimatedSummary((prev) => prev + summary.charAt(i));
        i++;
        if (i >= summary.length) clearInterval(interval);
      }, 25);
      return () => clearInterval(interval);
    }
  }, [summary]);

  // Handle sending chat message
  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setSummary("");
    setAnimatedSummary("");
    setError("");

    try {
      let currentSessionId = sessionId;

      if (!sessionId) {
        const res = await fetch(`${serverUrl}/chats/session`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: "New Chat" }),
        });

        const data = await res.json();
        if (!res.ok || !data.success)
          throw new Error(data.message || "Failed to create session");

        currentSessionId = data.session.id;
        setSessionId(currentSessionId);
      }

      const res = await fetch(`${serverUrl}/chats/${currentSessionId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Failed to send message");

      setSummary(data.reply);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`row-span-3 bg-[#212121] text-white transition-all duration-300 relative ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className="flex flex-row justify-start items-center gap-2 px-4 py-6 ">
          <Link href={"/dashboard"}>
            <BrainCircuit size={32} />
          </Link>
          {!collapsed && <span className="font-extrabold ">Nuronote</span>}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-[4.5rem] -right-3 w-6 h-6 bg-white text-black rounded-full flex items-center justify-center shadow-md"
        >
          <Menu size={14} />
        </button>

        {/* Static Menu */}
        <nav className="mt-4 space-y-2 px-2">
          {staticMenuItems.map(({ title, url, icon: Icon }) => (
            <Link
              key={title}
              href={url}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-white/10"
            >
              <Icon size={20} />
              {!collapsed && <span>{title}</span>}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <hr className="my-4 border-white/20 mx-2" />

        {/* Sessions */}
        <div className="px-2">
          {!collapsed && (
            <h3 className="text-sm font-semibold mb-2">Recent Sessions</h3>
          )}
          <ul className="space-y-1">
            {sessions.map((session) => (
              <li key={session.id}>
                <Link
                  href={`/chats/${session.id}`}
                  className="block p-2 rounded-md hover:bg-white/10"
                >
                  {!collapsed ? (
                    <div className="truncate text-sm font-medium">
                      {session.content?.slice(0, 30) || "No content"}
                    </div>
                  ) : (
                    <span className="sr-only">{session.title}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Header */}
      <header className="col-span-1 font-bold text-lg bg-background text-foreground ">
        <div className="flex items-center justify-end p-4">
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
          <ModeToggle />
        </div>
        {/* Divider */}
        <hr className="my-4 dark:border-white/20 border-gray-400  mx-2" />
      </header>

      {/* Main Content - Chat Area */}
      <main className="col-span-1 bg-background text-foreground p-4 flex flex-col min-h-full">
        {/* Intro Header */}
        {!summary && !loading && (
          <>
            <div className="flex items-center justify-center gap-2 mb-4">
              <BrainCircuit color="green" size={30} />
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-white">
                Hi, I&apos;m NeuroNote.
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-center text-base sm:text-lg mb-8">
              How can I help you today?
            </p>
          </>
        )}

        {/* AI Response */}
        {!loading && animatedSummary && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg shadow">
            <h2 className="font-semibold mb-2 text-lg">AI Summary</h2>
            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
              {animatedSummary}
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <p className="text-center text-sm text-muted-foreground mb-4">
            Thinking...
          </p>
        )}

        {/* Input */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mt-auto">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-neutral-800 dark:text-white placeholder:text-gray-400"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
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

        {/* Error */}
        {error && (
          <p className="text-center text-sm text-red-500 mt-2">{error}</p>
        )}
      </main>

   
    </div>
  );
}
