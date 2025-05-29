import "@/app/globals.css";
import { AppSidebar } from "./components/app-side-bar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TanstackQueryClientProvider } from "@/components/providers/tanstack-query-client-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Layout */}
        <div className="flex flex-col flex-1 overflow-hidden bg-background text-foreground">
          {/* Optional Sidebar Trigger */}
          <SidebarTrigger size={'default'} className="" />

          {/* Theme & Query Providers */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TanstackQueryClientProvider>
              {/* Children scrollable area */}
              <div className="flex-1 overflow-y-auto">{children}</div>
            </TanstackQueryClientProvider>
          </ThemeProvider>
        </div>
      </div>
    </SidebarProvider>
  );
}
