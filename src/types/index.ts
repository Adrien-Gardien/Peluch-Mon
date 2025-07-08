// Types pour le système e-commerce Pokémon

export interface Pokemon {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: PokemonType;
  rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" | "Mythical";
  image: string;
  images: string[];
  description: string;
  stats: PokemonStats;
  abilities: string[];
  weight: number;
  height: number;
  shiny: boolean;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviews: Review[];
  tags: string[];
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export type PokemonType =
  | "Fire"
  | "Water"
  | "Grass"
  | "Electric"
  | "Psychic"
  | "Ice"
  | "Dragon"
  | "Dark"
  | "Fighting"
  | "Poison"
  | "Ground"
  | "Flying"
  | "Bug"
  | "Rock"
  | "Ghost"
  | "Steel"
  | "Fairy"
  | "Normal";

export interface CartItem {
  pokemon: Pokemon;
  quantity: number;
  selectedVariant?: "normal" | "shiny";
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  favorites: number[];
}

export interface FilterOptions {
  category: PokemonType | "all";
  rarity: string | "all";
  priceRange: [number, number];
  inStock: boolean;
  sortBy: "name" | "price" | "rating" | "newest";
  sortOrder: "asc" | "desc";
}

export interface AppState {
  cart: Cart;
  user: User | null;
  favorites: number[];
  searchQuery: string;
  filters: FilterOptions;
}
