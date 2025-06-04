"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { serverUrl } from "@/lib/environment";
import { Skeleton } from "@/components/ui/skeleton";

import { z } from "zod";
import { memorySchema } from "@/lib/extras/schemas/searchSchema";

// Infer the Memory type from Zod schema
type Memory = z.infer<typeof memorySchema>;

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery<Memory[]>({
    queryKey: ["search", query],
    queryFn: async () => {
      const res = await fetch(
        `${serverUrl}/dashboard/search?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to fetch search results");

      const result = await res.json();
      return z.array(memorySchema).parse(result.data);
    },
    enabled: !!query,
  });

  if (!query) return <p className="text-gray-500">No query provided.</p>;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 border rounded shadow">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-3 w-1/3 mt-2" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    console.error("Error:", error);
    return <p className="text-red-500">Error loading search results.</p>;
  }

  if (!data?.length) {
    return <p className="text-gray-500">No results found.</p>;
  }

  return (
    <>
      {data.map((memory: Memory) => (
        <div
          key={memory.id}
          className="p-4 border rounded shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900"
          onClick={() => router.push(`/memories/${memory.id}`)}
        >
          <h2 className="text-lg font-semibold hover:underline">
            {memory.title}
          </h2>
          <p className="text-sm text-gray-600 mt-1">{memory.content}</p>

          <div className="flex flex-wrap gap-2 mt-2">
            {memory.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="text-xs text-gray-500 mt-2">
            Created on{" "}
            {new Date(memory.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      ))}
    </>
  );
}
