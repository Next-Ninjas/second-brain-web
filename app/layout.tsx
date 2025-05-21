import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PropsWithChildren } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Second Brain",
  description:
    "Second Brain is a full-stack AI-powered personal knowledge assistant.",
};

const RootLayout=(props: PropsWithChildren)=> {
  return (
    <html lang="en" className={inter.variable}>
      <body>{props.children}</body>
    </html>
  );
}
export default RootLayout