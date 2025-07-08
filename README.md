# 🎮 PokéShop - Boutique E-commerce Pokémon

Bienvenue dans **PokéShop**, la boutique e-commerce moderne dédiée aux dresseurs de Pokémon ! Cette application Vue.js 3 offre une expérience d'achat exceptionnelle avec un design moderne et des fonctionnalités complètes.

## ✨ Fonctionnalités

### 🏠 Page d'Accueil

- Hero section avec design gradient attractif
- Sections pour les offres spéciales, meilleures ventes et catégories
- Newsletter intégrée
- Statistiques dynamiques

### 📱 Design Moderne

- Interface responsive avec Tailwind CSS 4
- Animations fluides et transitions élégantes
- Design moderne avec gradients et ombres
- Icônes SVG personnalisées

### 🛍️ Fonctionnalités E-commerce

- **Catalogue complet** avec 8 Pokémon détaillés
- **Système de filtrage avancé** (catégorie, rareté, prix, disponibilité)
- **Recherche intelligente** avec suggestions en temps réel
- **Panier d'achat** avec gestion des quantités
- **Système de favoris** persistant
- **Pages produit détaillées** avec galerie d'images

### 🎯 Gestion d'État

- Store réactif avec Vue 3 Composition API
- Sauvegarde automatique dans localStorage
- Actions pour panier, favoris et filtres
- Computed properties optimisées

### 🚀 Technologies Utilisées

- **Vue 3** avec Composition API et `<script setup>`
- **TypeScript** pour la sécurité des types
- **Tailwind CSS 4** pour le styling moderne
- **Vue Router 4** pour la navigation
- **Vite** pour le build ultra-rapide

## 🗂️ Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Header.vue      # Navigation principale
│   ├── ProductCard.vue # Carte produit
│   └── FilterPanel.vue # Panneau de filtres
├── pages/              # Pages de l'application
│   ├── Home.vue        # Page d'accueil
│   ├── Catalog.vue     # Catalogue des produits
│   ├── ProductDetail.vue # Détail d'un produit
│   ├── Favorites.vue   # Page des favoris
│   ├── Cart.vue        # Panier d'achat
│   └── NotFound.vue    # Page 404
├── data/
│   └── pokemon.ts      # Données des Pokémon
├── store/
│   └── index.ts        # Gestion d'état globale
├── types/
│   └── index.ts        # Types TypeScript
└── router/
    └── index.ts        # Configuration du routeur
```

## 🎨 Données des Pokémon

Le catalogue inclut 8 Pokémon détaillés avec :

- **Informations complètes** : nom, prix, description, statistiques
- **Images haute qualité** depuis l'API Pokémon officielle
- **Système de rareté** : Common, Rare, Epic, Legendary, Mythical
- **Types variés** : Fire, Water, Electric, Psychic, etc.
- **Avis clients** et notes
- **Gestion des stocks** et promotions

## 🚀 Installation et Lancement

Le projet est déjà configuré et prêt à être utilisé !

```bash
# Installation des dépendances (déjà fait)
npm install

# Lancement du serveur de développement (en cours)
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

## 🌟 Fonctionnalités Techniques

### Performance

- **Lazy loading** des images
- **Pagination** intelligente
- **Debounced search** pour les performances
- **Optimisation des re-renders** avec computed properties

### UX/UI

- **Responsive design** pour tous les écrans
- **Loading states** et animations fluides
- **Error handling** avec images de fallback
- **Accessibilité** avec navigation clavier

### Persistance

- **localStorage** pour panier et favoris
- **Auto-sauvegarde** lors des changements
- **Récupération automatique** au rechargement

## 📱 Pages Disponibles

1. **Accueil** (`/`) - Page d'accueil avec hero et sections
2. **Catalogue** (`/catalog`) - Liste complète avec filtres
3. **Détail Produit** (`/pokemon/:id`) - Page produit détaillée
4. **Favoris** (`/favorites`) - Pokémon sauvegardés
5. **Panier** (`/cart`) - Gestion des achats

## 🎯 Prochaines Améliorations

- [ ] Système d'authentification utilisateur
- [ ] Processus de commande complet
- [ ] Intégration système de paiement
- [ ] Avis clients interactifs
- [ ] Notifications toast
- [ ] Mode sombre
- [ ] PWA (Progressive Web App)

## 👨‍💻 Développement

Le site utilise les meilleures pratiques modernes :

- **Composition API** pour une logique claire
- **TypeScript** pour la robustesse
- **Modules ES6** pour l'organisation
- **CSS Grid & Flexbox** pour les layouts
- **Mobile-first** responsive design

---

🎮 **Attrapez-les tous !** Explorez PokéShop et découvrez votre compagnon Pokémon idéal !
