import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

const ChatPage = async ({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) => {
  const { sessionId } = await params;

  const session = await fetchChatSession(sessionId);
  if (!session) return null;

  return (
    <div className="relative">
      <div className="flex flex-col items-stretch gap-4 max-w-4xl mx-auto px-4 pb-24">
        <Card className="w-full">
          <CardHeader>
            <h2 className="text-xl font-semibold">{session.title}</h2>
          </CardHeader>

          <Separator />

          <CardContent className="space-y-4">
            {session.messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 rounded-xl ${
                  msg.role === "user"
                    ? "bg-blue-100 dark:bg-blue-900 text-right"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <p>{msg.content}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </CardContent>

          <Separator />

          <CardFooter className="text-xs text-muted-foreground">
            Session ID: {session.id}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;
