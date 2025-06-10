# Milo - Application Mobile

### Structure des dossiers

```
src/
├── api/          # Configuration et services API
├── components/   # Composants réutilisables de l'application
├── constants/    # Constantes, thèmes et styles globaux
├── navigation/   # Configuration de la navigation
├── screens/      # Écrans principaux de l'application
└── unity/        # Intégration avec Unity
```

### Description des Dossiers

- **api/** : Contient la configuration des appels API et les services de communication avec le backend
- **components/** : Composants réutilisables comme les boutons, les cartes, les en-têtes, etc.
- **constants/** : Définit les constantes globales, les couleurs, les thèmes et les styles partagés
- **navigation/** : Configuration de la navigation avec React Navigation
- **screens/** : Écrans principaux de l'application (Login, Register, Home, etc.)
- **unity/** : Intégration et configuration de Unity pour les fonctionnalités 3D

## 🛠 Installation

1. Cloner le repository
2. Installer les dépendances :
```bash
npm install
```
3. Lancer l'application :
```bash
# Pour lancement globale
npx expo start

# Pour IOS
npx expo start --ios

# Pour Android
npx expo start --android
```

## 📦 Dépendances Principales

- **React Native** : Framework principal pour le développement mobile
- **Expo** : Framework et outils de développement
- **React Navigation** : Gestion de la navigation
- **Zustand** : Gestion de l'état global
- **React Native Camera** : Gestion de la caméra
- **Axios** : Client HTTP
- **TypeScript** : Typage statique