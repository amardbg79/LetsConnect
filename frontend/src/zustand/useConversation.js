import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conv) => set({ selectedConversation: conv }),
  messages: [],
  setMessages: (fn) => set((state) => ({ messages: typeof fn === 'function' ? fn(state.messages) : fn })),
}));

export default useConversation;
