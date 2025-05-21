"use client";

import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const RootPage = () => {
  return (
    <div className="relative min-h-svh container mx-auto px-4">
    <AnimatedBackground />
    <div className="min-h-svh container mx-auto px-4">
      <div className="min-h-svh flex flex-col items-center justify-center gap-6 text-center">
        <div className="flex flex-col items-center gap-2 px-4 sm:px-6 md:px-8">
          <Image
            src="/brain.png"
            alt="Robot waving"
            width={384} // for example, 48 * 8 (w-48 in tailwind is 12rem = 192px, so adjust as needed)
            height={192} // adjust height accordingly to keep aspect ratio
            className="object-contain"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-balance max-w-[90%] sm:max-w-[80%] md:max-w-prose">
            Second Brain
          </h1>
          <p className="text-base sm:text-lg max-w-[90%] sm:max-w-[80%] md:max-w-prose text-muted-foreground">
          Second Brain is a full-stack AI-powered personal knowledge assistant.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
          <Button variant="secondary" asChild className="w-full sm:w-auto">
            <Link href="/sign-in">Log In</Link>
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RootPage;
