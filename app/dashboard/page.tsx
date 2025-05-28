"use client";

import { Button } from "@/components/ui/button";
import Navbar from "./NavBar";
import CreateMemory from "../chats/components/create-memory/page";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="">
      <Navbar />
      <section className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white px-4 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
          Build a second memory <br />
          <span className="text-green-400">Capture your thoughts</span>
        </h1>
        <p className="mt-6 text-sm sm:text-[15px] max-w-2xl text-neutral-400">
          MemoryApp helps you store and retrieve your ideas, inspirations, and
          conversations using AI-enhanced memory and chat.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <CreateMemory />
          <Button className="bg-gray-200 hover:bg-gray-300 text-black dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white font-semibold px-6 py-3 rounded-xl transition">
            <Link href={"/chats"}>Chat Memory</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
