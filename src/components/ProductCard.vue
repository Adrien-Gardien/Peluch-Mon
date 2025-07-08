<template>
  <div class="group">
    <!-- Carte principale -->
    <div class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 card-hover">
      <!-- Image container avec overlay -->
      <div class="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img 
          :src="pokemon.image" 
          :alt="pokemon.name"
          class="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        <!-- Badge rareté -->
        <div class="absolute top-4 left-4">
          <span 
            class="px-3 py-1 text-xs font-bold rounded-full text-white shadow-lg"
            :class="getRarityBadgeClass(pokemon.rarity)"
          >
            {{ pokemon.rarity }}
          </span>
        </div>
        
        <!-- Favoris -->
        <button 
          @click="toggleFavorite"
          class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
          :class="{ 'text-red-500': isFavorite, 'text-gray-400': !isFavorite }"
        >
          <svg class="h-5 w-5" :class="{ 'fill-current': isFavorite }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        
        <!-- Badge stock -->
        <div v-if="pokemon.stockQuantity < 5 && pokemon.inStock" class="absolute bottom-4 left-4">
          <span class="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full border border-orange-200">
            Plus que {{ pokemon.stockQuantity }} en stock !
          </span>
        </div>
        
        <!-- Overlay avec action rapide -->
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            @click="quickAddToCart"
            class="px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
      
      <!-- Contenu de la carte -->
      <div class="p-6">
        <!-- En-tête avec nom et type -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
              {{ pokemon.name }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <span 
                class="px-3 py-1 text-xs font-medium rounded-full text-white shadow-sm"
                :class="getTypeClass(pokemon.category)"
              >
                {{ pokemon.category }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Prix -->
        <div class="flex items-center justify-between mb-4">
          <div class="text-3xl font-bold text-blue-600">
            {{ pokemon.price.toFixed(2) }}€
          </div>
          <div class="flex items-center space-x-1 text-yellow-400">
            <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="text-sm font-medium text-gray-600">
              {{ pokemon.rating.toFixed(1) }} ({{ pokemon.reviews.length }})
            </span>
          </div>
        </div>
        
        <!-- Description -->
        <p class="text-gray-600 text-sm leading-relaxed mb-6">
          {{ pokemon.description }}
        </p>
        
        <!-- Statistiques -->
        <div class="mb-6">
          <h4 class="text-sm font-semibold text-gray-900 mb-3">Statistiques</h4>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="(value, stat) in pokemon.stats" :key="stat" class="flex justify-between items-center">
              <span class="text-xs text-gray-600 capitalize">{{ stat }}</span>
              <div class="flex items-center space-x-2">
                <div class="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    class="h-full rounded-full transition-all duration-500 delay-200"
                    :class="getStatBarClass(value)"
                    :style="{ width: `${(value / 150) * 100}%` }"
                  ></div>
                </div>
                <span class="text-xs font-semibold text-gray-700 w-8 text-right">{{ value }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex space-x-3">
          <button 
            @click="addToCart"
            :disabled="!pokemon.inStock"
            class="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="pokemon.inStock">Ajouter au panier</span>
            <span v-else>Rupture de stock</span>
          </button>
          <button 
            @click="viewDetails"
            class="px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { Pokemon } from '../types';
import { store, cartActions, favoriteActions } from '../store';

// Props, on définit le type de la props pokemon
interface Props {
  pokemon: Pokemon;
}

const props = defineProps<Props>();
const router = useRouter();

// Computed
const isFavorite = computed(() => {
  return store.favorites.includes(props.pokemon.id);
});

// Méthodes
const toggleFavorite = (event: Event) => {
  event.stopPropagation();
  favoriteActions.toggleFavorite(props.pokemon.id);
};

const addToCart = () => {
  if (props.pokemon.inStock) {
    cartActions.addToCart(props.pokemon, 1);
  }
};

const quickAddToCart = (event: Event) => {
  event.stopPropagation();
  addToCart();
};

const viewDetails = () => {
  router.push(`/pokemon/${props.pokemon.id}`);
};

// Classes dynamiques
const getRarityBadgeClass = (rarity: string) => {
  const classes = {
    'Common': 'bg-gray-500',
    'Uncommon': 'bg-green-500',
    'Rare': 'bg-blue-500',
    'Epic': 'bg-purple-500',
    'Legendary': 'bg-gradient-to-r from-yellow-400 to-orange-500',
    'Mythical': 'bg-gradient-to-r from-purple-500 to-pink-500'
  };
  return classes[rarity as keyof typeof classes] || 'bg-gray-500';
};

const getTypeClass = (type: string) => {
  const classes = {
    'Electric': 'bg-yellow-500',
    'Fire': 'bg-red-500',
    'Water': 'bg-blue-500',
    'Grass': 'bg-green-500',
    'Psychic': 'bg-purple-500',
    'Flying': 'bg-indigo-500',
    'Dragon': 'bg-indigo-700',
    'Normal': 'bg-gray-500',
    'Ice': 'bg-cyan-500',
    'Fighting': 'bg-orange-500',
    'Poison': 'bg-purple-600',
    'Ground': 'bg-yellow-600',
    'Bug': 'bg-green-600',
    'Rock': 'bg-yellow-700',
    'Ghost': 'bg-purple-700',
    'Steel': 'bg-gray-600',
    'Fairy': 'bg-pink-500',
    'Dark': 'bg-gray-800'
  };
  return classes[type as keyof typeof classes] || 'bg-gray-500';
};

const getStatBarClass = (value: number) => {
  if (value >= 120) return 'bg-gradient-to-r from-red-500 to-red-600';
  if (value >= 100) return 'bg-gradient-to-r from-orange-500 to-orange-600';
  if (value >= 80) return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
  if (value >= 60) return 'bg-gradient-to-r from-green-500 to-green-600';
  return 'bg-gradient-to-r from-gray-400 to-gray-500';
};
</script>

<style scoped>
.group:hover {
  cursor: pointer;
}
</style> 