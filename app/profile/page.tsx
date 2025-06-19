"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { EditProfileSheet } from "./EditProfile";
import { serverUrl } from "@/lib/environment";
import { User } from "@/lib/extras/schemas/user";

const UserProfilePage = () => {
  const router = useRouter();

  const { data, error, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await fetch(`${serverUrl}/profile/me`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          response.status === 401
            ? "Please login to view your profile"
            : `Failed to fetch user data: ${errorText || response.status}`
        );
      }

      const json = await response.json();

      try {
        const result = User.parse(json.user); 
        return result;
      } catch (validationError) {
        console.error("Validation error:", validationError);
        throw new Error("Invalid user data format from server");
      }
    },
  });
  


  if (error) {
    return (
      <Card className="max-w-3xl mx-auto my-10">
        <CardContent className="flex items-center justify-center text-destructive text-center py-6">
          {error.message}
        </CardContent>
        <CardFooter className="justify-center pb-6">
          <Button variant="outline" onClick={() => router.refresh()}>
            Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="max-w-3xl mx-auto my-10">
        <CardContent className="flex items-center justify-center py-6">
          <Spinner />
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="max-w-3xl mx-auto my-10">
        <CardContent className="flex items-center justify-center py-6">
          No user data available
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="mb-8 w-full px-4 sm:px-6 py-6 relative">
        <div className="absolute right-4 top-4 sm:top-1/2 sm:-translate-y-1/2">
          <EditProfileSheet user={data} />
        </div>

        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary text-white text-2xl font-semibold">
            {data.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="flex flex-col text-center sm:text-left">
            <CardTitle className="text-xl sm:text-2xl">
              {data.name
                ? data.name.charAt(0).toUpperCase() + data.name.slice(1)
                : "Anonymous User"}
            </CardTitle>
            {data.email && (
              <p className="text-muted-foreground text-sm">{data.email}</p>
            )}
            {data.createdAt && (
              <p className="text-muted-foreground text-sm">
                Joined on:{" "}
                {new Date(data.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        </CardHeader>

        <CardContent className="mt-4 space-y-2">
         

          {typeof data.memoriesCount === "number" && (
            <p className="text-sm sm:text-base text-center sm:text-left">
              <span className="font-medium text-foreground">
                Memories Created:
              </span>{" "}
              <span className="text-primary font-semibold">
                {data.memoriesCount}
              </span>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfilePage;
