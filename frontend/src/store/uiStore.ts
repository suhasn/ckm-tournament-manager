import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  toggleSidebar: () => void
  openModal: (modalId: string) => void
  closeModal: (modalId: string) => void
  openModals: Set<string>
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  openModals: new Set(),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  openModal: (modalId: string) =>
    set((state) => {
      const modals = new Set(state.openModals)
      modals.add(modalId)
      return { openModals: modals }
    }),
  closeModal: (modalId: string) =>
    set((state) => {
      const modals = new Set(state.openModals)
      modals.delete(modalId)
      return { openModals: modals }
    }),
}))
