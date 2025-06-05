// app/chats/[sessionId]/page.tsx
import { notFound } from "next/navigation";
import { serverUrl } from "@/lib/environment";
import { forwardableHeaders } from "@/lib/extras/headers";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  createdAt: string;
};

type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
};

async function fetchChatSession(
  sessionId: string
): Promise<ChatSession | null> {
  try {
    const response = await fetch(`${serverUrl}/chats/${sessionId}/messages`, {
      method: "GET",
      credentials: "include",
      headers: await forwardableHeaders(),
      cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok || !data.success) return null;

    return {
      id: sessionId,
      title: `Chat - ${sessionId.slice(0, 5)}`,
      messages: data.messages,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function ChatPage({
  params,
}: {
  params: { sessionId: string };
}) {
  const session = await fetchChatSession(params.sessionId);
  if (!session) return notFound();

  return (
    <div className="min-h-screen p-6 space-y-4 bg-gray-50 dark:bg-black text-black dark:text-white">
      <h1 className="text-2xl font-bold">{session.title}</h1>
      <div className="space-y-2">
        {session.messages.map((msg) => (
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
    </div>
  );
}
