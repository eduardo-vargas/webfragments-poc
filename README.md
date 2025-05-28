# WebFragments POC 🎨

A proof of concept for loading and rendering remote React components dynamically, with local development capabilities.

## 🏗 Architecture

This is a monorepo containing two main packages:

```
webfragments-poc/
├── packages/
│   ├── webfragments/        # 🧩 Core WebFragments library
│   │   ├── src/
│   │   │   ├── fragments/   # Individual web fragments
│   │   │   └── index.ts     # Core functionality & exports
│   │   └── package.json
│   │
│   └── main-app/           # 🎯 Demo React application
│       ├── src/
│       │   ├── components/  # App components
│       │   └── App.tsx     # Main application
│       └── package.json
│
└── package.json            # Root workspace configuration
```

### 📦 Packages

#### WebFragments Core (`@webfragments/core`)
- Core library for creating and managing web fragments
- Handles both local and remote component loading
- Provides TypeScript types and safety
- Includes example fragments (e.g., PartyButton 🎉)

#### Main App (`@webfragments/main-app`)
- Demo application showcasing web fragments usage
- Modern UI with collapsible sidebar navigation
- Real-world implementation examples
- Development environment for testing fragments

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start development:
   ```bash
   pnpm run start:fresh
   ```

## 🔄 Development Workflow

### Scripts

- `pnpm run dev` - Start the development server
- `pnpm run build` - Build all packages
- `pnpm run clean` - Clean build artifacts
- `pnpm run reset` - Clean and rebuild (daily development)
- `pnpm run start:fresh` - Reset and start development
- `pnpm run reset:full` - Complete rebuild (rarely needed)

### When to use `start:fresh` 🔄

Use `pnpm run start:fresh` when:
- Switching between branches
- **After modifying web fragments**
- If changes aren't reflecting
- When in doubt about build state

This ensures you're always running the latest version of your fragments.

