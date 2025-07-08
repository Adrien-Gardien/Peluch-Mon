<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Mon Panier</h1>
      
      <div v-if="!cartComputed.isEmpty.value" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-4">
          <div v-for="item in store.cart.items" :key="`${item.pokemon.id}-${item.selectedVariant}`" 
               class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center space-x-6">
              <img :src="item.pokemon.image" :alt="item.pokemon.name" class="w-20 h-20 object-contain">
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-900">{{ item.pokemon.name }}</h3>
                <p class="text-gray-600">{{ item.pokemon.category }}</p>
                <p class="text-2xl font-bold text-gray-900">{{ item.pokemon.price.toFixed(2) }}€</p>
              </div>
              <div class="flex items-center space-x-4">
                <div class="flex items-center border border-gray-300 rounded-lg">
                  <button @click="cartActions.updateQuantity(item.pokemon.id, item.quantity - 1, item.selectedVariant)" 
                          class="px-3 py-2 text-gray-600 hover:text-gray-800">-</button>
                  <span class="px-4 py-2 border-x border-gray-300">{{ item.quantity }}</span>
                  <button @click="cartActions.updateQuantity(item.pokemon.id, item.quantity + 1, item.selectedVariant)" 
                          class="px-3 py-2 text-gray-600 hover:text-gray-800">+</button>
                </div>
                <button @click="cartActions.removeFromCart(item.pokemon.id, item.selectedVariant)" 
                        class="text-red-500 hover:text-red-700">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6 h-fit">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Résumé de la commande</h3>
          <div class="space-y-3 mb-6">
            <div class="flex justify-between">
              <span>Sous-total ({{ cartComputed.totalItems.value }} articles)</span>
              <span>{{ cartComputed.formattedTotal.value }}</span>
            </div>
            <div class="flex justify-between">
              <span>Livraison</span>
              <span class="text-green-600">Gratuite</span>
            </div>
            <div class="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{{ cartComputed.formattedTotal.value }}</span>
            </div>
          </div>
          <button class="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200">
            Procéder au paiement
          </button>
        </div>
      </div>
      
      <div v-else class="text-center py-12">
        <div class="text-6xl mb-4">🛒</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Votre panier est vide</h3>
        <p class="text-gray-600 mb-6">Ajoutez des Pokémon à votre panier pour commencer vos achats</p>
        <router-link to="/catalog" class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
          Commencer mes achats
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { store, cartActions, cartComputed } from '../store';
</script> 