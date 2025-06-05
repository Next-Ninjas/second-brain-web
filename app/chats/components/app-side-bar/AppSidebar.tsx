"use client";

import { useEffect, useState } from "react";
import { BrainCircuit, Plus, Search } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { serverUrl } from "@/lib/environment";

const staticMenuItems = [
  {
    title: "Neuronote",
    url: "/dashboard",
    icon: BrainCircuit,
  },
  {
    title: "New Chat",
    url: "/chats",
    icon: Plus,
  },
  {
    title: "My Memories",
    url: "/dashboard/search",
    icon: Search,
  },
];

type ChatSession = {
  id: string;
  title: string;
  content: string;
};

export function AppSidebar() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);

  const fetchSessions = async () => {
    try {
      const res = await fetch(`${serverUrl}/chats/all/sessions`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSessions(data.sessions);
      }
    } catch (err) {
      console.error("Failed to fetch sessions", err);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {staticMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupContent className="mt-4">
            <SidebarHeader className="font-bold text-lg">Chats</SidebarHeader>
            <SidebarMenu>
              {sessions.map((session) => (
                <SidebarMenuItem key={session.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/chats/${session.id}`}>
                      <span className="truncate">
                        {session.content.slice(0, 30)}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
