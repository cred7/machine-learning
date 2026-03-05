import { create } from "zustand";

type Store = {
  models: string;
  setModel: (
    model: "knn" | "tree" | "reg" | "svc" | "naive",
    name: string,
  ) => void;
};

const useStore = create<Store>((set) => ({
  models: "linear",

  setModel: (name) =>
    set(() => ({
      models: name,
    })),
}));

export default useStore;
