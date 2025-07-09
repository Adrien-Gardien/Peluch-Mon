<script setup lang="ts">
import { onMounted } from 'vue';
import Header from './components/Header.vue';
import { useMainStore } from './store';

const store = useMainStore();

onMounted(() => {
  store.fetchPokemons();
});
</script>

<template>
  <div id="app" class="w-full min-h-screen flex flex-col bg-gray-50">
    <!-- Header global -->
    <Header />
    
    <!-- Contenu des pages -->
    <main class="flex-1 w-full">
      <router-view />
    </main>
    
    <!-- Footer moderne -->
    <footer class="w-full bg-gray-900 text-white mt-auto">
      <div class="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <!-- Logo et description -->
            <div class="lg:col-span-2">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span class="text-white font-bold text-xl">P</span>
                </div>
                <span class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  PokéShop
                </span>
              </div>
              <p class="text-gray-300 mb-8 max-w-md leading-relaxed">
                La boutique de référence pour tous les dresseurs de Pokémon. 
                Découvrez notre collection exceptionnelle et trouvez votre compagnon idéal.
              </p>
              <!-- Réseaux sociaux -->
              <div class="flex space-x-4">
                <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-600 transition-all duration-200 hover:scale-110">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-purple-600 transition-all duration-200 hover:scale-110">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-200 hover:scale-110">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-500 transition-all duration-200 hover:scale-110">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <!-- Navigation -->
            <div>
              <h3 class="text-lg font-semibold mb-6 text-white">Navigation</h3>
              <ul class="space-y-3">
                <li>
                  <router-link to="/" class="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 inline-block">
                    Accueil
                  </router-link>
                </li>
                <li>
                  <router-link to="/catalog" class="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 inline-block">
                    Catalogue
                  </router-link>
                </li>
                <li>
                  <router-link to="/favorites" class="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 inline-block">
                    Mes Favoris
                  </router-link>
                </li>
                <li>
                  <router-link to="/cart" class="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 inline-block">
                    Mon Panier
                  </router-link>
                </li>
              </ul>
            </div>
            
            <!-- Support -->
            <div>
              <h3 class="text-lg font-semibold mb-6 text-white">Support</h3>
              <ul class="space-y-3">
                <li>
                  <a href="#" class="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 inline-block">
                    Centre d'aide
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 inline-block">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 inline-block">
                    Livraison
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 inline-block">
                    Retours
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Barre du bas -->
          <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p class="text-gray-400 text-sm">
              © 2024 PokéShop. Tous droits réservés.
            </p>
            <div class="flex space-x-6">
              <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Politique de confidentialité
              </a>
              <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Conditions d'utilisation
              </a>
              <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Styles globaux personnalisés */
#app {
  display: flex;
  flex-direction: column;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Animations personnalisées */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* .fade-in {
  animation: fadeIn 0.5s ease-out;
} */

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}

/* Transition pour les changements de route */
.router-view {
  transition: all 0.3s ease-out;
}

/* Styles pour les éléments interactifs */
.interactive-hover {
  transition: all 0.2s ease-out;
}

.interactive-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Gradient text utilities */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Loading states */
.loading {
  opacity: 0.7;
  pointer-events: none;
}

.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid #3498db;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
