<template>
  <div class="w-full">
    <!-- Hero Section -->
    <section class="w-full gradient-hero text-white overflow-hidden">
      <div class="w-full px-4 sm:px-6 lg:px-8 py-24 relative">
        <!-- Fond décoratif -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-800/20"></div>
        <div class="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
        
        <div class="max-w-7xl mx-auto relative z-10">
          <div class="text-center">
            <div class="mb-8 animate-bounce">
              <div class="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span class="text-sm font-medium">✨ Nouvelle collection disponible</span>
              </div>
            </div>
            
            <h1 class="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Bienvenue chez
              <span class="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent block mt-2">
                PokéShop
              </span>
            </h1>
            
            <p class="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Découvrez notre collection exceptionnelle de Pokémon rares et légendaires. 
              Trouvez votre compagnon parfait pour devenir le meilleur dresseur !
            </p>
            
            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <router-link 
                to="/catalog" 
                class="px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-gray-100 hover:scale-105 transform transition-all duration-200 shadow-2xl"
              >
                Explorer le catalogue 🔍
              </router-link>
              <button class="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200">
                Voir les offres spéciales ⚡
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistiques -->
    <section class="w-full py-16 bg-white">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="text-center group">
              <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <span class="text-white text-2xl font-bold">{{ pokemonData.length }}</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Pokémon</h3>
              <p class="text-gray-600">Dans notre collection</p>
            </div>
            
            <div class="text-center group">
              <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <span class="text-white text-2xl">⭐</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">4.9/5</h3>
              <p class="text-gray-600">Note moyenne</p>
            </div>
            
            <div class="text-center group">
              <div class="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <span class="text-white text-2xl">🚚</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">24h</h3>
              <p class="text-gray-600">Livraison express</p>
            </div>
            
            <div class="text-center group">
              <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <span class="text-white text-2xl">💎</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">100%</h3>
              <p class="text-gray-600">Qualité garantie</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pokémon populaires -->
    <section class="w-full py-20 bg-gray-50">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pokémon 
              <span class="gradient-text">Populaires</span>
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les Pokémon les plus appréciés par notre communauté de dresseurs
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <ProductCard
              v-for="pokemon in popularPokemon"
              :key="pokemon.id"
              :pokemon="pokemon"
              class="fade-in"
            />
          </div>
          
          <div class="text-center mt-12">
            <router-link 
              to="/catalog" 
              class="btn-primary inline-flex items-center space-x-2"
            >
              <span>Voir tout le catalogue</span>
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Catégories -->
    <section class="w-full py-20 bg-white">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explorez par 
              <span class="gradient-text">Catégorie</span>
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Trouvez le type de Pokémon qui vous correspond
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div 
              v-for="category in categories" 
              :key="category.name"
              @click="navigateToCategory(category.name)"
              class="group cursor-pointer"
            >
              <div class="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div 
                  class="h-64 bg-gradient-to-br p-8 flex flex-col justify-end text-white"
                  :class="category.gradient"
                >
                  <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div class="relative z-10">
                    <div class="text-4xl mb-4">{{ category.icon }}</div>
                    <h3 class="text-2xl font-bold mb-2">{{ category.name }}</h3>
                    <p class="text-white/90">{{ category.count }} Pokémon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Offres spéciales -->
    <section class="w-full py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div class="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <span class="text-sm font-medium">⚡ Offre limitée</span>
              </div>
              
              <h2 class="text-4xl md:text-5xl font-bold mb-6">
                Pokémon Légendaires
                <span class="block text-yellow-300">-20% ce week-end</span>
              </h2>
              
              <p class="text-xl text-purple-100 mb-8 leading-relaxed">
                Profitez de notre offre exclusive sur tous les Pokémon légendaires. 
                Une occasion unique de compléter votre collection !
              </p>
              
              <div class="flex flex-col sm:flex-row gap-4">
                <button class="btn-secondary bg-white text-purple-600 hover:bg-gray-100">
                  Voir les offres
                </button>
                <div class="flex items-center space-x-2 text-purple-100">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-sm">Offre valable jusqu'à dimanche</span>
                </div>
              </div>
            </div>
            
            <div class="relative">
              <div class="grid grid-cols-2 gap-4">
                <div 
                  v-for="pokemon in legendaryPokemon.slice(0, 4)" 
                  :key="pokemon.id"
                  class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-200 hover:scale-105 cursor-pointer"
                  @click="$router.push(`/pokemon/${pokemon.id}`)"
                >
                  <img 
                    :src="pokemon.image" 
                    :alt="pokemon.name"
                    class="w-full h-24 object-contain mb-3"
                  />
                  <h4 class="font-semibold text-center">{{ pokemon.name }}</h4>
                  <div class="text-center mt-2">
                    <span class="text-lg font-bold text-yellow-300">{{ pokemon.price.toFixed(2) }}€</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="w-full py-20 bg-gray-900 text-white">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl md:text-5xl font-bold mb-6">
            Restez informé des 
            <span class="gradient-text">nouveautés</span>
          </h2>
          <p class="text-xl text-gray-300 mb-12">
            Soyez le premier à découvrir nos nouveaux Pokémon et nos offres exclusives
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Votre email..."
              class="flex-1 px-6 py-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <button class="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
              S'abonner
            </button>
          </div>
          
          <p class="text-sm text-gray-400 mt-6">
            Pas de spam, uniquement les meilleures offres. Désinscription possible à tout moment.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import { pokemonData } from '../data/pokemon';
import { searchActions } from '../store';

const router = useRouter();

// Computed
const popularPokemon = computed(() => {
  return pokemonData
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);
});

const legendaryPokemon = computed(() => {
  return pokemonData.filter(p => p.rarity === 'Legendary');
});

const categories = computed(() => [
  {
    name: 'Electric',
    icon: '⚡',
    gradient: 'from-yellow-400 to-orange-500',
    count: pokemonData.filter(p => p.category === 'Electric').length
  },
  {
    name: 'Fire',
    icon: '🔥',
    gradient: 'from-red-500 to-pink-500',
    count: pokemonData.filter(p => p.category === 'Fire').length
  },
  {
    name: 'Water',
    icon: '💧',
    gradient: 'from-blue-500 to-cyan-500',
    count: pokemonData.filter(p => p.category === 'Water').length
  },
  {
    name: 'Grass',
    icon: '🌿',
    gradient: 'from-green-500 to-teal-500',
    count: pokemonData.filter(p => p.category === 'Grass').length
  }
]);

// Méthodes
const navigateToCategory = (category: string) => {
  searchActions.updateFilters({ category: category as any });
  router.push('/catalog');
};
</script> 