import { create } from "zustand";
import { Dimensions } from "react-native";

interface DropSize {
  dropWidth: number;
  dropHeight: number;
}
interface PizzaPosition {
  Pizzax: number;
  Pizzay: number;
}

interface DropSizeStore {
  dropSize: DropSize;
  setDropSize: (size: DropSize) => void;
  pizzaPosition: PizzaPosition;
  setPizzaPosition: (position: PizzaPosition) => void;
}
const DROPSIZEDEFAULT = {
  dropWidth: 0,
  dropHeight: 0,
};
const PIZZAPOSITIONDEFAULT = {
  Pizzax: 0,
  Pizzay: 0,
};

export const useLayoutsSizes = create<DropSizeStore>()((set) => ({
  dropSize: DROPSIZEDEFAULT,
  setDropSize: (size) => set({ dropSize: size }),
  pizzaPosition: PIZZAPOSITIONDEFAULT,
  setPizzaPosition: (position) => set({ pizzaPosition: position }),
}));
