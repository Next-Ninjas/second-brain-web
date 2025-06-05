export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  createdAt: string;
};
