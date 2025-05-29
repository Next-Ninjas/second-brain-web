"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { serverUrl } from "@/lib/environment";

interface Memory {
  id: string;
  title: string;
  content: string;
}

export default function RecentMemoriesList() {
  const { data: memories = [], isLoading } = useQuery({
    queryKey: ["recent-memories"],
    queryFn: async () => {
      const res = await fetch(`${serverUrl}/memories/recent?limit=5`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch recent memories");
      return res.json();
    },
    staleTime: 1000 * 60, // optional: 1 min cache
  });

  return (
    <ul className="list bg-base-100 rounded-box shadow-md w-full p-4 space-y-4">
      <li className="text-xs opacity-60 tracking-wide">Recent Memories</li>

      {isLoading ? (
        <li className="text-sm text-muted-foreground">Loading...</li>
      ) : (
        memories.map((memory: Memory) => (
          <li
            key={memory.id}
            className="list-row border-b border-base-200 pb-4"
          >
            <div className="text-md font-semibold">{memory.title}</div>
            <div className="text-xs opacity-60 mt-1">
              {memory.content.length > 80
                ? memory.content.slice(0, 80) + "..."
                : memory.content}
            </div>
            <Link
              href={`/memory/${memory.id}`}
              className="text-green-500 text-sm mt-2 inline-block hover:underline"
            >
              Read more →
            </Link>
          </li>
        ))
      )}
    </ul>
  );
}
