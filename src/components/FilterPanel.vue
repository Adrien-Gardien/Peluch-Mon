<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Filtres</h3>
      <button
        @click="resetFilters"
        class="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
      >
        Réinitialiser
      </button>
    </div>

    <div class="space-y-6">
      <!-- Catégorie -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3">Catégorie</label>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="category in categories"
            :key="category.value"
            @click="updateCategory(category.value)"
            :class="[
              'px-3 py-2 text-sm rounded-lg border transition-all duration-200',
              filters.category === category.value
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-600'
            ]"
          >
            {{ category.label }}
          </button>
        </div>
      </div>

      <!-- Prix -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3">
          Prix: {{ filters.priceRange[0] }}€ - {{ filters.priceRange[1] }}€
        </label>
        <div class="space-y-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Prix minimum</label>
            <input 
              type="range" 
              v-model.number="filters.priceRange[0]" 
              :min="0" 
              :max="1000"
              :step="10"
              @input="updatePriceRange"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
            />
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Prix maximum</label>
            <input 
              type="range" 
              v-model.number="filters.priceRange[1]" 
              :min="filters.priceRange[0]" 
              :max="2000"
              :step="10"
              @input="updatePriceRange"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
            />
          </div>
        </div>
      </div>

      <!-- Disponibilité -->
      <div>
        <label class="flex items-center cursor-pointer">
          <input
            type="checkbox"
            v-model="filters.inStock"
            @change="updateAvailability"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span class="ml-2 text-sm text-gray-700">En stock uniquement</span>
        </label>
      </div>

      <!-- Tri -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3">Trier par</label>
        <select
          v-model="filters.sortBy"
          @change="updateSort"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          <option value="name">Nom</option>
          <option value="price">Prix</option>
          <option value="rating">Note</option>
          <option value="newest">Nouveautés</option>
        </select>
        
        <div class="mt-2 flex space-x-2">
          <button
            @click="updateSortOrder('asc')"
            :class="[
              'flex-1 px-3 py-2 text-sm rounded-lg border transition-all duration-200',
              filters.sortOrder === 'asc'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
            ]"
          >
            Croissant
          </button>
          <button
            @click="updateSortOrder('desc')"
            :class="[
              'flex-1 px-3 py-2 text-sm rounded-lg border transition-all duration-200',
              filters.sortOrder === 'desc'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
            ]"
          >
            Décroissant
          </button>
        </div>
      </div>

      <!-- Tags populaires -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3">Tags populaires</label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in popularTags"
            :key="tag"
            @click="searchByTag(tag)"
            class="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSearch } from '../composables/useStore';
import { useMainStore } from '../store';
import type { PokemonType } from '../types';

const search = useSearch();
const store = useMainStore();

// Données pour les filtres
const categories = computed(() => [
  { value: 'all', label: 'Tous' },
  { value: 'Fire', label: 'Feu' },
  { value: 'Water', label: 'Eau' },
  { value: 'Grass', label: 'Plante' },
  { value: 'Electric', label: 'Électrique' },
  { value: 'Psychic', label: 'Psychique' },
  { value: 'Ice', label: 'Glace' },
  { value: 'Dragon', label: 'Dragon' },
  { value: 'Dark', label: 'Ténèbres' },
  { value: 'Fighting', label: 'Combat' },
  { value: 'Poison', label: 'Poison' },
  { value: 'Ground', label: 'Sol' },
  { value: 'Flying', label: 'Vol' },
  { value: 'Bug', label: 'Insecte' },
  { value: 'Rock', label: 'Roche' },
  { value: 'Ghost', label: 'Spectre' },
  { value: 'Steel', label: 'Acier' },
  { value: 'Fairy', label: 'Fée' },
  { value: 'Normal', label: 'Normal' }
]);

const popularTags = computed(() => {
  const tagCounts: Record<string, number> = {};
  store.pokemons.forEach(pokemon => {
    pokemon.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag);
});

// État des filtres
const filters = computed(() => search.filters.value);

// Méthodes
const updateCategory = (category: string) => {
  search.updateFilters({ category: category as PokemonType | 'all' });
};

const updatePriceRange = () => {
  // Assurer que min <= max
  if (filters.value.priceRange[0] > filters.value.priceRange[1]) {
    const temp = filters.value.priceRange[0];
    filters.value.priceRange[0] = filters.value.priceRange[1];
    filters.value.priceRange[1] = temp;
  }
  search.updateFilters({ priceRange: [...filters.value.priceRange] });
};

const updateAvailability = () => {
  search.updateFilters({ inStock: filters.value.inStock });
};

const updateSort = () => {
  search.updateFilters({ sortBy: filters.value.sortBy });
};

const updateSortOrder = (order: 'asc' | 'desc') => {
  search.updateFilters({ sortOrder: order });
};

const searchByTag = (tag: string) => {
  search.setQuery(tag);
};

const resetFilters = () => {
  search.resetFilters();
};
</script>

<style scoped>
.range-slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3B82F6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.range-slider::-webkit-slider-track {
  height: 8px;
  cursor: pointer;
  background: #E5E7EB;
  border-radius: 4px;
}

.range-slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3B82F6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.range-slider::-moz-range-track {
  height: 8px;
  cursor: pointer;
  background: #E5E7EB;
  border-radius: 4px;
}
</style>
