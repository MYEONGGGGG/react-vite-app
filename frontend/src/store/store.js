import { create } from "zustand";

const useStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    resetUser: () => set({ user: null }),
}));

export default useStore;