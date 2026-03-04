import { create } from "zustand";

type Store = {
  url: string;
  setModel: (model: "lr" | "knn" | "tree") => void;
};

const useStore = create<Store>((set) => ({
  url: "http://localhost:8000/api/predict/lr",

  setModel: (model) =>
    set(() => ({
      url: `http://localhost:8000/api/predict/${model}`,
    })),
}));

export default useStore;
