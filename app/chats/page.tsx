"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { serverUrl } from "@/lib/environment";

export default function DashboardPage() {
  const [url, setUrl] = useState("");

  const mutation = useMutation({
    mutationFn: async (inputUrl: string) => {
      const res = await fetch(`${serverUrl}/url`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: inputUrl }),
      });

      if (!res.ok) throw new Error("Failed to submit URL");
      return res.json();
    },
    onSuccess: () => {
      alert("URL submitted successfully!");
      setUrl("");
    },
    onError: () => {
      alert("Submission failed. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(url);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl"
      >
        <input
          id="urlInput"
          type="url"
          required
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white"
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
        >
          {mutation.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
