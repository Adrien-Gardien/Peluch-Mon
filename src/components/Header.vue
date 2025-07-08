<template>
  <header class="w-full bg-white shadow-xl sticky top-0 z-50 border-b border-gray-100">
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-3 group">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-110">
              <span class="text-white font-bold text-xl">P</span>
            </div>
            <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PokéShop
            </span>
          </router-link>
        </div>

        <!-- Navigation principale (desktop) -->
        <nav class="hidden lg:flex space-x-8">
          <router-link to="/" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Accueil
          </router-link>
          <router-link to="/catalog" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Catalogue
          </router-link>
          <router-link to="/favorites" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Favoris
          </router-link>
        </nav>

        <!-- Barre de recherche (desktop) -->
        <div class="hidden md:flex relative flex-1 max-w-md mx-8">
          <div class="relative w-full">
            <input
              v-model="searchQuery"
              @input="handleSearch"
              @focus="showSearchSuggestions = searchQuery.length >= 2"
              type="text"
              placeholder="Rechercher un Pokémon..."
              class="w-full pl-12 pr-4 py-3 rounded-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            >
            <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Actions utilisateur -->
        <div class="flex items-center space-x-4">
          <!-- Favoris -->
          <router-link to="/favorites" class="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <span v-if="favoritesCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ favoritesCount }}
            </span>
          </router-link>

          <!-- Panier -->
          <button @click="toggleCart" class="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0H17M9 18h8"/>
            </svg>
            <span v-if="cartItemsCount > 0" class="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ cartItemsCount }}
            </span>
          </button>

          <!-- Menu mobile -->
          <button @click="toggleMobileMenu" class="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          <!-- Recherche mobile -->
          <button @click="toggleMobileSearch" class="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Barre de recherche mobile -->
      <div v-if="showMobileSearch" class="md:hidden pb-4 border-t border-gray-100 pt-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="Rechercher un Pokémon..."
            class="w-full pl-12 pr-4 py-3 rounded-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          >
          <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Menu mobile -->
      <div v-if="showMobileMenu" class="lg:hidden pb-6 border-t border-gray-100 pt-6">
        <nav class="flex flex-col space-y-4">
          <router-link to="/" @click="closeMobileMenu" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Accueil
          </router-link>
          <router-link to="/catalog" @click="closeMobileMenu" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Catalogue
          </router-link>
          <router-link to="/favorites" @click="closeMobileMenu" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Favoris ({{ favoritesCount }})
          </router-link>
          <router-link to="/cart" @click="closeMobileMenu" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Panier ({{ cartItemsCount }})
          </router-link>
        </nav>
      </div>
    </div>

    <!-- Suggestions de recherche -->
    <div v-if="showSearchSuggestions && searchSuggestions.length > 0" class="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-4">
          <p class="text-sm text-gray-500 mb-3">Suggestions</p>
          <div class="space-y-2">
            <button
              v-for="pokemon in searchSuggestions"
              :key="pokemon.id"
              @click="selectSuggestion(pokemon)"
              class="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <img :src="pokemon.image" :alt="pokemon.name" class="w-10 h-10 object-contain">
              <div>
                <p class="font-medium text-gray-900">{{ pokemon.name }}</p>
                <p class="text-sm text-gray-500">{{ pokemon.category }} • {{ pokemon.price.toFixed(2) }}€</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore, useCart, useFavorites, useSearch } from '../composables/useStore';
import { pokemonData } from '../data/pokemon';
import type { Pokemon } from '../types';

const router = useRouter();

const store = useStore();
const cart = useCart();
const favorites = useFavorites();
const search = useSearch();

const showMobileMenu = ref(false);
const showMobileSearch = ref(false);
const showSearchSuggestions = ref(false);
const searchQuery = ref('');

const cartItemsCount = computed(() => cart.totalItems.value);
const favoritesCount = computed(() => favorites.count.value);

const searchSuggestions = computed(() => {
  if (!searchQuery.value || searchQuery.value.length < 2) return [];
  
  return pokemonData
    .filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      pokemon.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .slice(0, 6);
});

const handleSearch = () => {
  search.setQuery(searchQuery.value);
  showSearchSuggestions.value = searchQuery.value.length >= 2;
};

const clearSearch = () => {
  searchQuery.value = '';
  search.setQuery('');
  showSearchSuggestions.value = false;
};

const selectSuggestion = (pokemon: Pokemon) => {
  searchQuery.value = pokemon.name;
  showSearchSuggestions.value = false;
  showMobileSearch.value = false;
  router.push(`/pokemon/${pokemon.id}`);
};

const toggleCart = () => {
  router.push('/cart');
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
  if (showMobileMenu.value) {
    showMobileSearch.value = false;
  }
};

const toggleMobileSearch = () => {
  showMobileSearch.value = !showMobileSearch.value;
  if (showMobileSearch.value) {
    showMobileMenu.value = false;
  }
};

const closeMobileMenu = () => {
  showMobileMenu.value = false;
  showMobileSearch.value = false;
};

watch(() => router.currentRoute.value.path, () => {
  closeMobileMenu();
});

const handleClickOutside = (event: Event) => {
  const target = event.target as Element;
  if (!target.closest('header')) {
    showSearchSuggestions.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
