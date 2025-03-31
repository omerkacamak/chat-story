import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export type Message = {
  id: string;
  text: string;
  side: "left" | "right";
  order: number;
};

type EditorState = {
  messages: Message[];
  leftVoiceId: string;
  rightVoiceId: string;
  videoUrl: string;
  title: string;
  
  // Actions
  addMessage: (text: string, side: "left" | "right") => void;
  removeMessage: (id: string) => void;
  setLeftVoiceId: (id: string) => void;
  setRightVoiceId: (id: string) => void;
  setVideoUrl: (url: string) => void;
  setTitle: (title: string) => void;
  clearAll: () => void;
};

export const useEditorStore = create<EditorState>((set) => ({
  messages: [],
  leftVoiceId: "",
  rightVoiceId: "",
  videoUrl: "",
  title: "",
  
  addMessage: (text, side) => set((state) => ({
    messages: [
      ...state.messages,
      {
        id: uuidv4(),
        text,
        side,
        order: state.messages.length,
      }
    ]
  })),
  
  removeMessage: (id) => set((state) => {
    const filteredMessages = state.messages.filter(msg => msg.id !== id);
    // Reorder messages
    const reorderedMessages = filteredMessages.map((msg, index) => ({
      ...msg,
      order: index
    }));
    return { messages: reorderedMessages };
  }),
  
  setLeftVoiceId: (id) => set({ leftVoiceId: id }),
  setRightVoiceId: (id) => set({ rightVoiceId: id }),
  setVideoUrl: (url) => set({ videoUrl: url }),
  setTitle: (title) => set({ title }),
  
  clearAll: () => set({
    messages: [],
    leftVoiceId: "",
    rightVoiceId: "",
    videoUrl: "",
    title: ""
  })
}));
