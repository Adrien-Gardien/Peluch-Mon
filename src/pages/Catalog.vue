<template>
  <div class="w-full min-h-screen bg-gray-50">
    <!-- Header de page -->
    <div class="w-full bg-white shadow-sm border-b border-gray-200">
      <div class="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Catalogue Pokémon
              </h1>
              <p class="text-lg text-gray-600">
                Découvrez notre collection complète de {{ totalPokemon }} Pokémon
              </p>
            </div>
            
            <!-- Filtres rapides mobile -->
            <div class="mt-6 lg:mt-0">
              <button
                @click="showMobileFilters = !showMobileFilters"
                class="lg:hidden w-full btn-primary flex items-center justify-center space-x-2"
              >
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                <span>Filtres ({{ activeFiltersCount }})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div class="max-w-7xl mx-auto">
        <div class="lg:grid lg:grid-cols-4 lg:gap-8">
          <!-- Sidebar filtres - Desktop -->
          <div class="hidden lg:block">
            <div class="sticky top-24">
              <FilterPanel />
            </div>
          </div>

          <!-- Filtres mobile -->
          <div 
            v-if="showMobileFilters" 
            class="lg:hidden fixed inset-0 z-50 bg-black/50"
            @click="showMobileFilters = false"
          >
            <div 
              class="bg-white h-full w-80 shadow-2xl overflow-y-auto"
              @click.stop
            >
              <div class="p-6">
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-lg font-semibold text-gray-900">Filtres</h3>
                  <button
                    @click="showMobileFilters = false"
                    class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all duration-200"
                  >
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <FilterPanel />
              </div>
            </div>
          </div>

          <!-- Contenu principal -->
          <div class="lg:col-span-3">
            <!-- Barre d'actions -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
              <!-- Résultats -->
              <div class="flex items-center space-x-4">
                <span class="text-sm text-gray-600">
                  {{ filteredPokemon.length }} résultat{{ filteredPokemon.length > 1 ? 's' : '' }}
                </span>
                
                <!-- Badges filtres actifs -->
                <div v-if="activeFiltersCount > 0" class="flex flex-wrap gap-2">
                  <button
                    v-for="filter in activeFiltersBadges"
                    :key="filter.key"
                    @click="removeFilter(filter.key, filter.value)"
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200"
                  >
                    {{ filter.label }}
                    <svg class="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <button
                    @click="clearAllFilters"
                    class="text-xs text-red-600 hover:text-red-800 font-medium"
                  >
                    Tout effacer
                  </button>
                </div>
              </div>

              <!-- Tri -->
              <div class="flex items-center space-x-4">
                <label class="text-sm font-medium text-gray-700">Trier par :</label>
                <select
                  v-model="selectedSort"
                  class="input-modern text-sm py-2 px-3 min-w-36"
                >
                  <option value="name">Nom (A-Z)</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="rating">Note</option>
                  <option value="rarity">Rareté</option>
                </select>
              </div>
            </div>

            <!-- Grille des Pokémon -->
            <div v-if="filteredPokemon.length > 0">
              <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <ProductCard
                  v-for="pokemon in paginatedPokemon"
                  :key="pokemon.id"
                  :pokemon="pokemon"
                  class=""
                />
              </div>

              <!-- Pagination -->
              <div v-if="totalPages > 1" class="flex justify-center mt-12">
                <nav class="flex items-center space-x-2">
                  <button
                    @click="goToPage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Précédent
                  </button>
                  
                  <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="goToPage(page)"
                    class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                    :class="page === currentPage 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'"
                  >
                    {{ page }}
                  </button>
                  
                  <button
                    @click="goToPage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Suivant
                  </button>
                </nav>
              </div>
            </div>

            <!-- État vide -->
            <div v-else class="text-center py-20">
              <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Aucun Pokémon trouvé</h3>
              <p class="text-gray-600 mb-8">
                Essayez de modifier vos critères de recherche ou de filtrage
              </p>
              <button
                @click="clearAllFilters"
                class="btn-primary"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import FilterPanel from '../components/FilterPanel.vue';
