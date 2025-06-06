import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TanstackQueryClientProvider } from "@/components/providers/tanstack-query-client-provider";
import { Toaster } from "sonner";
import Navbar from "./NavBar";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const DashboardLayout = (props: PropsWithChildren) => {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
              >
                  <Navbar />
          <TanstackQueryClientProvider>
            {props.children}
            <Toaster />
          </TanstackQueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};
export default DashboardLayout;
