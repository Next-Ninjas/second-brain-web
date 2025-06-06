"use client";

import React, {  useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DeleteButton from "../delete-memory/DeleteButton";
import { serverUrl } from "@/lib/environment";
import { feedSchema, type Memory } from "@/lib/extras/schemas/memorySchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const FeedPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const limit = 4;

  const { data: tagData } = useQuery<string[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await fetch(`${serverUrl}/tags/me/all`, {
        credentials: "include",
      });
      const json = await res.json();
      return json.tags;
    },
  });

  const {
    data = [],
    error,
    isPending,
    refetch,
  } = useQuery<Memory[]>({
    queryKey: ["feeds", page, searchTerm, selectedTags],
    queryFn: async () => {
      const url = new URL(`${serverUrl}/dashboard/search`);
      url.searchParams.set("q", searchTerm);
      url.searchParams.set("limit", `${limit}`);
      url.searchParams.set("offset", `${(page - 1) * limit}`);

      const res = await fetch(url.toString(), { credentials: "include" });
      const json = await res.json();
      return feedSchema.parse(json.data);
    },
    placeholderData: keepPreviousData,
  });

  const applyTagFilter = () => {
    setSearchTerm(selectedTags.join(" "));
    setPage(1);
    refetch();
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="relative">
      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Search & Filter Buttons */}
        <div className="flex gap-2 mb-2">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, content, or tags"
          />
          <Button onClick={() => refetch()}>Search</Button>
          <Button variant="outline" onClick={() => setShowFilter(!showFilter)}>
            Filter Tags
          </Button>
        </div>

        {/* Selected Tags Displayed */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                variant="default"
                className="flex items-center gap-1"
              >
                {tag}
                <X
                  className="w-3 h-3 ml-1 cursor-pointer"
                  onClick={() => toggleTag(tag)}
                />
              </Badge>
            ))}
          </div>
        )}

        {/* Tag Filter Popup */}
        {showFilter && tagData && tagData.length > 0 && (
          <div className="absolute top-[4.5rem] right-4 z-10 w-64">
            <ScrollArea className="h-72 rounded-md border bg-background p-3 shadow-md">
              <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                Filter Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {tagData.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <Badge
                      key={tag}
                      variant={isSelected ? "default" : "outline"}
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                      {isSelected && (
                        <X
                          className="w-3 h-3 ml-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTag(tag);
                          }}
                        />
                      )}
                    </Badge>
                  );
                })}
              </div>

              {selectedTags.length > 0 && (
                <div className="flex justify-between gap-2 mt-4">
                  <Button size="sm" onClick={applyTagFilter}>
                    Apply
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedTags([])}
                  >
                    Clear All
                  </Button>
                </div>
              )}
            </ScrollArea>
          </div>
        )}

        {/* Loading & Error States */}
        {isPending ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-4 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          data.map((post) => (
            <Card
              key={post.id}
              className="mb-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              <CardHeader>
                <h2
                  className="text-xl font-semibold hover:underline"
                  onClick={() => router.push(`/dashboard/memories/${post.id}`)}
                >
                  {post.title}
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {post.content.length > 200
                    ? `${post.content.slice(0, 200)}...`
                    : post.content}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-xs text-muted-foreground">
                  {new Date(post.createdAt).toLocaleString()}
                </span>
                <DeleteButton postId={post.id} authorId={post.userId || ""} />
              </CardFooter>
            </Card>
          ))
        )}

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-muted-foreground">Page {page}</span>
          <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
