# GraceRoots

An AI-powered Christian discipleship app for parents — daily devotionals, a
prayer wall, community discussions, and curated resources. Built as a single
React + Vite codebase intended to run as a web app and, later, wrap into iOS
and Android via Capacitor.

## Stack

- **React 19** + **TypeScript**
- **Vite** — dev server & build
- **React Router** (`HashRouter`, so the build works from any static host or
  a Capacitor WebView without server-side routing)
- **Tailwind CSS** — utility styling, custom `forest` / `cream` / `clay`
  palette
- **lucide-react** — icon set

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build locally
```

## Project structure

```
graceroots/
├── index.html                 Vite entry HTML (loads src/main.tsx)
├── tailwind.config.js         Color palette, fonts, shadows, radii
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
│
└── src/
    ├── main.tsx                React root — mounts <App /> into #root
    ├── App.tsx                 Route table (all screens listed below)
    ├── index.css                Tailwind directives, font import, global
    │                            styles, the .app-shell container that
    │                            constrains the app to a 430px phone-width
    │                            column on wider screens
    │
    ├── components/              Shared, reused across pages
    │   ├── BottomNav.tsx         5-tab bottom nav (Home / Devotionals /
    │   │                         Community / Prayer / Profile)
    │   ├── TopBar.tsx            Reusable back-button + title header
    │   └── OnboardingLayout.tsx  Shared frame for the 3 onboarding screens
    │                             (visual, headline, copy, dot indicator, CTA)
    │
    └── pages/                    One file per screen
        ├── Splash.tsx             Green splash screen, auto-advances
        ├── Loading.tsx            Cream logo/transition screen
        ├── Onboarding1.tsx        "Welcome to GraceRoots"
        ├── Onboarding2.tsx        "Daily Devotionals"
        ├── Onboarding3.tsx        "A Faith-Filled Community"
        ├── CreateAccount.tsx      Sign-up form
        ├── SignIn.tsx             Sign-in form
        ├── Home.tsx               Dashboard: daily verse, quick links,
        │                          community discussion previews
        ├── Devotional.tsx         Full daily devotional (verse, reflection,
        │                          journal prompt, yesterday/tomorrow nav)
        ├── Community.tsx          Discussion list, search, category filters
        ├── ReadArticle.tsx        Single community post / article detail
        ├── PrayerWall.tsx         Submit + browse prayer requests
        ├── Resources.tsx          Filterable grid of guides/videos/podcasts
        ├── Notifications.tsx      Notification feed
        ├── Profile.tsx            User profile, stats, posts/saved tabs
        └── Settings.tsx           Account, notifications, app prefs, sign out
```

## Routes

| Path                  | Screen                     |
|------------------------|-----------------------------|
| `/`                    | Splash                      |
| `/loading`              | Loading / logo transition   |
| `/onboarding/1`         | Onboarding — Welcome        |
| `/onboarding/2`         | Onboarding — Devotionals    |
| `/onboarding/3`         | Onboarding — Community      |
| `/signup`               | Create Account              |
| `/signin`                | Sign In                     |
| `/home`                  | Home dashboard              |
| `/devotionals`           | Daily Devotional detail     |
| `/community`             | Community feed              |
| `/community/article`     | Read Article                |
| `/prayer`                 | Prayer Wall                 |
| `/resources`              | Resources                   |
| `/notifications`          | Notifications                |
| `/profile`                 | Profile                      |
| `/settings`                 | Settings                     |

## Design tokens (`tailwind.config.js`)

- `forest` — primary green, 50–900 shades (`forest-500` = `#4B5B3F`)
- `cream` — background/surface tones (`cream-50` → `cream-300`)
- `ink` — body text color (`#2B2A24`)
- `clay` — warm accent for small highlights (`#B98249`)
- Fonts: `font-serif` (Lora, headlines) and `font-sans` (Inter, body/UI),
  loaded via Google Fonts in `index.css`

## Notes / next steps

- All imagery is placeholder SVG (no real photos or illustrations shipped)
  — swap the `<svg>` blocks in `Onboarding*.tsx`, `Devotional.tsx`, and
  `ReadArticle.tsx` for real assets when available.
- Forms (`CreateAccount`, `SignIn`, prayer request, etc.) are UI-only — no
  backend calls are wired up yet. That's the natural next step once this
  merges with the ROOTED backend (FastAPI + PostgreSQL).
- This is a standalone scaffold, not yet merged into the main ROOTED repo's
  folder conventions — treat `src/pages` and `src/components` as a
  reference to port over, or replace this repo's routing wholesale if it's
  adopted as-is.
