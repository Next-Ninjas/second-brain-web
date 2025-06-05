"use client";

import { useState, useEffect, useRef } from "react";
import {
  BrainCircuit,
  Plus,
  Search,
  Menu,
  LogOutIcon,
  UserIcon,
  Send,
  Sparkles,
  X,
  ChevronLeft, // Added for collapse icon
  ChevronRight,
  BotMessageSquare, // Added for expand icon
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/ModeToggle";
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
import { serverUrl } from "@/lib/environment";
import { useQueryClient } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";


type ChatSession = {
  id: string;
  title: string;
  createdAt: Date;
  messages: {
    id: string;
    role: string;
    content: string;
    createdAt: Date;
  }[];
};

type ChatMessage = {
  id: string;
  role: string;
  content: string;
  createdAt: Date;
};

type Memory = {
  id: string;
  title: string;
  content: string;
  relevanceScore?: number;
};

export default function Page() {
  const [collapsed, setCollapsed] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { data: user } = betterAuthClient.useSession();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamingRef = useRef<NodeJS.Timeout | null>(null);
  const queryClient = useQueryClient();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sessionMessages, setSessionMessages] = useState<ChatMessage[]>([]);
  const [relevantMemories, setRelevantMemories] = useState<Memory[]>([]);
  const [showMemories, setShowMemories] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<{
    id: string;
    content: string;
    fullContent: string;
    index: number;
  } | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch sessions on mount
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch(`${serverUrl}/chats/all/sessions`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.success) {
          const safeSessions = data.sessions.map((s: ChatSession) => ({
            ...s,
            messages: s.messages || [],
          }));
          setSessions(safeSessions);

          if (safeSessions.length > 0) {
            setActiveSessionId(safeSessions[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch sessions", err);
      }
    };
    fetchSessions();
  }, []);

  // Fetch messages when active session changes
  useEffect(() => {
    const fetchSessionMessages = async () => {
      if (!activeSessionId) return;

      try {
        const messagesRes = await fetch(
          `${serverUrl}/chats/${activeSessionId}/messages`,
          { credentials: "include" }
        );
        const messagesData = await messagesRes.json();
        if (messagesRes.ok && messagesData.success) {
          setSessionMessages(messagesData.messages || []);
        }
      } catch (err) {
        console.error("Failed to fetch messages", err);
        setSessionMessages([]);
      }
    };

    fetchSessionMessages();
  }, [activeSessionId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [sessionMessages, streamingMessage]);

 

  // Handle streaming effect
  useEffect(() => {
    if (streamingMessage) {
      if (streamingRef.current) clearInterval(streamingRef.current);

      streamingRef.current = setInterval(() => {
        setStreamingMessage((prev) => {
          if (!prev) return null;

          if (prev.index < prev.fullContent.length) {
            const newContent = prev.fullContent.slice(0, prev.index + 1);
            return {
              ...prev,
              content: newContent,
              index: prev.index + 1,
            };
          } else {
            clearInterval(streamingRef.current as NodeJS.Timeout);
            streamingRef.current = null;

            // ✅ Push final assistant message to both query cache and state
            const completedMessage = {
              id: prev.id,
              content: prev.fullContent,
              role: "assistant",
              createdAt: new Date(),
            };

            // Push to local state immediately
            setSessionMessages((old) => {
              const exists = old.find((m) => m.id === completedMessage.id);
              return exists ? old : [...old, completedMessage];
            });

            // Push to query cache
            queryClient.setQueryData<ChatMessage[]>(
              ["sessionMessages", activeSessionId],
              (oldMessages) => {
                if (!oldMessages) return [completedMessage];
                const exists = oldMessages.find(
                  (m) => m.id === completedMessage.id
                );
                return exists
                  ? oldMessages
                  : [...oldMessages, completedMessage];
              }
            );
            

            return null; // Clear streamingMessage
          }
        });
      }, 20);
    }

    return () => {
      if (streamingRef.current) {
        clearInterval(streamingRef.current);
        streamingRef.current = null;
      }
    };
  }, [streamingMessage, queryClient, activeSessionId]);
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNewChat = async () => {
    if (activeSessionId && sessionMessages.length === 0) return;

    setLoading(true);
    try {
      const res = await fetch(`${serverUrl}/chats/session`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Chat" }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setActiveSessionId(data.session.id);
        setSessionMessages([]);
        setRelevantMemories([]);
        setMessage("");
      }
    } catch (err) {
      console.error("Failed to create session", err);
      setError("Failed to create new chat session");
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async (): Promise<ChatSession[]> => {
    try {
      const res = await fetch(`${serverUrl}/chats/all/sessions`, {
        credentials: "include",
      });
      const data: { success: boolean; sessions: ChatSession[] } =
        await res.json();

      if (res.ok && data.success) {
        const safeSessions = data.sessions.map((s) => ({
          ...s,
          messages: s.messages || [],
        }));
        setSessions(safeSessions);
        return safeSessions;
      }
    } catch (err) {
      console.error("Failed to fetch sessions", err);
    }
    return [];
  };
  
  const handleSend = async () => {
    if (!message.trim() || !activeSessionId) return;
    setLoading(true);
    setError("");

    // Optimistically add user message
    const tempId = `temp-${Date.now()}`;
    const userMessage = {
      id: tempId,
      role: "user",
      content: message,
      createdAt: new Date(),
    };
    setSessionMessages((prev) => [...prev, userMessage]);
    const currentMessage = message;
    setMessage("");

    try {
      const res = await fetch(`${serverUrl}/chats/${activeSessionId}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentMessage }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send message");
      }

      // Set relevant memories from response
      setRelevantMemories(data.memoryRecords || []);

      // Start streaming effect for assistant reply
      const reply =
        typeof data.reply === "string"
          ? data.reply
          : "I don't know how to respond.";

      setStreamingMessage({
        id: `stream-${Date.now()}`,
        content: "",
        fullContent: reply,
        index: 0,
      });

      // Refresh sessions list
      await fetchSessions();
    } catch (err) {
      console.error(err);
      setError("An error occurred while sending your message");
      setSessionMessages((prev) => prev.filter((msg) => msg.id !== tempId));
      setMessage(currentMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (sessionId: string) => {
    try {
      const res = await fetch(`${serverUrl}/chats/${sessionId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        const updatedSessions = sessions.filter((s) => s.id !== sessionId);
        setSessions(updatedSessions);

        if (activeSessionId === sessionId) {
          setActiveSessionId(updatedSessions[0]?.id || null);
          setSessionMessages([]);
          setRelevantMemories([]);
        }
      }
    } catch (err) {
      console.error("Failed to delete session", err);
      setError("Failed to delete session");
    }
  };

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  return (
    <div className="h-screen flex flex-col md:grid md:grid-cols-[minmax(0,16rem)_1fr] md:grid-rows-[auto_1fr] bg-background text-foreground">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden p-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <BrainCircuit size={24} />
          <span className="font-extrabold">Nuronote</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileSidebarOpen(true)}
        >
          <Menu size={24} />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-[#212121] text-white transition-all duration-300 flex flex-col md:row-span-2 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${collapsed ? "w-16" : "w-64"}`}
      >
        <div className="flex flex-row justify-between items-center px-4 py-6">
          <div className="flex items-center gap-2">
            <Link href={"/dashboard"}>
              <BrainCircuit size={32} />
            </Link>
            {!collapsed && <span className="font-extrabold">Nuronote</span>}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mt-4 space-y-2 px-2">
          <button
            onClick={handleNewChat}
            disabled={activeSessionId !== null && sessionMessages.length === 0}
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-white/10 w-full text-left ${
              activeSessionId !== null && sessionMessages.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <Plus size={20} />
            {!collapsed && <span>New Chat</span>}
          </button>

          <Link
            href="/dashboard/search"
            className="flex items-center gap-3 p-2 rounded-md hover:bg-white/10"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <Search size={20} />
            {!collapsed && <span>My Memories</span>}
          </Link>
        </nav>

        <hr className="my-4 border-white/20 mx-2" />

        <div className="px-2 flex-1 overflow-y-auto">
          {!collapsed && (
            <h3 className="text-sm font-semibold mb-2 sticky top-0 bg-[#212121] py-2 z-10">
              Recent Sessions
            </h3>
          )}
          <ul className="space-y-1">
            {sessions.map((session) => (
              <li key={session.id} className="group relative">
                <button
                  onClick={() => {
                    setActiveSessionId(session.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`block p-2 rounded-md hover:bg-white/10 w-full text-left truncate ${
                    activeSessionId === session.id ? "bg-white/20" : ""
                  }`}
                >
                  <div className="truncate">
                    {!collapsed ? (
                      <>
                        <div className="font-medium truncate">
                          {session.title || " Chats"}
                        </div>
                        {session.messages.length > 0 && (
                          <div className="text-[15px] text-gray-400 truncate">
                            {session.messages[
                              session.messages.length - 1
                            ].content.slice(0, 20)}
                            {session.messages[session.messages.length - 1]
                              .content.length > 20 && "..."}
                          </div>
                        )}
                      </>
                    ) : (
                      <BotMessageSquare size={16} />
                    )}
                  </div>
                </button>
                {!collapsed && (
                  <button
                    onClick={() => deleteSession(session.id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
                    title="Delete session"
                  >
                    ×
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className=" md:block absolute top-20 -right-3 w-6 h-6 bg-white text-black rounded-full flex items-center justify-center shadow-md z-50"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* Header */}
      <header className="w-full px-4 py-2 sm:px-6 sm:py-4 md:col-start-2 ">
        <div className="flex items-center justify-between py-2">
          <div className="text-lg font-bold">
            {activeSession ? "Chats" : "Select a chat"}
          </div>
          <div className="flex items-center gap-4">
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
                        src={
                          user?.user.image || "https://github.com/shadcn.png"
                        }
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
            <ModeToggle />
          </div>
        </div>
        <Separator />
      </header>

      {/* Main Content */}
      <main className="w-full flex flex-col min-h-0 md:col-start-2 md:row-start-2">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {!activeSessionId && (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <BrainCircuit color="green" size={30} />
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-white">
                  Hi, I&apos;m NeuroNote.
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-center text-base sm:text-lg mb-8">
                How can I help you today?
              </p>
              <Button onClick={handleNewChat} className="gap-2">
                <Plus size={16} /> Start New Chat
              </Button>
            </div>
          )}

          {activeSessionId && sessionMessages?.length === 0 && !loading && (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="text-center">
                <BrainCircuit className="mx-auto mb-4" size={40} />
                <h3 className="text-xl font-semibold">
                  What&apos;s on your mind?
                </h3>
                <p className="text-muted-foreground mt-2">
                  Start a conversation with NeuroNote
                </p>
              </div>
            </div>
          )}

          {activeSessionId && (
            <>
              {/* Relevant Memories Panel */}
              {relevantMemories.length > 0 && (
                <div className="mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowMemories(!showMemories)}
                    className="gap-2 mb-2"
                  >
                    <Sparkles size={16} />
                    {showMemories
                      ? "Hide Relevant Memories"
                      : "Show Relevant Memories"}
                  </Button>

                  {showMemories && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Sparkles size={16} />
                        Relevant Memories
                      </h4>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {relevantMemories.map((memory) => (
                          <div
                            key={memory.id}
                            className="p-3 bg-white dark:bg-gray-800 rounded border"
                          >
                            <div className="font-medium">
                              {memory.title || "Untitled Memory"}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              {memory.content}
                            </div>
                            {memory.relevanceScore && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Relevance:{" "}
                                {Math.round(memory.relevanceScore * 100)}%
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Chat Messages */}
              {(sessionMessages.length > 0 ||
                (streamingMessage &&
                  !sessionMessages.some(
                    (msg) => msg.id === streamingMessage.id
                  ))) && (
                <div className="space-y-4 pb-4">
                  {sessionMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-lg max-w-3xl mx-auto whitespace-pre-wrap break-words ${
                        msg.role === "user"
                          ? "bg-blue-100 dark:bg-blue-900/30 ml-auto"
                          : "bg-green-100 dark:bg-green-900/30"
                      }`}
                    >
                      <div className="font-semibold mb-1">
                        {msg.role === "user" ? "You" : "NeuroNote"}
                      </div>
                      <div className="text-sm text-gray-800 dark:text-gray-200">
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  {streamingMessage &&
                    !sessionMessages.some(
                      (msg) => msg.id === streamingMessage.id
                    ) && (
                      <div className="p-4 rounded-lg max-w-3xl mx-auto bg-green-100 dark:bg-green-900/30 whitespace-pre-wrap break-words">
                        <div className="font-semibold mb-1">NeuroNote</div>
                        <div className="text-sm text-gray-800 dark:text-gray-200">
                          {streamingMessage.content}
                          {streamingMessage.content.length <
                            streamingMessage.fullContent.length && (
                            <span className="inline-block ml-1 h-2 w-2 bg-current rounded-full animate-pulse"></span>
                          )}
                        </div>
                      </div>
                    )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </>
          )}

          {loading && !streamingMessage && (
            <div className="flex justify-center py-4">
              <div className="animate-pulse">Thinking...</div>
            </div>
          )}
        </div>

        {/* Fixed Input Bar */}
        <div className="sticky bottom-5 bg-background  px-4 py-3">
          <div className="max-w-screen-md mx-auto">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-muted rounded-xl px-4 py-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground text-foreground"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={loading || !activeSessionId}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSend}
                disabled={loading || !activeSessionId || !message.trim()}
                className="self-end sm:self-auto"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>

            {error && (
              <p className="text-center text-sm text-red-500 mt-2">{error}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
