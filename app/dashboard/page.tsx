"use client";
import FeatureCards from "./FeatureCards";

const cards = [
  {
    logo: "🧠",
    heading: "Smart Memory Vault",
    description:
      "AI-organized memory system for notes, URLs, and ideas. Automatically tags and categorizes your inputs.",
  },
  {
    logo: "🔍",
    heading: " Semantic Search",
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
import { Button } from "@/components/ui/button";
import Navbar from "./NavBar";
import CreateMemory from "../chats/components/create-memory/page";
import Link from "next/link";
import RecentMemoriesList from "../chats/components/recent-memories/RecentMemoriesList";

export default function HeroSection() {
  return (
    <div className="flex flex-col min-h-screen bg-background ">
      <Navbar />
      <section className="min-h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-center bg-white dark:bg-black text-black dark:text-white px-4 text-center py-10">
        {/* Left side - spans two columns on larger screens */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
            Build a second memory <br />
            <span className="text-green-400">Capture your thoughts</span>
          </h1>
          <p className="mt-6 text-sm sm:text-[15px] max-w-xl text-neutral-500">
            MemoryApp helps you store and retrieve your ideas, inspirations, and
            conversations using AI-enhanced memory and chat.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <CreateMemory />
            <Button className="bg-gray-200 hover:bg-gray-300 text-black dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white font-semibold px-6 py-3 rounded-xl transition">
              <Link href={"/chats"}>Chat Memory</Link>
            </Button>
          </div>
        </div>
        

        {/* Right side - CreateMemory and Button */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col sm:flex-row justify-center items-center gap-4">
          
        </div>
        
      </section>
      <FeatureCards cards={cards} />
    </div>
  );
}
