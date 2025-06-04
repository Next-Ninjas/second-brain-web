// app/memories/[memId]/layout.tsx
import Navbar from "@/app/dashboard/NavBar";
import React from "react";


export default function MemoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="mx-auto mt-4 px-4 sm:px-6 lg:px-8 max-w-7xl">
          {children}
        </div>
      </main>
    </>
  );
}
