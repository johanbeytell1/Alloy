# Alloy UI Foundation

`V1.1.0 PRODUCTION` | Live UI demo and component explorer on [https://alloyui.netlify.app](https://alloyui.netlify.app) | Our website: [https://infinitode.netlify.app](https://infinitode.netlify.app)

**Alloy** is an industrial-standard, dark-mode-exclusive UI component library engineered for structural precision and scale. It drops the fluff of generic design frameworks in favor of a brutally efficient, mathematically scaled architectural aesthetic.

## Recent Changes

- **Vault expansion:** 77 new foundations across 14 new blocks — toggles, indicators, load states, overlays, pagination, stats, bento grids, editorial, integrations, newsletter capture, process pipelines, team, FAQ and app shells.
- Expanded every existing block: buttons, badges, inputs, headers, heroes, features, pricing, tables, CTA, testimonials, footers, feedback, navigation, auth and contact now carry additional variants.
- Added URL hash deep-linking to the explorer, e.g. `components/index.html#bento` opens the bento vault directly.
- Added a reproducible Tailwind build (`npm install && npm run build:css`) for the compiled stylesheet.
- Bumped the foundation to **v1.1.0**.

## Component Vault

| Group | Blocks | Covers |
| --- | --- | --- |
| Elements | Buttons, Inputs, Badges, Toggles, Indicators, Load States, Overlays, Pagination, Feedback | Actions, forms, status, switches, telemetry, async states, menus, paging and system messaging |
| Layouts | Headers, Heroes, Features, Bento, Stats, Pricing, Tables, CTA, Editorial, Integrations, Newsletter, Testimonials, Process, Team, FAQ, Footers, Navigation, Auth, Contact, App Shells | Complete page sections from hero to footer, including dashboard and kanban shells |

**133 variants / 29 blocks.** Every variant lives inside `components/index.html` and can be copied directly from the explorer's `SOURCE` dialog.

## Features

- **Responsive Design:** Components are designed to work on all devices, from mobile to desktop.
- **Industrial Grade Architecture:** Components designed with absolute predictability. Everything snaps to a strict atomic grid.
- **Dark Mode Exclusive:** Fully committed to dark interfaces. `bg-zinc-950` and `white` contrasts are core to the system.
- **Zero Latency Scaling:** Fully built on TailwindCSS with no bulky runtime logic.
- **Premium Intersections:** Borders and structural geometry define the layouts, giving a terminal-console, "blocky" feel.
- **Deep-Linkable Explorer:** Filter the vault by category or search term, then share the resulting hash URL.

## Getting Started

Alloy is not an npm package—it's a foundation you build upon directly. To utilize the structure:

1. Clone or download this repository:
   ```bash
   git clone https://github.com/Infinitode/Alloy.git
   ```
2. Navigate to your project and explore `components/index.html` to discover the vault of variants and layouts.
3. Import the primary tailwind classes into your project's stylesheet, matching the token values provided in `src/input.css`.
4. If you edit the HTML or theme tokens, rebuild the compiled stylesheet:
   ```bash
   npm install
   npm run build:css
   ```
   Use `npm run watch:css` while developing.

## Core Logic System

Alloy is powered by Tailwind V4, allowing for modular and customizable components without complex CSS or JavaScript.

**Alloy Design Color Palette:**

- **Primary:** `#FF9531`
- **Background:** `#09090b`
- **Background Alt:** `#18181b`
- **Border:** `#27272a`
- **Text Primary:** `#ffffff`
- **Text Dim:** `#71717a`

## Project Structure

```
index.html            Marketing landing page
components/index.html Vault explorer — every component and layout
src/input.css         Tailwind entry, theme tokens, control primitives
src/index.css         Compiled stylesheet consumed by both pages
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
