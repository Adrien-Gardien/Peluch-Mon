<script setup lang="ts">
import { computed } from 'vue';
import { useMainStore } from '../store';
import Card from './Card.vue';

const store = useMainStore();
const bestSellers = computed(() => store.pokemons.filter(p => p.rating >= 4.7).map(p => ({
  id: p.id,
  image: p.image,
  title: p.name,
  description: p.description
})));
</script>

<template>
  <section class="py-16 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-gray-900 mb-10 text-center">Meilleures ventes</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card v-for="prod in bestSellers" :key="prod.id" :image="prod.image" :title="prod.title" :description="prod.description" />
      </div>
    </div>
  </section>
</template> 