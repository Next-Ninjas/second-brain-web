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
  const { data: memories = [], isLoading } = useQuery({
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

  return (
    <div className="w-full space-y-4">
   

      {isLoading ? (
        <div className="flex items-center justify-center">
        <Spinner className="h-6 w-6 text-green-500" />
        </div>
      ) : (
        memories.map((memory: Memory) => (
          <div
            key={memory.id}
            className="bg-muted text-foreground p-4 rounded-lg shadow-sm border border-border"
          >
            {/* Title */}
            <div className="font-bold text-sm mb-1 truncate">
              {memory.title}
            </div>

            {/* Content + Read more */}
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>
                {memory.content.length > 20
                  ? memory.content.slice(0, 20) + "..."
                  : memory.content}
              </span>
              <Link
                href={`/memories/${memory.id}`}
                className="text-green-500 text-xs font-medium hover:underline"
              >
                Read more →
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
