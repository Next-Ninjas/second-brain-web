// lib/extras/useTermsStore.ts
import { create } from 'zustand';

type TermsStore = {
  accepted: boolean;
  setAccepted: (value: boolean) => void;
};

export const useTermsStore = create<TermsStore>((set) => ({
  accepted: false,
  setAccepted: (value) => set({ accepted: value }),
}));
