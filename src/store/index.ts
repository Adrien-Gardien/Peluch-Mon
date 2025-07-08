import { reactive, computed } from "vue";
import type { AppState, CartItem, Pokemon, FilterOptions } from "../types";

// État initial
const initialFilters: FilterOptions = {
  category: "all",
  rarity: "all",
  priceRange: [0, 2000],
  inStock: true,
  sortBy: "name",
  sortOrder: "asc",
};

// Store principal
export const store = reactive<AppState>({
  cart: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  },
  user: null,
  favorites: [],
  searchQuery: "",
  filters: { ...initialFilters },
});

// Actions du panier
export const cartActions = {
  addToCart(
    pokemon: Pokemon,
    quantity: number = 1,
    variant: "normal" | "shiny" = "normal"
  ) {
    const existingItem = store.cart.items.find(
      (item) =>
        item.pokemon.id === pokemon.id && item.selectedVariant === variant
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      store.cart.items.push({
        pokemon,
        quantity,
        selectedVariant: variant,
      });
    }

    updateCartTotals();
  },

  removeFromCart(pokemonId: number, variant: "normal" | "shiny" = "normal") {
    const index = store.cart.items.findIndex(
      (item) =>
        item.pokemon.id === pokemonId && item.selectedVariant === variant
    );

    if (index > -1) {
      store.cart.items.splice(index, 1);
      updateCartTotals();
    }
  },

  updateQuantity(
    pokemonId: number,
    quantity: number,
    variant: "normal" | "shiny" = "normal"
  ) {
    const item = store.cart.items.find(
      (item) =>
        item.pokemon.id === pokemonId && item.selectedVariant === variant
    );

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(pokemonId, variant);
      } else {
        item.quantity = quantity;
        updateCartTotals();
      }
    }
  },

  clearCart() {
    store.cart.items = [];
    updateCartTotals();
  },
};

// Actions des favoris
export const favoriteActions = {
  toggleFavorite(pokemonId: number) {
    const index = store.favorites.indexOf(pokemonId);
    if (index > -1) {
      store.favorites.splice(index, 1);
    } else {
      store.favorites.push(pokemonId);
    }
  },

  isFavorite(pokemonId: number): boolean {
    return store.favorites.includes(pokemonId);
  },
};

// Actions de recherche et filtres
export const searchActions = {
  setSearchQuery(query: string) {
    store.searchQuery = query;
  },

  updateFilters(newFilters: Partial<FilterOptions>) {
    Object.assign(store.filters, newFilters);
  },

  resetFilters() {
    Object.assign(store.filters, initialFilters);
  },
};

// Actions utilisateur
export const userActions = {
  setUser(user: AppState["user"]) {
    store.user = user;
  },

  logout() {
    store.user = null;
    cartActions.clearCart();
    store.favorites = [];
  },
};

// Fonctions utilitaires
function updateCartTotals() {
  store.cart.totalItems = store.cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  store.cart.totalPrice = store.cart.items.reduce(
    (total, item) => total + item.pokemon.price * item.quantity,
    0
  );
}

// Computed properties pour faciliter l'utilisation
export const cartComputed = {
  totalItems: computed(() => store.cart.totalItems),
  totalPrice: computed(() => store.cart.totalPrice),
  formattedTotal: computed(() => `${store.cart.totalPrice.toFixed(2)}€`),
  isEmpty: computed(() => store.cart.items.length === 0),
  itemCount: computed(() => store.cart.items.length),
};

// Sauvegarde locale
export const persistenceActions = {
  saveToLocalStorage() {
    try {
      localStorage.setItem("pokemon-cart", JSON.stringify(store.cart));
      localStorage.setItem(
        "pokemon-favorites",
        JSON.stringify(store.favorites)
      );
    } catch (error) {
      console.warn("Impossible de sauvegarder dans localStorage:", error);
    }
  },

  loadFromLocalStorage() {
    try {
      const savedCart = localStorage.getItem("pokemon-cart");
      const savedFavorites = localStorage.getItem("pokemon-favorites");

      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        store.cart = cartData;
      }

      if (savedFavorites) {
        store.favorites = JSON.parse(savedFavorites);
      }
    } catch (error) {
      console.warn("Impossible de charger depuis localStorage:", error);
    }
  },
};

// Auto-sauvegarde
import { watchEffect } from "vue";

watchEffect(() => {
  persistenceActions.saveToLocalStorage();
});
