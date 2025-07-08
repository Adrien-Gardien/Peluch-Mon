<template>
  <div v-if="pokemon" class="min-h-screen bg-gray-50">
    <!-- Breadcrumb -->
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav class="flex items-center space-x-2 text-sm">
          <router-link to="/" class="text-blue-600 hover:text-blue-800">Accueil</router-link>
          <span class="text-gray-400">/</span>
          <router-link to="/catalog" class="text-blue-600 hover:text-blue-800">Catalogue</router-link>
          <span class="text-gray-400">/</span>
          <span class="text-gray-900">{{ pokemon.name }}</span>
        </nav>
      </div>
    </div>

    <!-- Contenu principal -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Galerie d'images -->
        <div class="space-y-6">
          <div class="aspect-square bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              :src="selectedImage"
              :alt="pokemon.name"
              class="w-full h-full object-contain p-8"
              @error="handleImageError"
            />
          </div>
          
          <!-- Miniatures -->
          <div class="grid grid-cols-3 gap-4">
            <button
              v-for="(image, index) in pokemon.images"
              :key="index"
              @click="selectedImage = image"
              :class="[
                'aspect-square bg-white rounded-lg shadow-md overflow-hidden border-2 transition-all duration-200',
                selectedImage === image ? 'border-blue-500' : 'border-transparent hover:border-gray-300'
              ]"
            >
              <img
                :src="image"
                :alt="`${pokemon.name} ${index + 1}`"
                class="w-full h-full object-contain p-2"
              />
            </button>
          </div>
        </div>

        <!-- Informations produit -->
        <div class="space-y-6">
          <!-- En-tête -->
          <div>
            <div class="flex items-center justify-between mb-4">
              <h1 class="text-3xl md:text-4xl font-bold text-gray-900">{{ pokemon.name }}</h1>
              <button
                @click="toggleFavorite"
                :class="[
                  'p-3 rounded-full transition-all duration-200 border',
                  isFavorite 
                    ? 'bg-red-50 text-red-500 border-red-200' 
                    : 'bg-white text-gray-400 border-gray-200 hover:text-red-500 hover:border-red-200'
                ]"
              >
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
            </div>

            <!-- Tags et badges -->
            <div class="flex flex-wrap items-center gap-3 mb-4">
              <span :class="typeClasses" class="px-3 py-1 text-sm font-medium rounded-full">
                {{ pokemon.category }}
              </span>
              <span :class="rarityClasses" class="px-3 py-1 text-sm font-semibold rounded-full">
                {{ pokemon.rarity }}
              </span>
              <div class="flex items-center space-x-1">
                <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span class="font-medium">{{ pokemon.rating }}</span>
                <span class="text-gray-500">({{ pokemon.reviews.length }} avis)</span>
              </div>
            </div>

            <!-- Prix -->
            <div class="flex items-center space-x-4 mb-6">
              <span class="text-4xl font-bold text-gray-900">{{ pokemon.price.toFixed(2) }}€</span>
              <span v-if="pokemon.originalPrice" class="text-xl text-gray-500 line-through">
                {{ pokemon.originalPrice.toFixed(2) }}€
              </span>
              <span v-if="pokemon.originalPrice" class="px-2 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded">
                -{{ discountPercentage }}%
              </span>
            </div>

            <!-- Stock -->
            <div class="mb-6">
              <div v-if="pokemon.inStock" class="flex items-center text-green-600">
                <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                En stock ({{ pokemon.stockQuantity }} disponibles)
              </div>
              <div v-else class="flex items-center text-red-600">
                <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Rupture de stock
              </div>
            </div>
          </div>

          <!-- Description -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p class="text-gray-600 leading-relaxed">{{ pokemon.description }}</p>
          </div>

          <!-- Statistiques -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Statistiques</h3>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="(value, stat) in pokemon.stats" :key="stat" class="bg-white rounded-lg p-4 shadow-sm">
                <div class="text-sm text-gray-500 mb-1">{{ formatStatName(stat) }}</div>
                <div class="flex items-center">
                  <span class="text-2xl font-bold text-gray-900 mr-3">{{ value }}</span>
                  <div class="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      :style="{ width: `${(value / 200) * 100}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Informations supplémentaires -->
          <div class="grid grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Capacités</h4>
              <div class="space-y-1">
                <span v-for="ability in pokemon.abilities" :key="ability" 
                      class="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded mr-2 mb-1">
                  {{ ability }}
                </span>
              </div>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Caractéristiques</h4>
              <div class="text-sm text-gray-600 space-y-1">
                <div>Poids: {{ pokemon.weight }} kg</div>
                <div>Taille: {{ pokemon.height }} m</div>
              </div>
            </div>
          </div>

          <!-- Actions d'achat -->
          <div class="border-t pt-6 space-y-4">
            <div class="flex items-center space-x-4">
              <div class="flex items-center border border-gray-300 rounded-lg">
                <button 
                  @click="quantity = Math.max(1, quantity - 1)"
                  class="px-3 py-2 text-gray-600 hover:text-gray-800"
                >
                  -
                </button>
                <span class="px-4 py-2 border-x border-gray-300">{{ quantity }}</span>
                <button 
                  @click="quantity = Math.min(pokemon.stockQuantity, quantity + 1)"
                  class="px-3 py-2 text-gray-600 hover:text-gray-800"
                >
                  +
                </button>
              </div>
              <span class="text-sm text-gray-500">Quantité</span>
            </div>

            <div class="flex space-x-4">
              <button
                @click="addToCart"
                :disabled="!pokemon.inStock"
                class="flex-1 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <svg class="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 5.5M7 13l-1.5 5.5m0 0h9m-9 0a1.5 1.5 0 003 0m6 0a1.5 1.5 0 003 0" />
                </svg>
                Ajouter au panier
              </button>
              <button 
                @click="buyNow"
                :disabled="!pokemon.inStock"
                class="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Acheter maintenant
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Avis clients -->
      <div v-if="pokemon.reviews.length > 0" class="mt-16">
        <h3 class="text-2xl font-bold text-gray-900 mb-8">Avis clients</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="review in pokemon.reviews" :key="review.id" class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {{ review.userName.charAt(0) }}
                </div>
                <div>
                  <div class="font-semibold text-gray-900">{{ review.userName }}</div>
                  <div class="text-sm text-gray-500">{{ formatDate(review.date) }}</div>
                </div>
              </div>
              <div class="flex items-center">
                <div class="flex space-x-1">
                  <svg v-for="i in 5" :key="i" 
                       :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                       class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
            </div>
            <p class="text-gray-700">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Pokemon non trouvé -->
  <div v-else class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <div class="text-6xl mb-4">😕</div>
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Pokémon non trouvé</h1>
      <p class="text-gray-600 mb-8">Le Pokémon que vous cherchez n'existe pas ou n'est plus disponible.</p>
      <router-link 
        to="/catalog"
        class="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        Retour au catalogue
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { pokemonData } from '../data/pokemon';
import { cartActions, favoriteActions } from '../store';

const router = useRouter();
const route = useRoute();

// Props
interface Props {
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: ''
});

// États locaux
const selectedImage = ref('');
const quantity = ref(1);

// Données
const pokemon = computed(() => {
  const id = parseInt(props.id || route.params.id as string);
  return pokemonData.find(p => p.id === id);
});

const isFavorite = computed(() => {
  if (!pokemon.value) return false;
  return favoriteActions.isFavorite(pokemon.value.id);
});

const discountPercentage = computed(() => {
  if (!pokemon.value?.originalPrice) return 0;
  return Math.round(((pokemon.value.originalPrice - pokemon.value.price) / pokemon.value.originalPrice) * 100);
});

const typeClasses = computed(() => {
  if (!pokemon.value) return '';
  const classes = {
    'Fire': 'bg-red-100 text-red-800',
    'Water': 'bg-blue-100 text-blue-800',
    'Grass': 'bg-green-100 text-green-800',
    'Electric': 'bg-yellow-100 text-yellow-800',
    'Psychic': 'bg-pink-100 text-pink-800',
    'Ice': 'bg-cyan-100 text-cyan-800',
    'Dragon': 'bg-indigo-100 text-indigo-800',
    'Dark': 'bg-gray-100 text-gray-800',
    'Fighting': 'bg-red-100 text-red-800',
    'Poison': 'bg-purple-100 text-purple-800',
    'Ground': 'bg-yellow-100 text-yellow-800',
    'Flying': 'bg-blue-100 text-blue-800',
    'Bug': 'bg-green-100 text-green-800',
    'Rock': 'bg-yellow-100 text-yellow-800',
    'Ghost': 'bg-purple-100 text-purple-800',
    'Steel': 'bg-gray-100 text-gray-800',
    'Fairy': 'bg-pink-100 text-pink-800',
    'Normal': 'bg-gray-100 text-gray-800'
  };
  return classes[pokemon.value.category] || classes.Normal;
});

const rarityClasses = computed(() => {
  if (!pokemon.value) return '';
  const classes = {
    'Common': 'bg-gray-100 text-gray-800',
    'Uncommon': 'bg-green-100 text-green-800',
    'Rare': 'bg-blue-100 text-blue-800',
    'Epic': 'bg-purple-100 text-purple-800',
    'Legendary': 'bg-orange-100 text-orange-800',
    'Mythical': 'bg-pink-100 text-pink-800'
  };
  return classes[pokemon.value.rarity] || classes.Common;
});

// Méthodes
const toggleFavorite = () => {
  if (pokemon.value) {
    favoriteActions.toggleFavorite(pokemon.value.id);
  }
};

const addToCart = () => {
  if (pokemon.value && pokemon.value.inStock) {
    cartActions.addToCart(pokemon.value, quantity.value);
    // TODO: Afficher notification de succès
  }
};

const buyNow = () => {
  if (pokemon.value && pokemon.value.inStock) {
    cartActions.addToCart(pokemon.value, quantity.value);
    router.push('/cart');
  }
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = 'https://via.placeholder.com/400x400?text=Pokemon';
};

const formatStatName = (stat: string) => {
  const names = {
    hp: 'PV',
    attack: 'Attaque',
    defense: 'Défense',
    specialAttack: 'Att. Spé.',
    specialDefense: 'Déf. Spé.',
    speed: 'Vitesse'
  };
  return names[stat as keyof typeof names] || stat;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR');
};

// Lifecycle
onMounted(() => {
  if (pokemon.value) {
    selectedImage.value = pokemon.value.image;
  }
});
</script> 