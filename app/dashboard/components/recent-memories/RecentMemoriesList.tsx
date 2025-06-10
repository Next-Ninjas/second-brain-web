"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { serverUrl } from "@/lib/environment";
import { Spinner } from "@/components/ui/spinner";

interface Memory {
  id: string;
  title: string;
  content: string;
}

export default function RecentMemoriesList() {
  const { data: memories = [], isLoading } = useQuery<Memory[]>({
    queryKey: ["recent-memories"],
    queryFn: async () => {
      const res = await fetch(`${serverUrl}/memories/recent?limit=4`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch recent memories");
      return res.json();
    },
    staleTime: 1000 * 60,
  });

  // ✅ Do not render the box if no data and not loading
  if (!isLoading && memories.length === 0) {
    return null;
  }

  return (
    <div className="mockup-window border border-gray-700 dark:bg-background text-foreground">
      {/* Title */}
      <div className="flex items-center justify-center p-4 border-b border-gray-700">
        <h2 className="font-bold text-lg">Recent Memories</h2>
      </div>

      {/* Body */}
      <div className="p-4 h-[400px] overflow-y-auto space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner className="h-6 w-6 text-green-500" />
          </div>
        ) : (
          memories.map((memory) => (
            <div
              key={memory.id}
              className="bg-muted text-foreground p-4 rounded-lg shadow-sm border border-border"
            >
              <div className="font-bold text-sm mb-1 truncate">
                {memory.title}
              </div>

              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>
                  {memory.content.length > 20
                    ? memory.content.slice(0, 20) + "..."
                    : memory.content}
                </span>
                <Link
                  href={`/dashboard/memories/${memory.id}`}
                  className="text-green-500 text-xs font-medium hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
