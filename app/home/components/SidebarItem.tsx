// components/SidebarItem.tsx
"use client";

import { useSidebarStore } from "@/lib/extras/stores/useSidebarStore";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  id: string;
  name: string;
}

export default function SidebarItem({ id, name }: SidebarItemProps) {
  const active = useSidebarStore((state) => state.active);
  const setActive = useSidebarStore((state) => state.setActive);

  return (
    <button
      onClick={() => setActive(id)}
      className={cn(
        "w-full text-left px-4 py-2 rounded-md text-sm font-medium transition",
        active === id
          ? "bg-blue-500 text-white"
          : "hover:bg-gray-200 dark:hover:bg-gray-800"
      )}
    >
      {name}
    </button>
  );
}
