# Milo Mobile – Application Documentation

## Table of Contents

1. [Overview](#1-overview)
2. [Flow of the Features](#2-flow-of-the-features)
3. [Dependencies](#3-dependencies)
4. [API Routes](#4-api-routes)
5. [Validation Logic](#5-validation-logic)
6. [Navigation Flow](#6-navigation-flow)
7. [State Management Stack](#7-state-management-stack)

---

## 1. Overview

**Milo** is a React Native educational mobile application built with Expo. It targets French middle-school students (classes 6ème–3ème, ages ~11–15) and provides:

- Structured lesson content (subjects → courses → chapters → lessons)
- AI-generated QCM (multiple-choice quizzes) per lesson
- An AI-powered lesson chat assistant
- A gamification system (XP, points, levels, streaks)
- Daily missions and achievements
- Social features (friend requests, friend management)
- Document scanning (camera + file import)
- Multi-language support (French & English)

**Technology Stack**

| Layer | Technology |
|---|---|
| Framework | React Native 0.79.6 + Expo 53 |
| Language | TypeScript |
| Navigation | React Navigation v7 (Native Stack + Bottom Tabs) |
| Client State | Zustand v5 |
| Server State | TanStack React Query v5 |
| HTTP Client | Axios |
| Form Validation | Yup |
| Persistence | AsyncStorage |
| Internationalisation | i18next / react-i18next |
| Build | EAS (Expo Application Services) |

---

## 2. Flow of the Features

### 2.1 Authentication Flow

```
App Launch
  └─ RootNavigator reads accessToken from AsyncStorage (persisted by Zustand)
       ├─ No token  → UnAuth screens (Login / Register / Forgot Password)
       └─ Token present → Auth screens (Home Tabs + stack screens)

Login
  1. User enters email + password (validated by Yup).
  2. Auth store calls POST /token (OAuth2 password grant).
  3. Access token stored in Zustand (persisted to AsyncStorage).
  4. User profile fetched from GET /users/me and stored in User store.
  5. RootNavigator detects token → switches to Auth navigator.

Register
  1. User fills first name, last name, email, password, confirm password, role, class.
  2. All fields validated by Yup (see §5).
  3. Auth store calls POST /register.
  4. Token received and stored; profile fetched automatically.

Forgot Password
  1. User enters email (validated).
  2. Auth store calls POST /forgotPassword.
  3. Success notification shown; user returns to Login.

Logout
  1. Auth store clears the access token.
  2. User store clears all cached user data.
  3. RootNavigator switches back to UnAuth navigator.

Token Expiration
  - Every outgoing request checks if the JWT is within 5 minutes of expiring.
  - If expired the store calls logout() and throws TOKEN_EXPIRED.
  - A 401 response on any protected route also triggers automatic logout.
```

### 2.2 Home & Dashboard

```
HomeScreen
  ├─ Displays user greeting (first name) and avatar initials.
  ├─ Shows gamification stats: points, XP, level, streak.
  ├─ Quick-access tiles / cards to Lessons, Missions, Friends, Scan.
  └─ Navigates to any section via bottom navigation bar.
```

### 2.3 Lessons Feature

```
LessonScreen (tab)
  └─ useSubjects() → GET /get_subjects
       └─ User selects a Subject
            └─ useCourses(subjectId) → GET /get_courses?subject_id=…
                 └─ User selects a Course
                      └─ LessonChapterScreen
                           └─ useChapters(courseId) → GET /get_chapters?course_id=…
                                └─ User selects a Chapter
                                     └─ useLessons(chapterId) → GET /get_lessons?chapter_id=…
                                          └─ User selects a Lesson → opens lesson detail

Lesson Detail
  ├─ Read lesson content.
  ├─ "Chat with AI" button → ChatScreen (POST /chat_lesson with lesson context).
  └─ "Start QCM" button   → ExercicesScreen (AI-generated QCM).
```

### 2.4 QCM (Quiz) Feature

```
ExercicesScreen / QCMScreen
  1. Calls exercise store generate_qcm_lesson(lessonId)
       → POST /qcm_lesson?lesson_id=…
  2. Questions array rendered one by one.
  3. User selects an answer → immediate feedback (correct / wrong).
  4. On completion → QCMResultsScreen:
       ├─ Score displayed.
       ├─ XP and points awarded (addXp / addPoints on User store).
       └─ Option to retry or return to lesson.
```

### 2.5 AI Chat Feature

```
ChatScreen
  1. Receives lesson context via navigation params.
  2. User types a question.
  3. POST /chat_lesson { lesson_id, message } → AI response streamed/returned.
  4. Messages rendered in a chat bubble list.
```

### 2.6 Friends Feature

```
FriendsScreen
  1. useFriends() → GET /friends (polled every 10 s).
  2. Tabs: All friends | Pending requests.
  3. Actions:
       ├─ Send request  → POST /friends/{friendId}
       ├─ Accept request → PATCH /friends/{friendId}/accept
       ├─ Block          → PATCH /friends/{friendId}/block
       └─ Remove         → DELETE /friends/{friendId}
  4. Cache invalidated after each mutation via React Query.
```

### 2.7 Profile & Settings

```
ProfileScreen
  ├─ Shows avatar initials, full name, class, role.
  ├─ Gamification stats (points, XP, level, streak, badges).
  ├─ Interests list with add / delete.
  └─ Links to EditProfileScreen and SettingsScreen.

EditProfileScreen
  1. User edits first name, last name, class.
  2. PUT /users/{userId} called via User store updateUser().

SettingsScreen
  ├─ Language selection (FR / EN).
  └─ Logout button.
```

### 2.8 Document Scanning Feature

```
SelectDocumentScreen (tab)
  └─ Presents two options:
       ├─ "Use Camera"  → CameraOrImportScreen (expo-image-picker, camera mode)
       └─ "Import File" → CameraOrImportScreen (expo-document-picker / image library)

CameraOrImportScreen
  1. Captures or selects an image / document.
  2. Preview displayed to user.
  3. File saved to device using expo-file-system.
```

### 2.9 Missions Feature

```
MissionScreen
  ├─ Lists daily / weekly missions.
  ├─ Shows completion status and rewards.
  └─ Completing a mission awards XP / points via User store.
```

---

## 3. Dependencies

### 3.1 Production Dependencies

#### Navigation & UI

| Package | Version | Purpose |
|---|---|---|
| `@react-navigation/native` | ^7.1.9 | Core navigation container |
| `@react-navigation/native-stack` | ^7.3.13 | Native stack navigator |
| `expo-router` | ~5.1.7 | File-based routing layer |
| `@gorhom/bottom-sheet` | ^4.6.4 | Bottom sheet modals |
| `react-native-gesture-handler` | ~2.24.0 | Gesture recognition |
| `react-native-reanimated` | ~3.17.4 | Smooth animations |
| `react-native-screens` | ~4.11.1 | Native screen containers |
| `react-native-safe-area-context` | 5.4.0 | Safe area insets |
| `expo-blur` | ^14.1.5 | Blur view component |
| `expo-linear-gradient` | ^14.1.5 | Gradient backgrounds |
| `expo-navigation-bar` | ~4.2.8 | Android navigation bar styling |
| `@react-native-picker/picker` | ^2.11.1 | Dropdown/picker component |
| `react-native-keyboard-aware-scroll-view` | ^0.9.5 | Keyboard-avoiding scroll |
| `react-native-flash-message` | ^0.4.2 | Toast / flash notifications |

#### State Management & Data Fetching

| Package | Version | Purpose |
|---|---|---|
| `zustand` | ^5.0.5 | Global client-side state management |
| `@tanstack/react-query` | ^5.90.21 | Server state caching & synchronisation |

#### HTTP & Networking

| Package | Version | Purpose |
|---|---|---|
| `axios` | ^1.9.0 | HTTP client with interceptor support |
| `qs` | ^6.14.0 | Query-string serialisation (OAuth2 form data) |

#### Storage

| Package | Version | Purpose |
|---|---|---|
| `@react-native-async-storage/async-storage` | 2.1.2 | Persistent key-value storage |

#### Form Validation

| Package | Version | Purpose |
|---|---|---|
| `yup` | ^1.7.1 | Schema-based form validation |

#### Internationalisation

| Package | Version | Purpose |
|---|---|---|
| `i18next` | ^25.6.1 | i18n framework |
| `react-i18next` | ^16.2.4 | React bindings for i18next |
| `expo-localization` | ^16.1.6 | Device locale detection |
| `react-native-localize` | ^3.6.0 | Additional locale helpers |

#### Native / Expo Features

| Package | Version | Purpose |
|---|---|---|
| `expo` | ~53.0.23 | Expo SDK |
| `expo-image-picker` | ~16.1.4 | Camera & photo library access |
| `expo-document-picker` | ~13.1.6 | File system document picker |
| `expo-file-system` | ~18.1.11 | Read/write device file system |
| `expo-haptics` | ~14.1.4 | Haptic feedback (vibration) |
| `expo-splash-screen` | ^0.30.10 | Splash screen management |
| `expo-status-bar` | ~2.2.3 | Status bar control |

#### Utilities

| Package | Version | Purpose |
|---|---|---|
| `jwt-decode` | ^4.0.0 | Decode JWT for expiry checking |
| `react-native-svg-transformer` | ^1.5.2 | Import SVG files as components |
| `react-native-dotenv` | ^3.4.11 | Load `.env` variables in React Native |

### 3.2 Development Dependencies

| Package | Version | Purpose |
|---|---|---|
| `typescript` | ~5.8.3 | Static type checking |
| `eslint` | ^9.28.0 | Code linting |
| `prettier` | ^3.5.3 | Code formatting |
| `@babel/core` | ^7.25.2 | JS transpilation |
| `babel-plugin-module-resolver` | ^5.0.2 | Path aliases (e.g. `@store/`) |
| `@types/react` | ~19.0.10 | React type definitions |
| `@types/qs` | ^6.14.0 | `qs` type definitions |

### 3.3 Environment Variables

Create a `.env` file in the project root:

```
API_URL=https://your-backend-url.com
```

The variable is imported inside source files via:

```typescript
import { API_URL } from '@env';
```

---

## 4. API Routes

All requests go through the Axios instance configured in `src/api/axios.api.ts`.  
**Base URL**: set by the `API_URL` environment variable.

### 4.1 Request Interceptor

Before each request the interceptor:
1. Checks whether the target URL is a **public route** (no auth required).
2. For protected routes, calls `ensureTokenValid()` — if the JWT is expired or within a 5-minute buffer it calls `logout()` and rejects the request.
3. Attaches the `Authorization: Bearer <token>` header if a token is present.

**Public routes** (no token required):

```
/register
/token
/forgotPassword
/auth/request-confirm-email
```

### 4.2 Response Interceptor

- Logs the method + URL of any failed request.
- On **401 Unauthorized** for a protected route: automatically calls `logout()` and redirects to login.

### 4.3 Endpoint Reference

#### Authentication

| Route Constant | Method | Endpoint | Description | Body / Params |
|---|---|---|---|---|
| `POST_Register` | POST | `/register` | Create a new account | `{ email, password, first_name, last_name, role, class_ }` |
| `POST_Login` | POST | `/token` | OAuth2 password-grant login | `application/x-www-form-urlencoded`: `grant_type=password&username=…&password=…` |
| `POST_ForgotPassword` | POST | `/forgotPassword` | Request a password-reset email | `{ email }` |
| `POST_RequestConfirmEmail` | POST | `/auth/request-confirm-email` | Re-send email confirmation | `{ email }` |

#### User / Profile

| Route Constant | Method | Endpoint | Description | Body / Params |
|---|---|---|---|---|
| `GET_Me` | GET | `/users/me` | Get the current user's profile | — |
| `PUT_Update_user(userId)` | PUT | `/users/{userId}` | Update user fields | `{ first_name?, last_name?, class_? }` |
| `POST_Add_User_Interest(userId)` | POST | `/users/{userId}/interests/` | Add an interest tag | `{ name }` |
| `DELETE_User_Interest(userId, interestId)` | DELETE | `/users/{userId}/interests/{interestId}` | Remove an interest tag | — |

#### Friends

| Route Constant | Method | Endpoint | Description | Body / Params |
|---|---|---|---|---|
| `GET_Friends` | GET | `/friends` | List friends | Query: `status=pending\|accepted` (optional) |
| `POST_SEND_FRIEND_REQUEST(friendId)` | POST | `/friends/{friendId}` | Send a friend request | — |
| `PATCH_ACCEPT_FRIEND_REQUEST(friendId)` | PATCH | `/friends/{friendId}/accept` | Accept a friend request | — |
| `PATCH_BLOCK_FRIEND(friendId)` | PATCH | `/friends/{friendId}/block` | Block a user | — |
| `DELETE_FRIEND(friendId)` | DELETE | `/friends/{friendId}` | Remove a friend | — |

#### Courses & Content

| Route Constant | Method | Endpoint | Description | Body / Params |
|---|---|---|---|---|
| `GET_Subjects` | GET | `/get_subjects` | List all subjects | — |
| `GET_Courses` | GET | `/get_courses` | List courses for a subject | Query: `subject_id` |
| `GET_Chapters` | GET | `/get_chapters` | List chapters for a course | Query: `course_id` |
| `GET_Lessons` | GET | `/get_lessons` | List lessons for a chapter | Query: `chapter_id` |

#### AI Features

| Route Constant | Method | Endpoint | Description | Body / Params |
|---|---|---|---|---|
| `POST_Chat_Lesson` | POST | `/chat_lesson` | Send a message to the AI lesson assistant | `{ lesson_id, message }` |
| `POST_QCM_Lesson` | POST | `/qcm_lesson` | Generate a QCM quiz for a lesson | Query: `lesson_id` |
| `POST_CREATE_QCM` | POST | `/qcm` | Create a custom QCM question | `{ … }` |

---

## 5. Validation Logic

All form validation is implemented using **Yup** schemas located in `src/validations/`. Error messages are internationalised via **i18next** and support both English and French.

### 5.1 Login (`login.validation.yup.ts`)

| Field | Rules |
|---|---|
| `email` | Required · Must be a valid email address · Trimmed |
| `password` | Required · Trimmed |

### 5.2 Register (`register.validation.yup.ts`)

| Field | Rules |
|---|---|
| `first_name` | Required · Trimmed |
| `last_name` | Required · Trimmed |
| `email` | Required · Must be a valid email address · Trimmed |
| `password` | Required · Trimmed · Min 8 characters · Must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (`!@#$%^&*()_+-=[]{};\|,.?`) |
| `confirmPassword` | Required · Trimmed · Must match `password` |
| `role` | Required · One of: `Enfant`, `Parent`, `Professeur` |
| `classe` | Required · One of: `6eme`, `5eme`, `4eme`, `3eme` |

**Password complexity regex** (copied verbatim from `register.validation.yup.ts`):

```
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/
```

The regex requires at least one lowercase letter, one uppercase letter, one digit, and one special character from the set `!@#$%^&*()_+-=[]{};\|,.?/`.

### 5.3 Forgot Password (`forgot-password.yup.ts`)

| Field | Rules |
|---|---|
| `email` | Required · Must be a valid email address · Trimmed |

### 5.4 Validation Error Message Keys (i18n)

| Key | English message |
|---|---|
| `validation.email.required` | Email is required |
| `validation.email.invalid` | Must be a valid email address |
| `validation.password.required` | Password is required |
| `validation.password.complexity` | Must include uppercase, lowercase, digit, and special character |
| `validation.password.minLength` | Must be at least 8 characters |
| `validation.confirmPassword.required` | Please confirm your password |
| `validation.confirmPassword.match` | Passwords do not match |
| `validation.prenom.required` | First name is required |
| `validation.nom.required` | Last name is required |
| `validation.role.required` | Role is required |
| `validation.role.invalid` | Role must be Enfant, Parent, or Professeur |
| `validation.classe.required` | Class is required |
| `validation.classe.invalid` | Class must be 6eme, 5eme, 4eme, or 3eme |

---

## 6. Navigation Flow

The navigation is built with **React Navigation v7** using a combination of a Native Stack navigator and a Bottom Tab navigator.

### 6.1 Navigator Hierarchy

```
App.tsx
└─ RootNavigator  (NavigationContainer)
     ├─ [No token]  UnAuthNavigator  (NativeStack)
     │    ├─ LoginScreen             ← initial screen
     │    ├─ ForgotPasswordScreen
     │    └─ RegisterScreen
     │
     └─ [Token present]  AuthNavigator  (NativeStack)
          ├─ HomeTabsNavigator  (BottomTab) ← initial screen
          │    ├─ Home          → HomeScreen
          │    ├─ Lessons       → LessonScreen
          │    ├─ Scan          → SelectDocumentScreen
          │    ├─ Game          → GameScreen
          │    ├─ Profile       → ProfileScreen
          │    ├─ Friends       → FriendsScreen
          │    ├─ MissionScreen → MissionScreen
          │    └─ More          → (placeholder View)
          │
          ├─ Profile            → ProfileScreen
          ├─ Game               → ExercicesScreen
          ├─ Lesson             → LessonScreen
          ├─ Scan               → SelectDocumentScreen
          ├─ CameraOrImport     → CameraOrImportScreen
          ├─ LessonChapter      → LessonChapterScreen
          ├─ ExercicesScreen    → ExercicesScreen
          ├─ MissionScreen      → MissionsScreen
          ├─ ChatScreen         → ChatScreen
          ├─ FriendsScreen      → FriendsScreen
          ├─ EditProfileScreen  → EditProfileScreen
          └─ Settings           → SettingsScreen  (slide_from_right animation)
```

### 6.2 Screen Navigation Map

| From | Action | To |
|---|---|---|
| LoginScreen | Successful login | HomeTabsNavigator |
| LoginScreen | "Forgot password" tap | ForgotPasswordScreen |
| LoginScreen | "Register" tap | RegisterScreen |
| RegisterScreen | Successful register | HomeTabsNavigator |
| ForgotPasswordScreen | Submit email | LoginScreen |
| HomeScreen | Lesson tile | LessonScreen (tab) |
| HomeScreen | Mission tile | MissionScreen (tab) |
| HomeScreen | Friends tile | FriendsScreen (tab) |
| HomeScreen | Scan tile | SelectDocumentScreen (tab) |
| LessonScreen | Select subject | LessonChapterScreen |
| LessonChapterScreen | Select lesson | ExercicesScreen / ChatScreen |
| ExercicesScreen | Finish quiz | QCMResultsScreen |
| ProfileScreen | Edit profile | EditProfileScreen |
| ProfileScreen | Settings | SettingsScreen |
| SelectDocumentScreen | Camera / Import | CameraOrImportScreen |
| Any screen | Logout | LoginScreen (via token clear) |

### 6.3 Navigation Guards

- `RootNavigator` reads `accessToken` from the Auth store; it re-renders automatically when the token changes, switching the entire stack between authenticated and unauthenticated contexts without explicit redirects.
- A 401 response or expired JWT automatically calls `logout()`, which clears the token and triggers the guard.

---

## 7. State Management Stack

The application combines two state management strategies:

- **Zustand** — persistent, synchronous client state (auth session, user profile, exercises).
- **TanStack React Query** — server-state caching with automatic background refetching (courses, friends).

### 7.1 Zustand Stores (`src/store/`)

#### Auth Store (`auth/auth.store.ts`)

Persisted to **AsyncStorage** under the key `auth-storage` (only `accessToken` is persisted).

| State / Action | Type | Description |
|---|---|---|
| `accessToken` | `string` | JWT bearer token (empty string when logged out) |
| `loading` | `boolean` | Async operation in progress |
| `login(email, password)` | `async fn` | POST /token → stores token → fetches profile |
| `register(email, password, last_name, first_name, role, classe)` | `async fn` | POST /register → stores token → fetches profile |
| `logout()` | `async fn` | Clears token + user store data |
| `forgotPassword(email)` | `async fn` | POST /forgotPassword |
| `isTokenExpired()` | `fn → boolean` | Decodes JWT; returns `true` if < 5 min remaining |
| `ensureTokenValid()` | `async fn` | Calls logout + throws if token expired |

#### User Store (`user/user.store.ts`)

Not persisted (re-fetched on app launch). Has a **5-minute in-memory cache** for `getMe`.

| State / Action | Type | Description |
|---|---|---|
| `user` | `User \| null` | Current user object |
| `userStats` | `UserStats \| null` | (Reserved for future stats endpoint) |
| `loading` | `boolean` | Async operation in progress |
| `lastUserFetch` | `number` | Timestamp of last `getMe` call |
| `getMe(forceRefresh?)` | `async fn` | GET /users/me (cached 5 min unless forced) |
| `updateUser(userData)` | `async fn` | PUT /users/{id} → updates local state |
| `addUserInterest(name)` | `async fn` | POST /users/{id}/interests/ (optimistic update) |
| `deleteUserInterest(id)` | `async fn` | `DELETE /users/{id}/interests/{interestId}` |
| `addPoints(amount)` | `fn` | Offline increment of `user.points` |
| `addXp(amount)` | `fn` | Offline increment of `user.xp` |
| `getFullName()` | `fn → string` | Returns `"${first_name} ${last_name}"` |
| `getInitials()` | `fn → string` | Returns two-letter initials |
| `clearUserData()` | `fn` | Resets all user state (called on logout) |

#### Exercise Store (`exercise/exercise.store.ts`)

| State / Action | Type | Description |
|---|---|---|
| `QCM` | `QcmQuestion[]` | Array of generated questions |
| `loading` | `boolean` | Async operation in progress |
| `error` | `string \| null` | Error message from last request |
| `generate_qcm_lesson(lessonId)` | `async fn → QcmQuestion[]` | POST /qcm_lesson?lesson_id=… |

### 7.2 TanStack React Query (`src/queries/`)

React Query is used for data that benefits from automatic background polling and cache invalidation.

#### Course Queries (`course.queries.ts`)

| Hook | Query Key | Endpoint | Enabled |
|---|---|---|---|
| `useSubjects()` | `['subjects']` | GET /get_subjects | Always |
| `useCourses(subjectId)` | `['courses', subjectId]` | GET /get_courses?subject_id=… | When `subjectId` is set |
| `useChapters(courseId)` | `['chapters', courseId]` | GET /get_chapters?course_id=… | When `courseId` is set |
| `useLessons(chapterId)` | `['lessons', chapterId]` | GET /get_lessons?chapter_id=… | When `chapterId` is set |

#### Friend Queries (`friend.queries.ts`)

| Hook / Mutation | Query Key | Endpoint | Notes |
|---|---|---|---|
| `useFriends(status?)` | `['friends', status]` | GET /friends | **Polls every 10 seconds** |
| `useDeleteFriend()` | — | DELETE /friends/{id} | Invalidates `['friends']` on success |
| `useSendFriendRequest()` | — | POST /friends/{id} | Invalidates `['friends']` on success |
| `useAcceptFriendRequest()` | — | PATCH /friends/{id}/accept | Invalidates `['friends']` on success |
| `useBlockFriend()` | — | PATCH /friends/{id}/block | Invalidates `['friends']` on success |

### 7.3 State Flow Diagram

```
User action
  │
  ├─ Read-only server data (subjects, courses, chapters, lessons, friends)
  │    └─ React Query hook
  │         ├─ Cache hit → return cached data immediately
  │         └─ Cache miss / stale → fetch from API → update cache → re-render
  │
  ├─ Mutations (send friend request, accept, block, delete)
  │    └─ React Query useMutation
  │         └─ On success → invalidateQueries → refetch affected lists
  │
  ├─ Auth actions (login, logout, register)
  │    └─ Zustand Auth store
  │         └─ Persisted to AsyncStorage (token only)
  │
  ├─ User profile / interests
  │    └─ Zustand User store
  │         ├─ In-memory cache (5-min TTL)
  │         └─ Optimistic updates for interests
  │
  └─ Exercise / QCM generation
       └─ Zustand Exercise store
            └─ Transient (not persisted)
```

---

## Appendix – Project Structure

```
milo-mobile/
├── assets/                    # Images, fonts, icons
├── src/
│   ├── api/
│   │   ├── axios.api.ts       # Axios instance, interceptors, APIRoutes map
│   │   └── fake-data-api.ts   # Static mock data for development
│   ├── components/            # Reusable UI components (BottomNavBar, cards, etc.)
│   ├── constants/             # Global app constants
│   ├── hook/                  # Custom React hooks
│   ├── i18n/                  # i18next setup and translation files (EN / FR)
│   ├── navigation/
│   │   ├── Root/              # RootNavigator – auth guard switch
│   │   ├── Auth/              # AuthNavigator + HomeTabsNavigator
│   │   └── UnAuth/            # UnAuthNavigator
│   ├── queries/
│   │   ├── course.queries.ts  # React Query hooks for course content
│   │   └── friend.queries.ts  # React Query hooks/mutations for friends
│   ├── screens/               # Full-page screen components
│   ├── store/
│   │   ├── auth/              # Auth store (Zustand + AsyncStorage)
│   │   ├── course/            # Course data models
│   │   ├── exercise/          # Exercise / QCM store
│   │   ├── friend/            # Friend data models
│   │   └── user/              # User store (Zustand, in-memory cache)
│   ├── theme/                 # Colors, typography, spacing
│   ├── utils/                 # Helper utilities
│   └── validations/           # Yup validation schemas
├── App.tsx                    # App entry: QueryClient + NavigationContainer
├── app.json                   # Expo app configuration
├── eas.json                   # EAS build configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── babel.config.js            # Babel + module resolver aliases
└── metro.config.js            # Metro bundler (SVG support)
```

---

## Appendix – Development Commands

```bash
# Install dependencies
npm install

# Start Expo development server
npx expo start

# Platform-specific
npm run ios       # iOS simulator
npm run android   # Android emulator
npm run web       # Browser

# Code quality
npm run lint          # Run ESLint
npm run lint:fix      # Auto-fix ESLint issues
npm run prettier      # Check formatting
npm run prettier:fix  # Auto-format with Prettier
npm run type-check    # TypeScript type checking
npm run check-all     # Run type-check + lint + prettier together
```
