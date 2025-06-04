"use client";
import Link from "next/link";
import { useState } from "react";
import { BrainCircuit, Home, Plus, Search } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SearchBar } from "@/app/dashboard/search/components/SearchBar";


const items = [
  {
    title: "Nueronote",
    icon: BrainCircuit,
    size: 40,
  },
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
    size: 24,
  },
  {
    title: "New chats",
    url: "/chats",
    icon: Plus,
    size: 24,
  },
];

export function AppSidebar() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {/* Conditionally show search bar */}
            {showSearchBar && (
              <div className="p-2">
                <SearchBar />
              </div>
            )}

            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url ?? "#"}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Search chats toggle item */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setShowSearchBar((prev) => !prev)}
                >
                  <Search />
                  <span>Search chats</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
