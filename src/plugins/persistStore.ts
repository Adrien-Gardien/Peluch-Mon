import { watch } from 'vue'
import type { App } from 'vue'
import { useMainStore } from '../store'

export default {
  install(app: App) {
    const store = useMainStore()
    
    const loadFromStorage = () => {
      try {
        const savedData = localStorage.getItem('peluchemon-store')
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          
          if (parsedData.cart) {
            store.cart = parsedData.cart
          }
          if (parsedData.favorites) {
            store.favorites = parsedData.favorites
          }
          if (parsedData.user) {
            store.user = parsedData.user
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données depuis localStorage:', error)
      }
    }
    
    const saveToStorage = () => {
      watch(
        () => ({
          cart: store.cart,
          favorites: store.favorites,
          user: store.user,
        }),
        (newData) => {
          try {
            localStorage.setItem('peluchemon-store', JSON.stringify(newData))
          } catch (error) {
            console.error('Erreur lors de la sauvegarde dans localStorage:', error)
          }
        },
        { deep: true }
      )
    }
    
    loadFromStorage()
    saveToStorage()
  },
}
