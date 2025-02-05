export interface PizzaData {
  id: string;
  name: string;
  description: string;
  img: any;
}

export interface IngredientsType {
  name: string;
  img: any;
}

export type PizzaSize = "s" | "m" | "l";

export interface IngredientListWithPosition {
  name: string;
  top: number;
  left: number;
  img: any;
}
