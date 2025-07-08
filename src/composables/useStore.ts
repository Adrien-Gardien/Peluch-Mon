import { computed } from 'vue'
import { useMainStore } from '../store'

export const useStore = () => {
  const store = useMainStore()
  
  return {
    cart: computed(() => store.cart),
    user: computed(() => store.user),
    favorites: computed(() => store.favorites),
    searchQuery: computed(() => store.searchQuery),
    filters: computed(() => store.filters),
    
    cartTotalItems: computed(() => store.cartTotalItems),
    cartTotalPrice: computed(() => store.cartTotalPrice),
    cartIsEmpty: computed(() => store.cartIsEmpty),
    formattedTotal: computed(() => store.formattedTotal),
    favoriteCount: computed(() => store.favoriteCount),
    isLoggedIn: computed(() => store.isLoggedIn),
    
    addToCart: store.addToCart,
    removeFromCart: store.removeFromCart,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    toggleFavorite: store.toggleFavorite,
    addToFavorites: store.addToFavorites,
    removeFromFavorites: store.removeFromFavorites,
    clearFavorites: store.clearFavorites,
    setSearchQuery: store.setSearchQuery,
    updateFilters: store.updateFilters,
    resetFilters: store.resetFilters,
    setUser: store.setUser,
    logout: store.logout,
    loadFromLocalStorage: store.loadFromLocalStorage,
    saveToLocalStorage: store.saveToLocalStorage,
    
    isFavorite: (pokemonId: number) => store.isFavorite(pokemonId),
    getCartItem: (pokemonId: number, variant: 'normal' | 'shiny' = 'normal') => 
      store.getCartItem(pokemonId, variant),
  }
}

export const useCart = () => {
  const store = useMainStore()
  
  return {
    items: computed(() => store.cart.items),
    totalItems: computed(() => store.cartTotalItems),
    totalPrice: computed(() => store.cartTotalPrice),
    isEmpty: computed(() => store.cartIsEmpty),
    formattedTotal: computed(() => store.formattedTotal),
    
    add: store.addToCart,
    remove: store.removeFromCart,
    updateQuantity: store.updateQuantity,
    clear: store.clearCart,
    getItem: (pokemonId: number, variant: 'normal' | 'shiny' = 'normal') => 
      store.getCartItem(pokemonId, variant),
  }
}

export const useFavorites = () => {
  const store = useMainStore()
  
  return {
    favorites: computed(() => store.favorites),
    count: computed(() => store.favoriteCount),
    
    toggle: store.toggleFavorite,
    add: store.addToFavorites,
    remove: store.removeFromFavorites,
    clear: store.clearFavorites,
    isFavorite: (pokemonId: number) => store.isFavorite(pokemonId),
  }
}

export const useSearch = () => {
  const store = useMainStore()
  
  return {
    query: computed(() => store.searchQuery),
    filters: computed(() => store.filters),
    
    setQuery: store.setSearchQuery,
    updateFilters: store.updateFilters,
    resetFilters: store.resetFilters,
  }
}

export const useUser = () => {
  const store = useMainStore()
  
  return {
    user: computed(() => store.user),
    isLoggedIn: computed(() => store.isLoggedIn),
    
    setUser: store.setUser,
    logout: store.logout,
  }
}
