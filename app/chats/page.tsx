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
import { useEffect, useState } from "react";
import { serverUrl } from "@/lib/environment";
import { ModeToggle } from "@/components/ui/ModeToggle";

const ChatPage = () => {
  const { data: user } = betterAuthClient.useSession();
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState("");
  const [animatedSummary, setAnimatedSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);

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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Header */}
      
      {/* Chat Area */}
      <div className="flex flex-1 items-center justify-center bg-white dark:bg-[#121212] px-4 py-10">
        <div className="w-full max-w-2xl">
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

          {/* Error */}
          {error && (
            <p className="text-center text-sm text-red-500 mb-4">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
