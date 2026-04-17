<p align="center">
  <span style="font-size: 5rem; line-height: 1;">نور</span>
</p>

<p align="center">A modern Quran reader UI: a manuscript-inspired home, surah grid and reader with Arabic plus translations, search, and reading preferences — powered by the <strong>Nur</strong> API.</p>

# NUR

**NUR CLIENT** is the [Next.js](https://nextjs.org/) frontend for **Nur**. Readers open the full surah list, read verse-by-verse with optional translation editions, search the text, and tune Arabic font, sizes, theme, and edition — with preferences stored in the browser. The shell uses a transparent hero on the home route, a solid bar elsewhere, and responsive layouts from mobile to desktop.

🌐 **Frontend Live URL:** [https://nur-frontend-beta.vercel.app](https://nur-frontend-beta.vercel.app/)  
🌐 **Backend Live URL:** [https://nur-server.vercel.app](https://nur-server.vercel.app/)  
🌐 **Frontend GitHub:** [https://github.com/mazharul90007/nur_frontend](https://github.com/mazharul90007/nur_frontend)  
🌐 **Backend GitHub:** [https://github.com/mazharul90007/nur_server](https://github.com/mazharul90007/nur_server)

---

## ✨ Features

### 🏠 Home

- Full-viewport **hero** with Quran imagery, layered overlays, and **Cormorant Garamond** + Arabic display type.
- Primary call to action: **Read the Quran** → surah index (`/surah`).
- **Transparent navigation** over the hero (white nav labels); other routes use the standard bar.

### 📖 Reading

- **Surah index** (`/surah`) — all **114** chapters in a responsive grid (up to **three columns** on large screens).
- **Surah reader** (`/surah/[number]`) — ayahs with Arabic and translation; **sticky, scrollable surah list** in a **left sidebar** from the `md` breakpoint up; mobile uses **← All surahs** back to the index.

### 🔎 Search

- **Search** (`/search`) — query ayahs via the backend search endpoint with pagination and optional edition.

### ⚙️ Settings

- **Reading settings** drawer: Arabic font (including **local IndoPak**), Arabic size, translation size, **translation edition**, light/dark theme.
- Persisted with **Zustand** + **localStorage** (device-local; no accounts).

### 🎨 Typography and assets

- **Google fonts** for Arabic (e.g. Amiri, Scheherazade New, Noto Naskh Arabic) plus **`indopakfont.ttf`** under `public/data/quran_assets/`.
- Default Arabic font preference: **IndoPak** where configured in the app.

### ⚡ Performance

- **Static generation** for surah pages where applicable; production builds use **Next.js 16** with **Turbopack** (`next build`).

---

## 🛠️ Technology stack

- **Framework**: [Next.js](https://nextjs.org/) (v16.2.4), App Router
- **UI**: [React](https://react.dev/) 19, [Tailwind CSS v4](https://tailwindcss.com/)
- **Data**: [TanStack Query](https://tanstack.com/query), [Axios](https://axios-http.com/) (`src/lib/api-client.ts`)
- **State**: [Zustand](https://github.com/pmndrs/zustand) (settings, UI)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (Hi2 set)
- **Language**: TypeScript

> The API base URL is **`NEXT_PUBLIC_API_URL`** (no `/api/v1` prefix). CORS and `FRONTEND_URL` are configured on the **server**.

---

## 📋 Prerequisites

- **Node.js** v20+ (see `engines` in `package.json`)
- **npm** (this repo ships `package-lock.json`; `pnpm`/`yarn` are fine if you keep lockfiles consistent)
- A running **[Nur Server](https://github.com/mazharul90007/nur_server)** — local or [deployed](https://nur-server.vercel.app/) — see the [backend README](https://github.com/mazharul90007/nur_server/blob/main/README.md) for database, seed, and environment

---

## 🔧 Setup

### 1. Clone and enter the project

```bash
git clone https://github.com/mazharul90007/nur_frontend.git
cd nur_frontend
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Environment variables

Create **`.env.local`** in this directory (or copy from `example.env`).

**Production / hosted API**

```env
NEXT_PUBLIC_API_URL=https://nur-server.vercel.app
```

**Local API** (default backend port is often `4000`)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Do **not** add a trailing slash. The client uses this value in `src/lib/api-client.ts` for all `/quran/*` requests.

### 4. Run the dev server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

For a full experience against real data, run the backend with a valid `.env` and seeded database as described in the [server README](https://github.com/mazharul90007/nur_server/blob/main/README.md).

### 5. Production build

```bash
npm run build
npm run start
```

---

## 📜 Project structure

- `src/app` — App Router: `/`, `/surah`, `/surah/[number]`, `/search`, layouts, `globals.css`
- `src/components` — App shell, settings drawer, Arabic text, surah sidebar, etc.
- `src/lib` — Axios API client, Quran API helpers, server fetch helpers
- `src/store` — Zustand settings store (persisted)
- `src/types` — Shared TypeScript types for API shapes
- `public` — Static assets; `public/data/quran_assets/` for local fonts

---

## 🚀 Deployment

- **Production:** [nur-frontend-beta.vercel.app](https://nur-frontend-beta.vercel.app/) — set **`NEXT_PUBLIC_API_URL=https://nur-server.vercel.app`** in Vercel project settings.
- Ensure the backend allows this origin in CORS (**`FRONTEND_URL=https://nur-frontend-beta.vercel.app`** on the server).
- Prefer **`npm ci`** in CI when using `package-lock.json` for reproducible installs.

---

## 🗂️ Backend reference

REST surface, Prisma models, seeding, and environment variables are documented in **[nur_server](https://github.com/mazharul90007/nur_server/blob/main/README.md)**.

---

## 📜 Scripts

| Script          | Purpose                 |
| --------------- | ----------------------- |
| `npm run dev`   | Next.js dev server      |
| `npm run build` | Production build        |
| `npm run start` | Start production server |
| `npm run lint`  | ESLint                  |

---

## 📝 License

Private project — see repository settings / `package.json`.

---

## 👤 Author

**Mazharul Islam Sourabh**

---

## 🤝 Contributing

Contributions are welcome. For larger UI or routing changes, open an issue first to align on scope.

---

## 📞 Support

Open an issue in [nur_frontend](https://github.com/mazharul90007/nur_frontend/issues) or contact the maintainer.
