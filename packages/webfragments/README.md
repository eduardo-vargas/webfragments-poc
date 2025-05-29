# 🧩 WebFragments Core

A modern approach to building composable web applications using React components as web fragments! This package provides the core functionality for creating, registering, and using web fragments in your applications.

## 🌟 Features

- 🔌 Custom Elements-based web fragments
- ⚛️ React components as fragments
- 🎨 Standalone development environment for each fragment
- 🔄 Hot Module Replacement (HMR) support
- 📦 TypeScript support out of the box
- 🎯 Easy integration with any web application
- 🪝 React hooks for dynamic fragment loading

## 🚀 Getting Started

### Installation

```bash
# Using pnpm (recommended)
pnpm add @webfragments/core

# Using npm
npm install @webfragments/core

# Using yarn
yarn add @webfragments/core
```

### 📚 Basic Usage

1. Initialize WebFragments in your application:
```typescript
import { initializeWebFragments } from '@webfragments/core/elements';

// Initialize before your app renders
initializeWebFragments();
```

2. Register your fragments:
```typescript
import { registerFragment } from '@webfragments/core/elements';
import MyFragment from './MyFragment';

registerFragment('my-fragment', MyFragment);
```

3. Use fragments in your HTML:
```html
<web-fragment fragment-id="my-fragment"></web-fragment>
```

4. Load fragments dynamically using hooks:
```typescript
import { useWebFragment } from '@webfragments/core';

function MyComponent() {
  const { fragment, loading, error } = useWebFragment('my-fragment', {
    url: 'https://my-fragments.com/my-fragment'
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!fragment) return null;

  return <div>{fragment.content}</div>;
}
```

## 🎮 Available Fragments

### 🎉 Party Button
A fun and interactive button that triggers a confetti animation when clicked.

```typescript
import { PartyButton } from '@webfragments/core/fragments/party-button';
```

### 📊 Dashboard
A modern and responsive dashboard component.

```typescript
import { Dashboard } from '@webfragments/core/fragments/dashboard';
```

## 💻 Development

### Running Fragments in Standalone Mode

Each fragment can be developed and tested independently using its own development environment.

#### Party Button Fragment
```bash
pnpm run serve:party-button
```
Visit `http://localhost:5173` to see the Party Button in action.

#### Dashboard Fragment
```bash
pnpm run serve:dashboard
```
Visit `http://localhost:5173` to see the Dashboard in action.

### 🛠️ Building

```bash
# Clean and build the package
pnpm run build

# Watch mode for development
pnpm run dev

# Type checking
pnpm run typecheck
```

## 📁 Project Structure

```
src/
├── elements.ts           # Core web fragments functionality
├── hooks/               # React hooks
│   └── useWebFragment.ts # Hook for dynamic fragment loading
├── types.ts            # TypeScript type definitions
├── fragments/          # Fragment components
│   ├── party-button/   # Party Button fragment
│   │   ├── dev/       # Standalone development setup
│   │   ├── index.ts   # Fragment entry point
│   │   └── PartyButton.tsx
│   └── dashboard/      # Dashboard fragment
│       ├── dev/       # Standalone development setup
│       ├── index.ts   # Fragment entry point
│       └── Dashboard.tsx
└── index.ts           # Package entry point
```

## 🔧 Creating New Fragments

1. Create a new directory under `src/fragments/`
2. Create your component file (e.g., `MyFragment.tsx`)
3. Create an `index.ts` file to export your fragment
4. Set up a standalone development environment in a `dev/` directory
5. Add the fragment to the package exports in `package.json`
6. Register the fragment in your application

Example fragment structure:
```
my-fragment/
├── dev/
│   ├── index.html
│   └── main.tsx
├── index.ts
└── MyFragment.tsx
```