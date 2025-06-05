// components/ChatMessages.tsx
"use client";

import { Message } from "@/lib/extras/schemas/types";



export default function ChatMessages({ messages }: { messages: Message[] }) {
  return (
    <div className="space-y-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-4 rounded-xl max-w-2xl ${
            msg.role === "user"
              ? "bg-blue-100 dark:bg-blue-900 ml-auto text-right"
              : "bg-gray-200 dark:bg-gray-800"
          }`}
        >
          <p>{msg.content}</p>
          <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">
            {new Date(msg.createdAt).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
