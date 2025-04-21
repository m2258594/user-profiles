import { create } from "zustand";
import { UserStatusType } from "../constants/statuses";

interface FilterStore {
  filter: UserStatusType | "";
  setFilter: (filter: UserStatusType) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filter: "",
  setFilter: (filter) => set({ filter }),
}));
