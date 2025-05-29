"use client";

import FeatureCards from "./components/feature-card/FeatureCards";
import { Button } from "@/components/ui/button";
import Navbar from "./NavBar";
import CreateMemory from "./components/create-memory/page";
import Link from "next/link";
import RecentMemoriesList from "./components/recent-memories/RecentMemoriesList";

const cards = [
  {
    logo: "🧠",
    heading: "Smart Memory Vault",
    description:
      "AI-organized memory system for notes, URLs, and ideas. Automatically tags and categorizes your inputs.",
  },
  {
    logo: "🔍",
    heading: "Semantic Search",
    description:
      "Ask natural questions and instantly find related memories. Powered by AI and vector search (Pinecone + Mistral).",
  },
  {
    logo: "💬",
    heading: "Conversational Interface",
    description:
      "Interact with your memories using a chat UI. Ask follow-up questions and receive context-rich answers.",
  },
  {
    logo: "👤",
    heading: "Personalized Experience",
    description:
      "Every user has a secure, private vault. Session data and preferences are preserved and personalized.",
  },
];

export default function HeroSection() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="w-full px-4 py-10 flex flex-col gap-12 lg:gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto items-center">
          {/* Left Side */}
          <div className="flex flex-col text-center lg:text-left items-center lg:items-start">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Build a second memory <br />
              <span className="text-green-400">Capture your thoughts</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg max-w-xl text-muted-foreground">
              MemoryApp helps you store and retrieve your ideas, inspirations,
              and conversations using AI-enhanced memory and chat.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <CreateMemory />
              <Button
                variant="secondary"
                className="font-semibold px-6 py-3 rounded-xl transition w-full sm:w-auto"
              >
                <Link href={"/chats"}>Chat Memory</Link>
              </Button>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full">
            <div className="mockup-window border border-gray-700  bg-[#F3F4F6] dark:bg-background text-foreground">
              <p className=" flex flex-row items-center justify-center font-bold text-[20px]">
                Recent Memories
              </p>
              <div className="p-4 border-t border-gray-700  h-[400px] overflow-y-auto">
                <RecentMemoriesList />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeatureCards cards={cards} />
    </div>
  );
}
