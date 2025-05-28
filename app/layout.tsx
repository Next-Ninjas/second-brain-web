import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TanstackQueryClientProvider } from "@/components/providers/tanstack-query-client-provider";
import { Toaster } from "sonner";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Second Brain",
  description: "Second Brain is a AI-powered personal knowledge assistant.",
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
          <TanstackQueryClientProvider>
            {props.children}
            <Toaster />
          </TanstackQueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};
export default RootLayout;
