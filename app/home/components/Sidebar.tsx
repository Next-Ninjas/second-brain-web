// components/Sidebar.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSidebarItems } from "@/lib/queries";
import SidebarItem from "./SidebarItem";
import { Loader } from "lucide-react";
import { RoundSpinner } from "@/components/ui/spinner";

export default function Sidebar() {
  const { data, isLoading } = useQuery({
    queryKey: ["sidebarItems"],
    queryFn: fetchSidebarItems,
  });

  if (isLoading) {
    return (
      <div className="p-4">
       <RoundSpinner/>
      </div>
    );
  }

  return (
    <aside className="w-64 h-screen overflow-y-auto bg-[#181818] dark:bg-[#181818] p-4">
      <nav className="space-y-2">
        {data?.map((item: { id: string; name: string }) => (
          <SidebarItem key={item.id} id={item.id} name={item.name} />
        ))}
      </nav>
    </aside>
  );
}
