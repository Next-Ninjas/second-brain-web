"use client";

import FeatureCards from "./components/feature-card/FeatureCards";
import CreateMemory from "./components/create-memory/page";
import Link from "next/link";
import RecentMemoriesList from "./components/recent-memories/RecentMemoriesList";
import Footer from "./footer";


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
 
      <section className="w-full py-20 px-4 text-center bg-background text-foreground relative overflow-hidden group">
        {/* Glowing background light */}
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-green-400 opacity-10 blur-3xl rounded-full transform -translate-x-1/2 group-hover:scale-110 transition-transform duration-1000 pointer-events-none"></div>

        <h2 className="text-4xl sm:text-5xl font-bold leading-tight transition-all duration-300 group-hover:tracking-wide">
          <span className="text-black dark:text-white">
            Power Your Thoughts
          </span>{" "}
          with{" "}
          <span className="text-green-400 drop-shadow-[0_0_10px_#4ade80] animate-glow">
            NeuroNote
          </span>
        </h2>

        <p className="mt-6 text-lg max-w-2xl mx-auto text-muted-foreground transition-opacity duration-500 delay-150 group-hover:opacity-100 opacity-90">
          Capture your ideas, conversations, and moments with AI-powered
          precision.
          <br />
          Let your memory evolve with technology.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <CreateMemory />

          <span className="px-4 py-2 rounded-full border border-green-400 text-green-400 font-medium text-sm shadow-sm flex items-center gap-2 transition-all duration-200 hover:bg-green-400 hover:text-white dark:hover:text-black cursor-pointer">
            <Link href={"/chats"}>🧠 AI-Powered Recall</Link>
          </span>
        </div>
      </section>
      <FeatureCards cards={cards} />
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
           
          </div>

          {/* Right Side */}
          <div className="w-full">
            <div className="mockup-window border border-gray-700   dark:bg-background text-foreground">
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

      {/* Gradient Hero Headline Section */}
      <Footer />

    </div>
  );
}
