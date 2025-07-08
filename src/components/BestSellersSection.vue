<script setup lang="ts">
import Card from './Card.vue'

const bestSellers = [
  {
    image: '/prod-ours-rose.png',
    title: 'Ours Rose',
    description: 'Le préféré des enfants, tout doux et irrésistible.'
  },
  {
    image: '/prod-licorne-arcenciel.png',
    title: 'Licorne Arc-en-ciel',
    description: 'Une licorne magique pour des rêves colorés.'
  },
  {
    image: '/prod-renard.png',
    title: 'Renard Malin',
    description: 'Un compagnon rusé et attachant.'
  }
]
</script>

<template>
  <section class="py-16 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-gray-900 mb-10 text-center">Meilleures ventes</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card v-for="prod in bestSellers" :key="prod.title" v-bind="prod" />
      </div>
    </div>
  </section>
</template> 