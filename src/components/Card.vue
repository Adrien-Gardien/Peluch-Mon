<template>
  <div class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col">
    <img :src="image" :alt="title" class="w-full h-48 object-cover" />
    <div class="p-5 flex-1 flex flex-col justify-between">
      <div>
        <h3 class="font-semibold text-lg text-gray-900 mb-2">{{ title }}</h3>
        <p v-if="description" class="text-gray-500 text-sm mb-4">{{ description }}</p>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string
  title: string
  description?: string
}>()
</script> 