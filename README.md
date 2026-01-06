# Next Mini SaaS – v1

A production-style **Next.js 15 + React 19** application built to showcase
modern frontend engineering practices, including server actions,
optimistic UI updates, internationalization, and testing.

An **in-memory data store** is used intentionally to keep the focus on
frontend behavior rather than database configuration.

---

## Tech Stack

- **Next.js 15** (App Router, Server Components, Server Actions)
- **React 19** (`useOptimistic`, transitions)
- **TypeScript**
- **pnpm**
- **Tailwind CSS**
- **Vitest** (unit testing)
- **Playwright** (end-to-end testing)

---

## Features

- Server-rendered project list
- Create, edit, and delete projects using **Server Actions**
- Optimistic UI updates with rollback on failure
- Internationalization (i18n) with all translations in a single file
- Language preference persisted via cookies
- Server-side activity tracking
- Fully tested (unit + E2E)
- Clean, maintainable codebase (files under ~200 lines)

---

## Getting Started

### Prerequisites

- Node.js **20+**
- **pnpm**

### Installation

# Next Mini SaaS — v1

A concise demo application showcasing modern Next.js 15 and React 19
patterns for educational and portfolio use. It focuses on server-driven
UI, Server Actions, optimistic updates, and end-to-end testing. The
project intentionally uses an in-memory store so you can explore
frontend patterns without database setup.

## Tech stack

- Next.js 15 (App Router, Server Components, Server Actions)
- React 19
- TypeScript
- pnpm
- Tailwind CSS
- Vitest (unit tests)
- Playwright (E2E tests)

## Features

- Server-rendered project list
- Create / edit / delete projects via Server Actions
- Optimistic UI updates with rollback on failure
- Internationalization (single translation file)
- Language preference persisted in cookies
- Server-side activity tracking
- Unit and E2E test coverage

## Getting started

Prerequisites

- Node.js 20+
- pnpm

Install dependencies

```bash
pnpm install
```

Run development server

```bash
pnpm dev
```

Open http://localhost:3000

Run tests

```bash
pnpm test:unit   # run Vitest unit tests
pnpm test:e2e    # run Playwright end-to-end tests
```

## Project structure

See the `src` folder for the application code:

- `src/app/` — Next.js App Router routes, layouts and pages
- `src/components/` — Reusable UI components
- `src/lib/` — Shared logic (db, auth, i18n, utilities)
- `tests/` — Unit and E2E tests

Files are intentionally small (≤ ~200 lines) to improve readability.

## Internationalization (i18n)

All translations live in `src/lib/i18n.ts`. The app supports multiple
locales and persists language choice in cookies. Default locale: `en`.

## Development notes

- This project uses an in-memory data store for demonstration only.
- If you add persistence, update `src/lib/db.ts` and relevant tests.

## Contributing

Feel free to open issues or PRs. For quick fixes:

```bash
git add README.md
git commit -m "docs: update README"
git push
```

## License

This repository is provided for educational and portfolio purposes.
