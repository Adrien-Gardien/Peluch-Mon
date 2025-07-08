import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// Import des composants de page
import Home from "../pages/Home.vue";
import Catalog from "../pages/Catalog.vue";
import ProductDetail from "../pages/ProductDetail.vue";
import Favorites from "../pages/Favorites.vue";
import Cart from "../pages/Cart.vue";
import NotFound from "../pages/NotFound.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Accueil - PokéShop",
    },
  },
  {
    path: "/catalog",
    name: "Catalog",
    component: Catalog,
    meta: {
      title: "Catalogue - PokéShop",
    },
  },
  {
    path: "/pokemon/:id",
    name: "ProductDetail",
    component: ProductDetail,
    props: true,
    meta: {
      title: "Détail Pokémon - PokéShop",
    },
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites,
    meta: {
      title: "Mes Favoris - PokéShop",
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: {
      title: "Mon Panier - PokéShop",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "Page non trouvée - PokéShop",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Navigation guards pour la gestion des titres
router.beforeEach((to) => {
  // Mise à jour du titre de la page
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
});

export default router;
