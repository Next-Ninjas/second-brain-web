"use client";

import React, { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import Navbar from "../dashboard/NavBar";


const FeedLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className="min-h-screen">
 <Navbar />
        <div className="  px-4 sm:px-6 lg:px-8 bg-background text-foreground h-screen w-full">
          {children}
        </div>
      </main>
      <Toaster />
    </>
  );
};

export default FeedLayout;
