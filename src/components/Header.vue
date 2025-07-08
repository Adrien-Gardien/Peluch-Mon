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

        <!-- Barre de recherche -->
        <div class="flex-1 max-w-2xl mx-8 hidden md:block">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Rechercher un Pokémon..."
              class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white shadow-sm"
            />
            <!-- Badge de recherche active -->
            <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                @click="clearSearch"
                class="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all duration-200"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Navigation desktop -->
        <nav class="hidden lg:flex items-center space-x-8">
          <router-link
            to="/"
            class="relative px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 group"
            :class="{ 'text-blue-600 bg-blue-50': $route.path === '/' }"
          >
            Accueil
            <span v-if="$route.path === '/'" class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full"></span>
          </router-link>
          <router-link
            to="/catalog"
            class="relative px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 group"
            :class="{ 'text-blue-600 bg-blue-50': $route.path === '/catalog' }"
          >
            Catalogue
            <span v-if="$route.path === '/catalog'" class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full"></span>
          </router-link>
          <router-link
            to="/favorites"
            class="relative px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 group"
            :class="{ 'text-blue-600 bg-blue-50': $route.path === '/favorites' }"
          >
            <span class="flex items-center space-x-1">
              <span>Favoris</span>
              <span v-if="favoritesCount > 0" class="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full animate-pulse">
                {{ favoritesCount }}
              </span>
            </span>
            <span v-if="$route.path === '/favorites'" class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full"></span>
          </router-link>
        </nav>

        <!-- Actions utilisateur -->
        <div class="flex items-center space-x-4">
          <!-- Panier -->
          <button
            @click="toggleCart"
            class="relative p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 5.5M7 13l-1.5 5.5m0 0h9m-9 0a1.5 1.5 0 003 0m6 0a1.5 1.5 0 003 0" />
            </svg>
            <span v-if="cartItemsCount > 0" class="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce shadow-lg">
              {{ cartItemsCount }}
            </span>
          </button>

          <!-- Bouton recherche mobile -->
          <button
            @click="toggleMobileSearch"
            class="md:hidden p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Menu mobile -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
          >
            <svg v-if="!showMobileMenu" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Barre de recherche mobile -->
      <div v-if="showMobileSearch" class="md:hidden pb-4 border-t border-gray-100 pt-4">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="Rechercher un Pokémon..."
            class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
          />
        </div>
      </div>

      <!-- Menu mobile -->
      <div v-if="showMobileMenu" class="lg:hidden pb-6 border-t border-gray-100 pt-6">
        <nav class="space-y-4">
          <router-link
            to="/"
            @click="closeMobileMenu"
            class="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 rounded-lg"
            :class="{ 'text-blue-600 bg-blue-50': $route.path === '/' }"
          >
            🏠 Accueil
          </router-link>
          <router-link
            to="/catalog"
            @click="closeMobileMenu"
            class="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 rounded-lg"
            :class="{ 'text-blue-600 bg-blue-50': $route.path === '/catalog' }"
          >
            📱 Catalogue
          </router-link>
          <router-link
            to="/favorites"
            @click="closeMobileMenu"
            class="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 rounded-lg"
            :class="{ 'text-blue-600 bg-blue-50': $route.path === '/favorites' }"
          >
            <span>💖 Favoris</span>
            <span v-if="favoritesCount > 0" class="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
              {{ favoritesCount }}
            </span>
          </router-link>
          <router-link
            to="/cart"
            @click="closeMobileMenu"
            class="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 rounded-lg"
            :class="{ 'text-blue-600 bg-blue-50': $route.path === '/cart' }"
          >
            <span>🛒 Panier</span>
            <span v-if="cartItemsCount > 0" class="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
              {{ cartItemsCount }}
            </span>
          </router-link>
        </nav>
      </div>
    </div>

    <!-- Suggestions de recherche -->
    <div v-if="showSearchSuggestions && searchSuggestions.length > 0" class="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 z-50">
      <div class="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div class="max-w-2xl mx-auto space-y-2">
          <button
            v-for="suggestion in searchSuggestions"
            :key="suggestion.id"
            @click="selectSuggestion(suggestion)"
            class="w-full flex items-center space-x-4 p-3 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
          >
            <img :src="suggestion.image" :alt="suggestion.name" class="w-12 h-12 object-contain rounded-lg bg-gray-50 p-1 group-hover:scale-110 transition-transform duration-200" />
            <div class="flex-1 text-left">
              <p class="font-semibold text-gray-900 group-hover:text-blue-600">{{ suggestion.name }}</p>
              <div class="flex items-center space-x-2 text-sm">
                <span class="text-blue-600 font-bold">{{ suggestion.price.toFixed(2) }}€</span>
                <span class="text-gray-500">{{ suggestion.category }}</span>
              </div>
            </div>
            <svg class="h-5 w-5 text-gray-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { store, searchActions, cartComputed } from '../store';
import { pokemonData } from '../data/pokemon';
import type { Pokemon } from '../types';

const router = useRouter();

// États locaux
const showMobileMenu = ref(false);
const showMobileSearch = ref(false);
const showSearchSuggestions = ref(false);
const searchQuery = ref('');

// Computed
const cartItemsCount = cartComputed.totalItems;
const favoritesCount = computed(() => store.favorites.length);

const searchSuggestions = computed(() => {
  if (!searchQuery.value || searchQuery.value.length < 2) return [];
  
  return pokemonData
    .filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      pokemon.category.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      pokemon.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
    )
    .slice(0, 6);
});

// Méthodes
const handleSearch = () => {
  searchActions.setSearchQuery(searchQuery.value);
  showSearchSuggestions.value = searchQuery.value.length >= 2;
};

const clearSearch = () => {
  searchQuery.value = '';
  searchActions.setSearchQuery('');
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

// Watchers
watch(() => router.currentRoute.value.path, () => {
  closeMobileMenu();
});

// Fermer les suggestions quand on clique ailleurs
import { onMounted, onUnmounted } from 'vue';

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