import { store, searchActions } from '../store';
import { pokemonData } from '../data/pokemon';

// États locaux
const showMobileFilters = ref(false);
const selectedSort = ref('name');
const currentPage = ref(1);
const itemsPerPage = 9;

// Computed
const totalPokemon = computed(() => pokemonData.length);

const filteredPokemon = computed(() => {
  let filtered = pokemonData.filter(pokemon => {
    // Recherche par nom
    if (store.searchQuery) {
      const searchLower = store.searchQuery.toLowerCase();
      if (
        !pokemon.name.toLowerCase().includes(searchLower) &&
        !pokemon.category.toLowerCase().includes(searchLower) &&
        !pokemon.tags.some(tag => tag.toLowerCase().includes(searchLower))
      ) {
        return false;
      }
    }

    // Filtres
    const filters = store.filters;
    
    if (filters.category !== 'all' && pokemon.category !== filters.category) {
      return false;
    }
    
    if (filters.rarity !== 'all' && pokemon.rarity !== filters.rarity) {
      return false;
    }
    
    if (pokemon.price < filters.priceRange[0] || pokemon.price > filters.priceRange[1]) {
      return false;
    }
    
    if (filters.inStock && !pokemon.inStock) {
      return false;
    }

    return true;
  });

  // Tri
     switch (selectedSort.value) {
     case 'price-asc':
       filtered.sort((a, b) => a.price - b.price);
       break;
     case 'price-desc':
       filtered.sort((a, b) => b.price - a.price);
       break;
     case 'rating':
       filtered.sort((a, b) => b.rating - a.rating);
       break;
     case 'rarity':
       const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythical'];
       filtered.sort((a, b) => rarityOrder.indexOf(b.rarity) - rarityOrder.indexOf(a.rarity));
       break;
     default:
       filtered.sort((a, b) => a.name.localeCompare(b.name));
   }

  return filtered;
});

const totalPages = computed(() => Math.ceil(filteredPokemon.value.length / itemsPerPage));

const paginatedPokemon = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredPokemon.value.slice(start, start + itemsPerPage);
});

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, start + 4);
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});

const activeFiltersCount = computed(() => {
  let count = 0;
  const filters = store.filters;
  
  if (filters.category !== 'all') count++;
  if (filters.rarity !== 'all') count++;
  if (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) count++;
  if (filters.inStock) count++;
  
  return count;
});

const activeFiltersBadges = computed(() => {
  const badges = [];
  const filters = store.filters;
  
  if (filters.category !== 'all') {
    badges.push({ key: 'category', value: null, label: `Catégorie: ${filters.category}` });
  }
  if (filters.rarity !== 'all') {
    badges.push({ key: 'rarity', value: null, label: `Rareté: ${filters.rarity}` });
  }
  if (filters.priceRange[0] > 0) {
    badges.push({ key: 'priceMin', value: null, label: `Prix min: ${filters.priceRange[0]}€` });
  }
  if (filters.priceRange[1] < 2000) {
    badges.push({ key: 'priceMax', value: null, label: `Prix max: ${filters.priceRange[1]}€` });
  }
  if (filters.inStock) {
    badges.push({ key: 'inStock', value: null, label: 'En stock uniquement' });
  }
  
  return badges;
});

// Méthodes
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const removeFilter = (key: string, value: any) => {
  const newFilters = { ...store.filters };
  if (key === 'category') newFilters.category = 'all';
  if (key === 'rarity') newFilters.rarity = 'all';
  if (key === 'priceMin') newFilters.priceRange = [0, newFilters.priceRange[1]];
  if (key === 'priceMax') newFilters.priceRange = [newFilters.priceRange[0], 2000];
  if (key === 'inStock') newFilters.inStock = false;
  
  searchActions.updateFilters(newFilters);
};

const clearAllFilters = () => {
  searchActions.resetFilters();
  currentPage.value = 1;
};

// Watchers
watch([() => store.filters, () => store.searchQuery], () => {
  currentPage.value = 1;
}, { deep: true });
</script> 