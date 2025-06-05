
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { serverUrl } from "@/lib/environment";
import { forwardableHeaders } from "@/lib/extras/headers";


import React from "react";

interface Memory {
  id: string;
  userId: string;
  title: string | null;
  content: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: string; // use string for date serialization
  updatedAt: string;
}

const MemoryPage = async ({
  params,
}: {
  params: Promise<{ memId: string }>;
}) => {
  const memId = (await params).memId;

  const response = await fetch(`${serverUrl}/dashboard/memories/${memId}`, {
    method: "GET",
    credentials: "include",
    headers: await forwardableHeaders(),
  });

  const data: Memory = await response.json();

  return (
    <>
      <div className="relative">
        <div className="flex flex-col items-stretch gap-4 max-w-4xl mx-auto px-4 pb-24">
          <Card
            key={data.id}
            className="w-full cursor-pointer hover:bg-gray-50 dark:hover:bg-background"
          >
            <CardHeader className="relative group">
              <h2 className="text-xl font-semibold cursor-pointer ">
                {data.title}
              </h2>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground">{data.content}</p>
            </CardContent>

            <Separator />

            <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
              <span className="text-xs text-muted-foreground order-first sm:order-none">
                {new Date(data.createdAt).toLocaleString()}
              </span>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};
export default MemoryPage;
