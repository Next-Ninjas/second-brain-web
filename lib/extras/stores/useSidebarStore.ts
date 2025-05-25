// stores/useSidebarStore.ts
import { create } from "zustand";

type SidebarState = {
  active: string;
  setActive: (id: string) => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  active: "",
  setActive: (id) => set({ active: id }),
}));
