"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { serverUrl } from "@/lib/environment";

interface Memory {
  id: string;
  title: string;
  content: string;
}

export default function RecentMemoriesList() {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const res = await fetch(`${serverUrl}/memory/recent?limit=5`);
        const data = await res.json();
        setMemories(data);
      } catch (err) {
        console.error("Failed to fetch recent memories:", err);
      }
    };

    fetchMemories();
  }, []);

  return (
    <ul className="list bg-base-100 rounded-box shadow-md w-full p-4 space-y-4">
      <li className="text-xs opacity-60 tracking-wide">Recent Memories</li>

      {memories.map((memory) => (
        <li key={memory.id} className="list-row border-b border-base-200 pb-4">
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
      ))}
    </ul>
  );
}
