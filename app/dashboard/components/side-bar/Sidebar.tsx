// components/Sidebar.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils"; // optional utility to combine classes

type SidebarItem = {
  name: string;
  path: string;
  icon?: React.ReactNode;
};

const items: SidebarItem[] = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Notes", path: "/notes" },
  { name: "Tasks", path: "/tasks" },
  { name: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen overflow-y-auto bg-[#181818] dark:bg-[#181818] p-4">
      <nav className="space-y-2">
        {items.map((item) => {
          const isActive = pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={cn(
                "w-full text-left px-4 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              )}
            >
              {item.name}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
