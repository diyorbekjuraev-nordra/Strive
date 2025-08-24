import { create, StateCreator } from "zustand";

type CommentStore = {
  input: {
    isMentionLoading: boolean;
  };
  setInput: (payload: Partial<CommentStore["input"]>) => void;
};

const commentStore: StateCreator<CommentStore> = (set, get) => {
  return {
    input: {
      isMentionLoading: false,
    },
    setInput: (payload: Partial<CommentStore["input"]>) => {
      set({ input: { ...get().input, ...payload } });
    },
  };
};

const useCommentStore = create<CommentStore>(commentStore);

export { useCommentStore };
