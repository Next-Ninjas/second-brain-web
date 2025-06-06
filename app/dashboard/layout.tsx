
import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TanstackQueryClientProvider } from "@/components/providers/tanstack-query-client-provider";
import { Toaster } from "sonner";
import Navbar from "./NavBar";



const DashboardLayout = (props: PropsWithChildren) => {
  return (
    
      <main className="bg-background text-foreground min-h-screen">
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
      </main>
  
  );
};
export default DashboardLayout;
