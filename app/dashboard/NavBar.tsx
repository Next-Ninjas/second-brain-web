"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="h-6 w-auto" />
          <span className="font-semibold text-lg">Neuro Note</span>
        </div>

        {/* Right-side icons: GitHub and ModeToggle */}
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/orgs/Next-Ninjas/repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <Github size={24} />
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
