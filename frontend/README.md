# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


# Frontend Structure — Leagues Mobile

## Project Tree

```
frontend/
├── app/                              # Expo Router — thin route files only
│   ├── _layout.tsx                   # Root: AuthProvider + Stack
│   ├── (auth)/                       # Auth route group
│   │   ├── _layout.tsx               # Headerless Stack with fade animation
│   │   ├── login.tsx                 # → LoginScreen
│   │   └── register.tsx              # Placeholder
│   └── (tabs)/                       # Main app (post-login)
│       ├── _layout.tsx               # Bottom tab navigator (dark theme)
│       └── index.tsx                 # Home screen placeholder
│
├── src/
│   ├── features/                     # Feature modules (domain logic + UI)
│   │   └── auth/
│   │       ├── api.ts                # login() API call
│   │       ├── context.tsx           # AuthProvider + useAuth hook
│   │       ├── types.ts              # AuthContextType
│   │       ├── index.ts              # Barrel export
│   │       └── components/
│   │           ├── LoginScreen.tsx    # Full login UI (matches design)
│   │           └── index.ts
│   │
│   └── shared/                       # Cross-feature reusables
│       ├── components/
│       │   ├── FloatingIcons.tsx      # Decorative background icons
│       │   └── index.ts
│       ├── constants/
│       │   ├── colors.ts             # Color palette tokens
│       │   ├── typography.ts         # Font size/weight tokens
│       │   ├── spacing.ts            # Spacing + border radius tokens
│       │   └── index.ts
│       └── utils/
│           └── apiClient.ts          # fetch wrapper with auth header
│
└── assets/images/                    # Static assets
```

## Key Design Decisions

| Decision | Rationale |
|---|---|
| **Route files are thin** | `app/(auth)/login.tsx` only imports `LoginScreen` — all logic lives in `src/features/auth/` |
| **Feature-based src** | Each feature (auth, etc.) owns its own API, context, types, and components |
| **Barrel exports** | Every folder has `index.ts` — import from `@/src/features/auth` not deep paths |
| **Design tokens** | Colors, spacing, typography in `shared/constants/` — single source of truth |
| **Auth-gated routing** | `app/index.tsx` checks `token` and redirects to `(auth)` or `(tabs)` accordingly |

## Login Screen

The login screen matches the provided design with:
- 🌑 Dark background (`#0B1120`) with warm amber overlay at top
- 🎓 Floating educational icons (graduation caps, briefcases, books, lightbulbs)
- 🌙 Decorative dark-mode toggle
- 📋 Card with Google sign-in row, email/password inputs, orange Login button
- 🔒 Forgot Password link + Sign Up option
