# Alloy UI Component Library

`V1.2.0 PRODUCTION` | Live UI demo and component explorer on [https://alloyui.netlify.app](https://alloyui.netlify.app) | Our website: [https://infinitode.netlify.app](https://infinitode.netlify.app)

**Alloy** is a dark-mode-first UI component library with a square-edged, grid-aligned visual style. It is plain HTML plus Tailwind CSS v4 utilities — no JavaScript framework, no runtime dependencies.

## Recent Changes

### v1.2.0

Version 1.2 rolls up everything below: 17 new components (**150 total / 32 categories**), the plain-language copy pass and the contrast-aware Theme Lab — plus this release's polish:

- **Landing page refresh:** new Theme Lab feature section with a panel mock and live contrast readouts; the New Components section now describes v1.2; the hero version badge and release chip are solid instead of translucent (text no longer competed with the glow and grid lines behind them).
- **Accent clash handling:** if the chosen primary sits too close to the secondary surface or the background, the explorer sidebar's active filter automatically shifts to a distinguishable shade (with its own contrast-checked ink), and hover accents are now validated against the hover surface as well as the page background.
- **Explorer search bar:** the input now uses an explicit themed text color, a primary-colored caret and primary selection highlight, so it follows Theme Lab changes like everything else.
- **Versioning:** all version identifiers across the landing page, explorer, demo content, build metadata and this README now read v1.2.0.

### Patch — 17 new components & prebuilt page layouts

**Three new categories (9 components):**

| Category | Components |
| --- | --- |
| **Timelines & Activity** (`#timeline`) | **Activity Feed** — vertical event rail with icons, descriptions and timestamps · **Version Changelog** — release entries with version numbers, dates, "Latest" tag and categorized change lists · **Audit Log** — compact monospace event rows with time-range filters, status column and CSV export footer |
| **Empty States** (`#empty`) | **No Results** — search placeholder with clear-search action · **First Project** — dashed onboarding panel with primary/secondary CTAs and reassurance footer · **Connection Error** — timeout state with retry and status-page actions plus an error reference code |
| **Files & Media** (`#files`) | **Upload Dropzone** — drag-and-drop target with an in-progress upload bar and a completed row · **File Browser** — breadcrumb header, column headings and folder/file rows with sizes and row menus · **Storage Usage** — segmented capacity bar with a per-category legend and quota footer |

**Five new variants in existing categories:**

- **Buttons · Icon Toolbar** — bordered, divider-separated icon button strip with an active state and a destructive action.
- **Badges · Version Tags** — stable / beta / nightly / deprecated release tags plus a build-hash chip.
- **Inputs · Verification Code** — 6-digit code entry with filled, focused and empty box states, verify button and resend countdown.
- **Overlays · Command Palette** — ⌘K-style quick-action dialog with search row, grouped results, keyboard-shortcut chips and a navigation-hint footer.
- **Feedback · Toast Stack** — stacked success / in-progress / error notifications with inline actions and dismiss buttons.

**Three new prebuilt page layouts (App Shells):**

- **Status Page** — overall-status banner with uptime percentage, per-service rows with 12-segment uptime bars (operational / degraded / outage states) and a past-incidents section.
- **Error 404 Page** — full-page not-found layout with oversized display numerals, explanation copy, primary/secondary navigation actions and a request-ID footer.
- **Documentation Layout** — three-column docs shell: section navigation, article content with breadcrumb, terminal-styled code block, callout note and prev/next pager, plus an "On this page" table of contents.

Totals move from **133 components / 29 categories** to **150 components / 32 categories**. The sidebar, filter counts, search index and `#hash` deep links pick the new categories up automatically, and the landing page grid now links directly to them.

### Patch — plain-language copy & contrast-aware Theme Lab

- **Contrast-aware theming:** the Theme Lab now keeps text legible no matter which colors you pick. Choosing a light background automatically re-derives the whole neutral ramp (text, borders, surfaces) from that background, flipping the site into a readable light mode; choosing a different dark background re-tints the ramp to match. Text on primary-colored buttons, tiles and chips switches between dark and light ink based on WCAG contrast against the chosen primary — across every component on both pages, including hover fills. Hover accents (sidebar filters, links and tiles that highlight in the primary color) are contrast-checked as well, automatically darkening or lightening until they read at WCAG AA against the active background.
- **Plain-language copy:** replaced the metaphorical copy across the landing page and explorer with direct descriptions. Sections are now named for what they are (Design System, Core Components, Spacing Grid, New Components), the explorer's categories use standard names (Buttons, Badges, Inputs, Pagination, Testimonials, Contact, …), and component demos say what they mean — "Sign In" instead of "Initialize Sequence", "Forgot password?" instead of "Lost Key?", "Stay up to date." instead of "Stay on the grid.", and so on. Deliberate terminal-styled demo content (boot logs, mock IDs) is unchanged.

### Patch — Theme Lab, loader fixes & component sweep

- **Theme Lab overlay:** both the landing page and the explorer now carry a floating settings bar with **primary**, **secondary (surface)** and **background** color pickers. Changes apply live through the CSS token layer, persist across pages via `localStorage`, and the bar can be hidden/restored with a single click (hidden state persists too). A reset button restores the stock Alloy palette.
- **Loaders reworked:** the Core Spinner's rotating square was replaced with a blocky 8-cell trace ring that matches the industrial aesthetic, and the Terminal Boot Log's progress bar is now animated (grow-in fill plus a looping sheen) instead of static.
- **Landing page fixes:** removed the stray decorative line in the top-left of the hero, and rebalanced the New Components section (left text column now gets 40% of the grid on desktop instead of a cramped third, so the copy no longer presses against the divider).
- **Component sweep:** fixed the auth form's "Keep Line Open" checkbox (the check mark could never render due to a broken `peer` relationship), corrected the `scollbar-hide` class typo on two scrollable tables, replaced two non-existent Bootstrap icons (`bi-figma` → `bi-vector-pen`, `bi-webhook` → `bi-plug`) that rendered as blank glyphs, and made the Split FAQ's first accordion icon toggle like its siblings.
- **Token hygiene:** hero glows and the checkbox hover color now derive from `var(--color-primary)` instead of hard-coded orange values, so they respond to Theme Lab changes. Added a `--color-secondary` token and dedicated loader keyframes (`loader-trace`, `progress-sheen`, `boot-grow`) to the theme layer.

### v1.1.0

- **77 new components across 14 new categories:** — toggles, indicators, load states, overlays, pagination, stats, bento grids, editorial, integrations, newsletter capture, process pipelines, team, FAQ and app shells.
- Expanded every existing block: buttons, badges, inputs, headers, heroes, features, pricing, tables, CTA, testimonials, footers, feedback, navigation, auth and contact now carry additional variants.
- Added URL hash deep-linking to the explorer, e.g. `components/index.html#bento` opens the bento category directly.
- Added a reproducible Tailwind build (`npm install && npm run build:css`) for the compiled stylesheet.
- Bumped the library to **v1.1.0**.

## Component Library

| Group | Blocks | Covers |
| --- | --- | --- |
| Elements | Buttons, Inputs, Badges, Toggles, Indicators, Load States, Overlays, Pagination, Feedback, Timelines, Empty States, Files & Media | Actions, forms, status, switches, indicators, async states, menus, paging, system messaging, activity history, placeholder states and file handling |
| Layouts | Headers, Heroes, Features, Bento, Stats, Pricing, Tables, CTA, Editorial, Integrations, Newsletter, Testimonials, Process, Team, FAQ, Footers, Navigation, Auth, Contact, App Shells | Complete page sections from hero to footer, including dashboard, kanban, settings, status, 404 and documentation shells |

**150 variants / 32 categories.** Every variant lives inside `components/index.html` and can be copied directly from the explorer's `SOURCE` dialog.

## Features

- **Responsive Design:** Components are designed to work on all devices, from mobile to desktop.
- **Predictable Structure:** every measurement comes from a fixed spacing scale, so components align by construction.
- **Dark Mode Exclusive:** Fully committed to dark interfaces. `bg-zinc-950` and `white` contrasts are core to the system.
- **No Runtime:** fully built on Tailwind CSS with no JavaScript dependencies.
- **Visible Structure:** borders and square intersections define the layouts, giving a deliberate, blocky feel.
- **Deep-Linkable Explorer:** filter the library by category or search term, then share the resulting hash URL.
- **Theme Lab:** a hideable overlay bar (on both pages) for live-testing primary, secondary and background colors against every component. Selections persist between pages and sessions, and the contrast engine automatically switches text colors (full light-mode ramp for light backgrounds, dark/light button ink per the primary color) to keep everything legible.

## Getting Started

Alloy is not an npm package — you copy the markup directly. To use it:

1. Clone or download this repository:
   ```bash
   git clone https://github.com/Infinitode/Alloy.git
   ```
2. Navigate to your project and explore `components/index.html` to browse all variants and layouts.
3. Import the primary tailwind classes into your project's stylesheet, matching the token values provided in `src/input.css`.
4. If you edit the HTML or theme tokens, rebuild the compiled stylesheet:
   ```bash
   npm install
   npm run build:css
   ```
   Use `npm run watch:css` while developing.

## Design Tokens

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
components/index.html Component explorer — every component and layout
src/input.css         Tailwind entry, theme tokens, control primitives
src/theme-lab.js      Theme Lab overlay + contrast engine (shared by both pages)
src/index.css         Compiled stylesheet consumed by both pages
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
