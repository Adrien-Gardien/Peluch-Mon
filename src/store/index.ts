import { defineStore } from 'pinia'
import type { AppState, Pokemon, FilterOptions, CartItem, User } from '../types'

const initialFilters: FilterOptions = {
  category: "all",
  rarity: "all",
  priceRange: [0, 2000],
  inStock: true,
  sortBy: "name",
  sortOrder: "asc",
};

export const useMainStore = defineStore('main', {
  state: (): AppState => ({
    cart: {
      items: [],
      totalItems: 0,
      totalPrice: 0,
    },
    user: null,
    favorites: [],
    searchQuery: "",
    filters: { ...initialFilters },
    pokemons: [], // Liste dynamique des Pokémon
    pokemonsLoading: false, // État de chargement
  }),

  getters: {
    cartTotalItems: (state) => state.cart.totalItems,
    cartTotalPrice: (state) => state.cart.totalPrice,
    cartIsEmpty: (state) => state.cart.items.length === 0,
    formattedTotal: (state) => `${state.cart.totalPrice.toFixed(2)}€`,
    favoriteCount: (state) => state.favorites.length,
    isLoggedIn: (state) => state.user !== null,
    
    isFavorite: (state) => (pokemonId: number) => state.favorites.includes(pokemonId),
    
    getCartItem: (state) => (pokemonId: number, variant: 'normal' | 'shiny' = 'normal') => {
      return state.cart.items.find(
        item => item.pokemon.id === pokemonId && item.selectedVariant === variant
      );
    },
  },

  actions: {
    addToCart(pokemon: Pokemon, quantity = 1, variant: 'normal' | 'shiny' = 'normal') {
      const existingItem = this.cart.items.find(
        (item) => item.pokemon.id === pokemon.id && item.selectedVariant === variant
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cart.items.push({ pokemon, quantity, selectedVariant: variant });
      }

      this.updateCartTotals();
    },

    removeFromCart(pokemonId: number, variant: 'normal' | 'shiny' = 'normal') {
      const index = this.cart.items.findIndex(
        (item) => item.pokemon.id === pokemonId && item.selectedVariant === variant
      );

      if (index > -1) {
        this.cart.items.splice(index, 1);
        this.updateCartTotals();
      }
    },

    updateQuantity(pokemonId: number, quantity: number, variant: 'normal' | 'shiny' = 'normal') {
      const item = this.cart.items.find(
        (item) => item.pokemon.id === pokemonId && item.selectedVariant === variant
      );

      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(pokemonId, variant);
        } else {
          item.quantity = quantity;
          this.updateCartTotals();
        }
      }
    },

    clearCart() {
      this.cart.items = [];
      this.updateCartTotals();
    },

    updateCartTotals() {
      this.cart.totalItems = this.cart.items.reduce((total, item) => total + item.quantity, 0);
      this.cart.totalPrice = this.cart.items.reduce((total, item) => {
        const price = item.selectedVariant === 'shiny' ? item.pokemon.price * 1.5 : item.pokemon.price;
        return total + price * item.quantity;
      }, 0);
    },

    toggleFavorite(pokemonId: number) {
      const index = this.favorites.indexOf(pokemonId);
      if (index > -1) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(pokemonId);
      }
    },

    addToFavorites(pokemonId: number) {
      if (!this.favorites.includes(pokemonId)) {
        this.favorites.push(pokemonId);
      }
    },

    removeFromFavorites(pokemonId: number) {
      const index = this.favorites.indexOf(pokemonId);
      if (index > -1) {
        this.favorites.splice(index, 1);
      }
    },

    clearFavorites() {
      this.favorites = [];
    },

    setSearchQuery(query: string) {
      this.searchQuery = query;
    },

    updateFilters(newFilters: Partial<FilterOptions>) {
      this.filters = { ...this.filters, ...newFilters };
    },

    resetFilters() {
      this.filters = { ...initialFilters };
    },

    setUser(user: User) {
      this.user = user;
    },

    logout() {
      this.user = null;
    },

    loadFromLocalStorage() {
      try {
        const savedCart = localStorage.getItem('peluchemon-cart');
        const savedFavorites = localStorage.getItem('peluchemon-favorites');
        const savedUser = localStorage.getItem('peluchemon-user');

        if (savedCart) {
          const cartData = JSON.parse(savedCart);
          this.cart = cartData;
        }

        if (savedFavorites) {
          this.favorites = JSON.parse(savedFavorites);
        }

        if (savedUser) {
          this.user = JSON.parse(savedUser);
        }
      } catch (error) {
        console.error('Erreur lors du chargement depuis localStorage:', error);
      }
    },

    saveToLocalStorage() {
      try {
        localStorage.setItem('peluchemon-cart', JSON.stringify(this.cart));
        localStorage.setItem('peluchemon-favorites', JSON.stringify(this.favorites));
        if (this.user) {
          localStorage.setItem('peluchemon-user', JSON.stringify(this.user));
        }
      } catch (error) {
        console.error('Erreur lors de la sauvegarde dans localStorage:', error);
      }
    },

    async fetchPokemons() {
      this.pokemonsLoading = true;
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=200');
        const data = await response.json();
        // On récupère les détails de chaque Pokémon (nom + url)
        const details = await Promise.all(
          data.results.map(async (p: any) => {
            const res = await fetch(p.url);
            const poke = await res.json();
            // Mapping minimal pour correspondre à l'ancien modèle
            return {
              id: poke.id,
              name: poke.name.charAt(0).toUpperCase() + poke.name.slice(1),
              image: poke.sprites.other["official-artwork"].front_default,
              category: poke.types[0]?.type.name.charAt(0).toUpperCase() + poke.types[0]?.type.name.slice(1) || '',
              stats: {
                hp: poke.stats.find((s:any) => s.stat.name === 'hp')?.base_stat || 0,
                attack: poke.stats.find((s:any) => s.stat.name === 'attack')?.base_stat || 0,
                defense: poke.stats.find((s:any) => s.stat.name === 'defense')?.base_stat || 0,
                specialAttack: poke.stats.find((s:any) => s.stat.name === 'special-attack')?.base_stat || 0,
                specialDefense: poke.stats.find((s:any) => s.stat.name === 'special-defense')?.base_stat || 0,
                speed: poke.stats.find((s:any) => s.stat.name === 'speed')?.base_stat || 0,
              },
              abilities: poke.abilities.map((a:any) => a.ability.name),
              weight: poke.weight / 10,
              height: poke.height / 10,
              // Champs fictifs pour compatibilité
              price: 199.99 + poke.id * 2,
              rarity: (() => {
                if (poke.id <= 20) return 'Common';
                if (poke.id <= 50) return 'Uncommon';
                if (poke.id <= 80) return 'Rare';
                if (poke.id <= 120) return 'Epic';
                if (poke.id <= 150) return 'Legendary';
                return 'Mythical';
              })(),
              inStock: true,
              stockQuantity: 10,
              rating: 4.5,
              reviews: [],
              tags: poke.types.map((t:any) => t.type.name),
              description: `Découvrez ${poke.name} !`,
              shiny: false,
              images: [poke.sprites.other["official-artwork"].front_default],
            };
          })
        );
        this.pokemons = details;
      } catch (e) {
        console.error('Erreur lors du fetch des Pokémon :', e);
      } finally {
        this.pokemonsLoading = false;
      }
    },
  },
});
