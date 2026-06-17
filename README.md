# 🌐 Infrastructure App Graph Builder

An interactive, frontend-orchestrated configuration canvas designed to map, visualize, and monitor distributed microservice clusters and network dependencies in real time. This application serves as a high-performance system topology tool allowing engineers to manipulate node coordinates, update simulated service lifecycles, and monitor telemetry overhead inside an isolated sandbox environment.



## 🏗️ Architectural Overview & Data Flow

This application is engineered with a strict **unidirectional data flow** pattern, separating network simulation, state persistence, layout scaffolding, and canvas graphic calculations:

┌────────────────────────────────────────────────────────┐
│               Browser Viewport Actions                 │
│         (fetch requests & cursor drag gestures)        │
└───────────────────────────┬────────────────────────────┘
│
▼
┌────────────────────────────────────────────────────────┐
│          Mock Service Worker Proxy Thread              │
│  (Intercepts network outbound calls via Worker thread) │
└───────────────────────────┬────────────────────────────┘
│ Hydrates State Payload
▼
┌────────────────────────────────────────────────────────┐
│             Zustand Central State Store                │
│    (Immutable graph arrays & selected memory matrix)   │
└───────────────────────────┬────────────────────────────┘
│ Fires Targeted Selectors
▼
┌────────────────────────────────────────────────────────┐
│                Hardware Accelerated UI                 │
│    (SVG path vectors & GPU layer translate3d nodes)     │
└────────────────────────────────────────────────────────┘

1. **Network Proxy Interception Layer:** On core application boot, the framework initiates a standard browser `fetch('/api/graph-data')`. Rather than hitting a remote staging cloud, **Mock Service Worker (MSW)** captures the outbound network loop at the browser background service-worker thread layer, injecting an in-memory database simulation array.
2. **State Hydration Abstraction Layer:** The custom lifecycle hook (`useAppData.ts`) captures the raw network stream asynchronously, validates HTTP response metadata properties, and updates the application's central reactive core.
3. **Global State Matrix Layer:** A selector-driven **Zustand** store processes the graph data into flat, normalized collections (`nodes` and `edges`). It serves as the application's single source of reactive truth, broadcasting coordinate changes to subscribed observers.
4. **Hardware-Accelerated Render Engine:** The visual layer translates spatial coordinates ($x, y$) directly into CSS transforms mapped to the browser's GPU layer, while an SVG vector layout handles calculation matrices to paint dependency connector lines.

---

## 🛠️ Tech Stack & Technical Rationales

* **Vite Engine:** Selected over traditional Webpack architectures to achieve near-instantaneous Hot Module Replacement (HMR) times during development by using native browser ES modules and pre-bundling dependencies with `esbuild`.
* **TypeScript (Strict Contract Typing):** Enforces data contracts for vertices (nodes) and paths (edges) at compile time. This prevents data corruption during complex graph layout mutations or rapid coordinate updates.
* **Zustand Store Engine:** Chosen instead of native React Context to eliminate the widespread context "re-render propagation bug." Zustand utilizes a pub-sub model with selector metrics, ensuring only the exact node or panel being updated is forced to repaint.
* **Tailwind CSS Graphic Tokens:** Provides predictable utility layers to compute status canvas indicators and dynamic reactive styling options, maintaining zero performance drag.
* **Mock Service Worker (MSW):** Decouples front-end engineering from real backend pipelines. By mocking real REST network behavior at the service worker thread level, the exact same code can be shipped to production by simply disabling the environment worker flag.

---

## 📂 Repository File Blueprint

```text
src/
├── components/          # Presentation Layer
│   ├── canvas/          # SVG line paths and mouse gesture dragging nodes
│   ├── inspector/       # Detail panel forms mapping partial state updates
│   ├── layout/          # Scaffold columns (Top Header, Left Inventory Rail)
│   └── ui/              # Reusable design token primitives (Badges, Sliders)
├── hooks/               # Custom side-effect hooks (API fetch orchestrators)
├── mocks/               # MSW Service Worker thread proxies and handlers
├── store/               # Zustand immutable state memory and action engines
└── types/               # Compile-time strict interface contract definitions
