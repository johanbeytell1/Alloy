# Contributing to Alloy UI

Alloy is an open-source structural component library. It's meant to grow securely through systematic enhancements and architectural upgrades. We welcome contributions, ranging from completely new components and layout implementations to robust updates for the global standard logic.

## Developing New Structural Components

1. All elements must adhere to the core Alloy aesthetic properties (dark-mode exclusive, border-driven logic, no heavy opacities or soft dropshadows). Standard `border-2 border-border` and sharp corners (`rounded-none` by default unless it's a structural pill element).
2. Write raw HTML elements using absolute Tailwind CSS values and reference our main tokens. Avoid runtime logic or dependencies.
3. Use the `variant-item` wrapper structures found in the component explorer when adding new configurations.
4. Register new categories in both the sidebar (`data-type` buttons) and a matching `<article data-type="...">` block. Category ids are used by the filter, the live counts and hash deep links (`components/index.html#bento`).
5. Keep every block responsive: stack multi-column grids below `md`, allow horizontal scroll for wide tables, and never let a preview overflow the viewport.
6. Rebuild the stylesheet after changing markup or tokens: `npm install && npm run build:css`.

## Git Operations

1. **Fork** the original `Infinitode/Alloy` repository on GitHub.
2. Clone your forked version.
3. Setup a separate, descriptively named **branch** for your change (e.g. `feat/expand-footer` or `fix/hero-hover`).
4. Develop locally and commit changes using concise structure messaging.
5. Create a standard **Pull Request** against the main Alloy repository targeting the `main` or active `development` root.

## Bug Logs

Should you find UI logic breaking across browsers or structural components misaligning under grid pressures, open an Issue immediately detailing the exact variant name and block location.

All architectural discussions belong inside GitHub Issues for absolute transparency. 

## Code of Conduct

Maintain professional communication protocols. Alloy has a strict logic-over-everything mentality, but community protocol demands respect for all fellow builders.
