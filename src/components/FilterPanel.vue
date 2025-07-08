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

      <!-- Rareté -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3">Rareté</label>
        <div class="space-y-2">
          <label
            v-for="rarity in rarities"
            :key="rarity.value"
            class="flex items-center cursor-pointer"
          >
            <input
              type="radio"
              :value="rarity.value"
              v-model="filters.rarity"
              @change="updateRarity"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span class="ml-2 text-sm text-gray-700">{{ rarity.label }}</span>
            <span
              v-if="rarity.count"
              class="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
            >
              {{ rarity.count }}
            </span>
          </label>
        </div>
      </div>

      <!-- Prix -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3">
          Prix: {{ filters.priceRange[0] }}€ - {{ filters.priceRange[1] }}€
        </label>
        <div class="px-2">
          <div class="relative">
            <input
              type="range"
              :min="priceRange.min"
              :max="priceRange.max"
              :step="50"
              v-model="filters.priceRange[0]"
              @input="updatePriceRange"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
            />
          </div>
          <div class="flex justify-between text-xs text-gray-500 mt-2">
            <span>{{ priceRange.min }}€</span>
            <span>{{ priceRange.max }}€</span>
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
import { store, searchActions } from '../store';
import { pokemonData } from '../data/pokemon';
import type { PokemonType } from '../types';

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

const rarities = computed(() => {
  const rarityCounts = pokemonData.reduce((acc, pokemon) => {
    acc[pokemon.rarity] = (acc[pokemon.rarity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return [
    { value: 'all', label: 'Toutes les raretés', count: pokemonData.length },
    { value: 'Common', label: 'Commun', count: rarityCounts.Common || 0 },
    { value: 'Uncommon', label: 'Peu commun', count: rarityCounts.Uncommon || 0 },
    { value: 'Rare', label: 'Rare', count: rarityCounts.Rare || 0 },
    { value: 'Epic', label: 'Épique', count: rarityCounts.Epic || 0 },
    { value: 'Legendary', label: 'Légendaire', count: rarityCounts.Legendary || 0 },
    { value: 'Mythical', label: 'Mythique', count: rarityCounts.Mythical || 0 }
  ];
});

const priceRange = computed(() => {
  const prices = pokemonData.map(p => p.price);
  return {
    min: Math.floor(Math.min(...prices) / 50) * 50,
    max: Math.ceil(Math.max(...prices) / 50) * 50
  };
});

const popularTags = computed(() => {
  const tagCounts = pokemonData.reduce((acc, pokemon) => {
    pokemon.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(tagCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 8)
    .map(([tag]) => tag);
});

// État des filtres
const filters = computed(() => store.filters);

// Méthodes
const updateCategory = (category: string) => {
  searchActions.updateFilters({ category: category as PokemonType | 'all' });
};

const updateRarity = () => {
  // Le v-model gère automatiquement la mise à jour
  searchActions.updateFilters({ rarity: filters.value.rarity });
};

const updatePriceRange = () => {
  // Assurer que min <= max
  if (filters.value.priceRange[0] > filters.value.priceRange[1]) {
    const temp = filters.value.priceRange[0];
    filters.value.priceRange[0] = filters.value.priceRange[1];
    filters.value.priceRange[1] = temp;
  }
  searchActions.updateFilters({ priceRange: [...filters.value.priceRange] });
};

const updateAvailability = () => {
  searchActions.updateFilters({ inStock: filters.value.inStock });
};

const updateSort = () => {
  searchActions.updateFilters({ sortBy: filters.value.sortBy });
};

const updateSortOrder = (order: 'asc' | 'desc') => {
  searchActions.updateFilters({ sortOrder: order });
};

const searchByTag = (tag: string) => {
  searchActions.setSearchQuery(tag);
};

const resetFilters = () => {
  searchActions.resetFilters();
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