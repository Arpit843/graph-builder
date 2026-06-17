# App Graph Builder

A small "App Graph Builder" UI built as a take-home task.

## Tech Stack

- **React 18 + Vite** – fast dev server, instant HMR
- **TypeScript (strict)** – full type safety across the codebase
- **ReactFlow (xyflow)** – graph canvas with custom nodes
- **shadcn/ui** (Radix UI + Tailwind) – accessible, unstyled primitives
- **TanStack Query v5** – data fetching, caching, loading/error states
- **Zustand v5** – minimal UI state management
- **MSW (Mock Service Worker)** – intercepts fetch calls in the browser

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open http://localhost:5173

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript compiler check |

---

## Project Structure

```
src/
├── components/
│   ├── canvas/
│   │   ├── AppCanvas.tsx      # ReactFlow canvas, handles all graph interactions
│   │   └── ServiceNode.tsx    # Custom node component (rendered per node)
│   ├── inspector/
│   │   └── NodeInspector.tsx  # Tabs, status badge, synced slider/input
│   ├── layout/
│   │   ├── TopBar.tsx         # Header bar + Fit View + mobile toggle
│   │   ├── LeftRail.tsx       # Icon-only navigation sidebar
│   │   ├── RightPanel.tsx     # Desktop sidebar + mobile drawer wrapper
│   │   └── AppList.tsx        # App selector using TanStack Query
│   └── ui/
│       ├── Badge.tsx          # Status badge (Healthy/Degraded/Down)
│       ├── Tabs.tsx           # Radix Tabs wrapper
│       └── Slider.tsx         # Radix Slider wrapper
├── hooks/
│   └── useAppData.ts          # TanStack Query hooks (useApps, useAppGraph)
├── mocks/
│   ├── handlers.ts            # MSW request handlers + seed data
│   └── browser.ts             # MSW worker setup
├── store/
│   └── appStore.ts            # Zustand store
├── types/
│   └── index.ts               # Shared TypeScript types
├── lib/
│   └── utils.ts               # cn() utility
├── App.tsx                    # Root layout
└── main.tsx                   # Entry point: starts MSW then renders app
```

---

## Key Design Decisions

### 1. MSW for mock APIs
MSW intercepts real fetch() calls in the browser via a Service Worker. The app code makes real HTTP calls with no mocking in the code itself, which mirrors production and makes switching to a real API trivial.

### 2. ReactFlow as source of truth for node data
Node data (label, status, replicas, description) lives inside ReactFlow's node state, updated via setNodes. Zustand only stores UI state — not node data. This avoids duplicated state.

### 3. Zustand for UI-only state
Zustand stores only: selectedAppId, selectedNodeId, isMobilePanelOpen, activeInspectorTab.

### 4. TanStack Query caching
staleTime: 60_000 means graph data is served from cache for 60 seconds. queryKey: ["graph", appId] automatically refetches when appId changes.

### 5. Responsive: mobile drawer via Radix Dialog
On small screens, the right panel becomes a Dialog (slide-over drawer) controlled by isMobilePanelOpen in Zustand.

---

## Known Limitations

- No persistence – node edits are lost on refresh
- No "Add Node" button – bonus feature, out of scope
- No drag-to-create edges – edges are defined in mock data only
