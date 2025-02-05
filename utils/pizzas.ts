import { PizzaData } from "@/types/types";

export const PIZZAS: PizzaData[] = [
  {
    id: "pizza-1",
    name: "Margherita",
    description:
      "A classic pizza with tomato sauce, mozzarella cheese, and fresh basil.",
    img: require("@/assets/images/pizza/pizzas/pizza-0.webp"),
  },
  {
    id: "pizza-2",
    name: "Pepperoni",
    description:
      "A spicy pepperoni pizza with tomato sauce, mozzarella cheese, and fresh basil.",
    img: require("@/assets/images/pizza/pizzas/pizza-1.webp"),
  },
  {
    id: "pizza-3",
    name: "Veggie",
    description:
      "A vegetarian pizza loaded with bell peppers, onions, olives, and mushrooms.",
    img: require("@/assets/images/pizza/pizzas/pizza-2.webp"),
  },
  {
    id: "pizza-4",
    name: "Hawaiian",
    description:
      "A controversial favorite with ham, pineapple, and a perfect cheese blend.",
    img: require("@/assets/images/pizza/pizzas/pizza-3.webp"),
  },
  {
    id: "pizza-5",
    name: "BBQ Chicken",
    description:
      "A smoky barbecue sauce base topped with grilled chicken, red onions, and cilantro.",
    img: require("@/assets/images/pizza/pizzas/pizza-4.webp"),
  },
  {
    id: "pizza-6",
    name: "Four Cheese",
    description:
      "A cheese lover's dream with mozzarella, cheddar, gorgonzola, and parmesan.",
    img: require("@/assets/images/pizza/pizzas/pizza-5.webp"),
  },
  {
    id: "pizza-7",
    name: "Meat Lovers",
    description:
      "Loaded with pepperoni, sausage, bacon, ham, and ground beef for meat enthusiasts.",
    img: require("@/assets/images/pizza/pizzas/pizza-6.webp"),
  },
  {
    id: "pizza-8",
    name: "Truffle Mushroom",
    description:
      "A gourmet delight with creamy truffle sauce, mushrooms, and parmesan cheese.",
    img: require("@/assets/images/pizza/pizzas/pizza-7.webp"),
  },
  {
    id: "pizza-9",
    name: "Buffalo Chicken",
    description:
      "Spicy buffalo sauce base with grilled chicken, red onions, and ranch drizzle.",
    img: require("@/assets/images/pizza/pizzas/pizza-8.webp"),
  },
];

export default PIZZAS;
