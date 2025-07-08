<script setup lang="ts">
import Card from './Card.vue'

const categories = [
  {
    image: '/cat-ours.png',
    title: 'Ours',
    description: 'Des ours en peluche doux et câlins pour tous les âges.'
  },
  {
    image: '/cat-licorne.png',
    title: 'Licornes',
    description: 'Des peluches magiques et colorées pour rêver.'
  },
  {
    image: '/cat-animaux.png',
    title: 'Animaux',
    description: 'Une grande variété d’animaux adorables à collectionner.'
  }
]
</script>

<template>
  <section class="py-16 bg-white">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-gray-900 mb-10 text-center">Catégories populaires</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card v-for="cat in categories" :key="cat.title" v-bind="cat" />
      </div>
    </div>
  </section>
</template> 