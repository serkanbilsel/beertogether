# 🍻 Beer Together — Real Life Meetups & Commitment Platform

> **Turn good intentions into real plans.**  
> A high-performance monorepo platform designed to bring friendship hangouts from chaotic WhatsApp threads into committed, real-world moments.

[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](https://opensource.org/licenses/MIT)
[![Next.js 14](https://img.shields.io/badge/Next.js-14_App_Router-black.svg)](https://nextjs.org/)
[![Expo](https://img.shields.io/badge/Expo-SDK_51-4630EB.svg)](https://expo.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-PostGIS_%2B_RLS-3ECF8E.svg)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_5.6-blue.svg)](https://www.typescriptlang.org/)

---

## 🏛️ Architecture Overview

Beer Together operates as a unified full-stack monorepo sharing core logic, validation, data transfer objects, and localization schemas across client surfaces:

```
Beer Together/
├── apps/
│   ├── web/           # Next.js 14 App Router (SSR, SSG, SEO, Schema.org/Event, Deferred Link Resolver, 6 Languages, Obsidian/Electric Amber UI)
│   └── mobile/        # React Native + Expo 51 (Apple HIG Quality, Real-time Check-in, 150m GPS verification, Dark Obsidian & Amber Tokens)
├── packages/
│   └── shared/        # Shared TypeScript DTOs, Zod schemas, Finite State Machine, Geolocation math, 6-Language i18n
├── supabase/
│   ├── migrations/    # Postgres + PostGIS + RLS Policies + Triggers (18+ Age Gate) + pg_cron jobs
│   ├── functions/     # Deno Edge Functions (Reminder push dispatcher, WhatsApp resolver, Content moderation)
│   └── seed.sql       # FSQ OS Places venues, mock profiles, verified meetups, proof photos
├── package.json       # Monorepo NPM Workspaces setup
└── README.md
```

---

## 🌟 Core Feature Highlights

1. **The 5-Step Core Loop:**
   - **Plan** → Select a friend, venue, and time slot.
   - **Invite** → One-tap WhatsApp universal deferred link handoff (`/i/<token>`).
   - **Remind** → Automated push reminder 60 minutes prior via `pg_cron` & Expo Push.
   - **Check-in** → 150m GPS proximity radius verification powered by PostGIS.
   - **Remember** → Photo proof uploaded and anchored to the chronological timeline.

2. **Zero Google Maps Lock-In (FSQ OS Places & PostGIS):**
   - Direct spatial querying (`ST_DWithin` / `<->`) on millions of open venue records within Postgres.

3. **WhatsApp Deferred Deep Linking:**
   - Universal Links & App Links with automatic web fallback for non-app users.

4. **SEO & SSR Rich Results:**
   - Public completed meetups rendered statically with `schema.org/Event` JSON-LD for rich Google indexing.

5. **6-Language Localization (i18n & RTL):**
   - Full support for **English, Turkish, Spanish, Japanese, Italian, and Arabic** (complete RTL layout mirroring).

6. **18+ Age Verification & Responsible Drinking Compliance:**
   - Enforced at both database trigger and UI level to comply with App Store (17+) and Google Play policies.

---

## 🚀 Quick Start & Development

### 1. Prerequisites
- **Node.js**: `v18.17.0+` or `v20.x`
- **NPM**: `v9.x+` or `v10.x`
- **Git**

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/serkanbilsel/beertogether.git
cd beertogether

# Install dependencies across all workspaces
npm install
```

### 3. Build & Test Shared Packages
```bash
# Build shared TypeScript library
npm run build

# Run unit tests (Geo math, State machine transitions, i18n)
npm test
```

### 4. Running Web & Mobile Applications
```bash
# Start Next.js Web Landing & SSR Engine (http://localhost:3000)
npm run dev

# Start React Native Mobile App (Expo Metro Bundler)
npm run dev:mobile
```

---

## 🎨 Design System & Palette

Crafted with a sleek, modern **Obsidian & Electric Amber** design language:

| Token | Hex / Value | Usage |
|---|---|---|
| `--bg` | `#08090D` (Dark) / `#F8FAFC` (Light) | Base background canvas |
| `--surface` | `#10121A` / `#FFFFFF` | Card & container surfaces |
| `--accent` | `#F59E0B` | Electric amber primary CTA |
| `--accent-text` | `#FBBF24` / `#D97706` | High-contrast amber labels |
| `--success` | `#10B981` | GPS 150m verified indicators |
| `--font-display` | `Outfit` | Bold, modern display typography |
| `--font-sans` | `Plus Jakarta Sans` | Legible, clean interface body |

---

## 📦 Monorepo Scripts Reference

- `npm run dev`: Starts the Next.js web application.
- `npm run dev:mobile`: Starts the Expo React Native Metro bundler.
- `npm run build`: Builds both `@beer-together/shared` and `@beer-together/web`.
- `npm test`: Executes Node.js native test runner on `@beer-together/shared` test suites.

---

## 📄 License & Compliance

Beer Together is open-source under the [MIT License](LICENSE).  
*18+ only. Please drink responsibly.*
