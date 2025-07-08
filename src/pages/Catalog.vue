<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- En-tête de la page -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Catalogue Pokémon</h1>
          <p class="text-gray-600">Découvrez notre collection de {{ totalPokemon }} Pokémon</p>
        </div>
        
        <!-- Bouton filtres mobile -->
        <button 
          @click="showMobileFilters = !showMobileFilters"
          class="sm:hidden mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"/>
          </svg>
          <span>Filtres</span>
          <span v-if="activeFiltersCount > 0" class="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
            {{ activeFiltersCount }}
          </span>
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Panneau de filtres -->
        <div class="lg:col-span-1">
          <!-- Filtres desktop -->
          <div class="hidden lg:block sticky top-24">
            <FilterPanel />
          </div>
          
          <!-- Filtres mobile -->
          <div v-if="showMobileFilters" class="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" @click="showMobileFilters = false">
            <div class="fixed inset-y-0 left-0 w-80 bg-white shadow-xl p-6 overflow-y-auto" @click.stop>
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-semibold">Filtres</h3>
                <button @click="showMobileFilters = false" class="text-gray-400 hover:text-gray-600">
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <FilterPanel />
            </div>
          </div>
        </div>

        <!-- Contenu principal -->
        <div class="lg:col-span-3">
          <!-- Barre de contrôles -->
          <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div class="flex items-center space-x-4">
                <div class="text-sm text-gray-600">
                  {{ filteredPokemon.length }} résultat{{ filteredPokemon.length > 1 ? 's' : '' }}
                </div>
                
                <!-- Tri rapide -->
                <select 
                  v-model="selectedSort" 
                  @change="handleSortChange"
                  class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="name">Nom</option>
                  <option value="price">Prix</option>
                  <option value="rating">Note</option>
                  <option value="newest">Plus récent</option>
                </select>
              </div>
              
              <!-- Items par page -->
              <div class="flex items-center space-x-2">
                <label class="text-sm text-gray-600">Afficher:</label>
                <select 
                  v-model="itemsPerPage" 
                  @change="currentPage = 1"
                  class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option :value="9">9</option>
                  <option :value="18">18</option>
                  <option :value="36">36</option>
                </select>
                <span class="text-sm text-gray-600">par page</span>
              </div>
            </div>
          </div>

          <!-- Grille des produits -->
          <div v-if="paginatedPokemon.length > 0">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <ProductCard
                v-for="pokemon in paginatedPokemon"
                :key="pokemon.id"
                :pokemon="pokemon"
              />
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2 mt-8">
              <button 
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              
              <div class="flex space-x-1">
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>
              </div>
              
              <button 
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- État vide -->
          <div v-else class="text-center py-12">
            <div class="text-6xl mb-4">🔍</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Aucun Pokémon trouvé</h3>
            <p class="text-gray-600 mb-6">Essayez d'ajuster vos filtres ou votre recherche</p>
            <button 
              @click="resetAllFilters"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Réinitialiser les filtres
            </button>
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
import { useSearch } from '../composables/useStore';
import { pokemonData } from '../data/pokemon';

const search = useSearch();

const showMobileFilters = ref(false);
const selectedSort = ref('name');
const currentPage = ref(1);
const itemsPerPage = ref(9);

const totalPokemon = computed(() => pokemonData.length);

const filteredPokemon = computed(() => {
  let filtered = [...pokemonData];
  
  if (search.query.value) {
    const query = search.query.value.toLowerCase();
    filtered = filtered.filter(pokemon => 
      pokemon.name.toLowerCase().includes(query) ||
      pokemon.category.toLowerCase().includes(query) ||
      pokemon.abilities.some(ability => ability.toLowerCase().includes(query)) ||
      pokemon.description.toLowerCase().includes(query)
    );
  }
  
  if (search.filters.value.category !== 'all') {
    filtered = filtered.filter(pokemon => pokemon.category === search.filters.value.category);
  }
  
  if (search.filters.value.rarity !== 'all') {
    filtered = filtered.filter(pokemon => pokemon.rarity === search.filters.value.rarity);
  }
  
  filtered = filtered.filter(pokemon => 
    pokemon.price >= search.filters.value.priceRange[0] && 
    pokemon.price <= search.filters.value.priceRange[1]
  );
  
  if (search.filters.value.inStock) {
    filtered = filtered.filter(pokemon => pokemon.inStock);
  }
  
  filtered.sort((a, b) => {
    const { sortBy, sortOrder } = search.filters.value;
    let result = 0;
    
    switch (sortBy) {
      case 'name':
        result = a.name.localeCompare(b.name);
        break;
      case 'price':
        result = a.price - b.price;
        break;
      case 'rating':
        result = a.rating - b.rating;
        break;
      case 'newest':
        break;
      default:
        result = 0;
    }
    
    return sortOrder === 'asc' ? result : -result;
  });
  
  return filtered;
});

const totalPages = computed(() => Math.ceil(filteredPokemon.value.length / itemsPerPage.value));

const paginatedPokemon = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredPokemon.value.slice(start, start + itemsPerPage.value);
});

const visiblePages = computed(() => {
  const pages = [];
  const current = currentPage.value;
  const total = totalPages.value;
  
  let start = Math.max(1, current - 2);
  let end = Math.min(total, start + 4);
  
  if (end - start < 4) {
    start = Math.max(1, end - 4);
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});

const activeFiltersCount = computed(() => {
  let count = 0;
  const filters = search.filters.value;
  
  if (filters.category !== 'all') count++;
  if (filters.rarity !== 'all') count++;
  if (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) count++;
  if (!filters.inStock) count++;
  
  return count;
});

const handleSortChange = () => {
  search.updateFilters({ 
    sortBy: selectedSort.value as any,
    sortOrder: search.filters.value.sortOrder 
  });
  currentPage.value = 1;
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const resetAllFilters = () => {
  search.resetFilters();
  currentPage.value = 1;
  showMobileFilters.value = false;
};

watch(() => search.filters.value, () => {
  currentPage.value = 1;
}, { deep: true });

watch(() => search.query.value, () => {
  currentPage.value = 1;
});

watch(() => showMobileFilters.value, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>