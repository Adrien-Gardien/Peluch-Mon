<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <div class="text-6xl mb-4">🔍</div>
      <h1 class="text-4xl font-bold text-gray-900 mb-4">404 - Page non trouvée</h1>
      <p class="text-xl text-gray-600 mb-8">La page que vous cherchez n'existe pas ou a été déplacée.</p>
      <router-link 
        to="/"
        class="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        Retour à l'accueil
      </router-link>
    </div>
  </div>
</template> 