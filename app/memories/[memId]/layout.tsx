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
      <main>{children}</main>
    </>
  );
}
