import "@/app/globals.css";
import Sidebar from "./components/side-bar/Sidebar";
import { PropsWithChildren } from "react";
import { TanstackQueryClientProvider } from "@/components/providers/tanstack-query-client-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TanstackQueryClientProvider>
        <div className="flex bg-white dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1 min-h-screen overflow-y-auto">
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </TanstackQueryClientProvider>
    </ThemeProvider>
  );
}
