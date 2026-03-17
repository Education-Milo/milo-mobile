# Milo - Application Mobile

> 📖 **Full documentation** — features, API routes, navigation, state management, validation logic and dependencies are all described in [DOCUMENTATION.md](./DOCUMENTATION.md).

### Structure des dossiers

```
src/
├── api/          # Configuration et services API
├── components/   # Composants réutilisables de l'application
├── constants/    # Constantes, thèmes et styles globaux
├── hook/         # Hooks React personnalisés
├── i18n/         # Internationalisation (FR / EN)
├── navigation/   # Configuration de la navigation
├── queries/      # Hooks React Query (cours, amis)
├── screens/      # Écrans principaux de l'application
├── store/        # État global Zustand (auth, user, exercise)
├── theme/        # Couleurs, typographie, espacements
├── utils/        # Fonctions utilitaires
└── validations/  # Schémas de validation Yup
```

### Description des Dossiers

- **api/** : Contient la configuration Axios, les intercepteurs d'authentification et la carte des routes API
- **components/** : Composants réutilisables comme les boutons, les cartes, la barre de navigation, etc.
- **constants/** : Définit les constantes globales partagées dans toute l'application
- **hook/** : Hooks personnalisés encapsulant de la logique réutilisable
- **i18n/** : Configuration i18next et fichiers de traduction (anglais et français)
- **navigation/** : Configuration de la navigation avec React Navigation (Stack + Tabs)
- **queries/** : Hooks et mutations TanStack React Query pour les données serveur
- **screens/** : Écrans principaux de l'application (Login, Register, Home, etc.)
- **store/** : Stores Zustand pour l'authentification, le profil utilisateur et les exercices
- **theme/** : Couleurs, typographie et valeurs de design system
- **utils/** : Fonctions utilitaires génériques
- **validations/** : Schémas Yup pour la validation des formulaires

## 🛠 Installation

1. Cloner le repository
2. Créer un fichier `.env` à la racine du projet :
```
API_URL=https://your-backend-url.com
```
3. Installer les dépendances :
```bash
npm install
```
4. Lancer l'application :
```bash
# Pour lancement global
npx expo start

# Pour iOS
npx expo start --ios

# Pour Android
npx expo start --android
```

## 📦 Dépendances Principales

- **React Native** : Framework principal pour le développement mobile
- **Expo** : Framework et outils de développement
- **React Navigation** : Gestion de la navigation (Stack + Bottom Tabs)
- **Zustand** : Gestion de l'état global (auth, profil, exercices)
- **TanStack React Query** : Mise en cache et synchronisation des données serveur
- **Axios** : Client HTTP avec intercepteurs pour l'authentification
- **Yup** : Validation des formulaires basée sur des schémas
- **i18next** : Internationalisation (français et anglais)
- **TypeScript** : Typage statique

## 🧪 Qualité du code

```bash
npm run lint          # ESLint
npm run lint:fix      # Correction automatique ESLint
npm run prettier      # Vérification du formatage
npm run prettier:fix  # Formatage automatique
npm run type-check    # Vérification TypeScript
npm run check-all     # Tout vérifier en une commande
```