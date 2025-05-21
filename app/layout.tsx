import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Second Brain",
  description:
    "Second Brain is a full-stack AI-powered personal knowledge assistant.",
};

const RootLayout = (props: PropsWithChildren) => {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {props.children}
        </ThemeProvider>
      </body>
    </html>
  );
};
export default RootLayout;
