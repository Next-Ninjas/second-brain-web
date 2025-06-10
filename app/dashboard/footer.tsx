"use client";

import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";


export default function Footer() {
  return (
    <footer className="w-full border-t border-green-400 dark:border-green-200 bg-background text-foreground py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10 text-sm sm:text-base">
        {/* Left: Logo + copyright */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <BrainCircuit color="green" size={28} />
            NeuroNote
          </div>
          <p className="text-[15px] text-muted-foreground max-w-sm">
  © 2025 NeuroNote AI
</p>

        </div>

        {/* Right: Links + Social Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:text-sm">
          {/* Product */}
          <div className="flex flex-col gap-2">
            <h4 className="font-bold mb-2">Product</h4>
            
            <Link href="#">How it works</Link>
            <Link href="#">Use Cases</Link>
            <Link href="/dashboard/pricing">Pricing</Link>
            <Link href="https://tally.so/r/nGjLRL">Help Center</Link>
            
          </div>

          {/* Resources */}
          {/* <div className="flex flex-col gap-2">
            <h4 className="font-bold mb-2">Company</h4>
            <Link href="#">Blog</Link>
            <Link href="/about">About</Link>
            <Link href="/dashboard/contact">Contact</Link>

            
          </div> */}

          {/* Company */}
          <div className="flex flex-col gap-2">
            <h4 className="font-bold mb-2">Privacy</h4>
            
            <Link href="/sign-up/terms">Terms</Link>
            <Link className="cursor-pointer" href="/sign-up/privacy">Privacy</Link>
          </div>

          {/* Follow Us */}
          {/* <div className="flex flex-col gap-2">
            <h4 className="font-bold mb-2">Follow Us</h4>
            <div className="flex gap-4 text-xl">
              <Link
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400"
              >
                <FaXTwitter />
              </Link>
              <Link
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400"
              >
                <FaLinkedin />
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
