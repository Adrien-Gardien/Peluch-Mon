<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Mes Favoris</h1>
      
      <div v-if="favoritePokemon.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard
          v-for="pokemon in favoritePokemon"
          :key="pokemon.id"
          :pokemon="pokemon"
        />
      </div>
      
      <div v-else class="text-center py-12">
        <div class="text-6xl mb-4">💖</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Aucun favori pour le moment</h3>
        <p class="text-gray-600 mb-6">Ajoutez des Pokémon à vos favoris pour les retrouver ici</p>
        <router-link to="/catalog" class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
          Découvrir les Pokémon
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { useFavorites } from '../composables/useStore';
import { pokemonData } from '../data/pokemon';

const favorites = useFavorites();

const favoritePokemon = computed(() => {
  return pokemonData.filter(pokemon => favorites.isFavorite(pokemon.id));
});
</script> 