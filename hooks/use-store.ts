import { create } from "zustand";

export type ModalType = "Search" | "Cart";

type ModalStore = {
  modal: ModalType | null;
  isOpen: boolean;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
};

const useModalStore = create<ModalStore>((set) => ({
  modal: null,
  isOpen: false,
  openModal: (modal) => set({ modal, isOpen: true }),
  closeModal: () => set({ modal: null, isOpen: false }),
}));

type Store = {
  cart: string[];
  addToCart: (item: string) => void;
};

const useStore = create<Store>()((set) => ({
  cart: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
}));

export { useStore, useModalStore };
