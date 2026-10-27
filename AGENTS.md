# AGENTS.md

Instructions for AI agents.


## Overview

**Knowledj** is a desktop flashcard study app built with **Tauri v2 + React 19 + TypeScript** (Vite 8, strict TS). It has two purposes:

- **Edit** tab — manage memory cards (create, edit, delete).
- **Train** tab — quiz yourself with a flashcard-style revision session.

The two modes are split into tabs in a left sidebar. Styling is intentionally minimal for now: plain global CSS files, no frameworks.

## Commands

| Command | What it does |
|---|---|
| `npm run tauri dev` | Launch the app in dev mode (starts Vite on port 1420 + builds Rust). |
| `npm run build` | Type-checks with `tsc` then bundles with Vite. Must pass before considering work done. |
| `npm run preview` | Preview the frontend bundle only. |
| `npm run lint` | Sanity-checks with ESLint. Warns and errors should not be ignored. |

Rust code lives in `src-tauri/` (edition 2024). `serde` and `serde_json` are already dependencies. After Rust changes, `npm run tauri dev` rebuilds it.

## Data model

Cards are stored in a single readable JSON file, hand-editable:

```json
{
  "version": 1,
  "cards": [
    {
      "id": "uuid",
      "title": "Photosynthesis",
      "body": "Process by which plants convert light into energy.",
      "dateCreated": "2026-10-20T12:00:00Z",
      "dateUpdated": "2026-10-20T12:00:00Z"
    }
  ]
}
```

- `version` — schema version, starts at `1`. Bump it if the shape changes.
- `title` — the question/prompt shown first in a quiz.
- `body` — the answer revealed after the prompt.
- `id` — UUID generated on creation.
- `dateCreated` / `dateUpdated` — ISO-8601 UTC timestamps; `dateUpdated` is refreshed on every edit.

## Persistence

The JSON file lives in Tauri's app data directory (platform-specific, e.g. `~/.local/share/com.detroix23.knowledj/knowledj/knowledge.json` on Linux). The frontend **never** touches the filesystem directly; all I/O goes through Rust commands:

- `knowledge_load` — read and return the file, creating a valid empty file (`{ "version": 1, "cards": [] }`) if it does not exist yet.
- `knowledge_save` — write the whole file back (pretty-printed JSON, readable).

The frontend holds the full card list in a `KnowledgeContext` loaded once at startup; edits update context state and persist via `save_knowledge`.

## Frontend architecture

```
src/
├── lib
│   └── knowledge.ts      # Tauri `invoke` bindings.
├── main.tsx              # React root (StrictMode)
├── App.tsx               # holds activeTab: 'edit' | 'train', renders sidebar
├── App.css               # global styles (replace template boilerplate)
├── context/
│   └── KnowledgeContext.tsx   # card list + load/save actions
├── types.ts              # Card, KnowledgeFile, tab types
├── tabs/
│   ├── EditTab.tsx       # card CRUD
│   └── TrainTab.tsx      # quiz session
└── components/           # shared UI (sidebar, card form, quiz card, ...)
```

- No router or state library: tab switching is a `useState` in `App`; cards live in React Context.
- Quiz: cards are shuffled randomly, then shown one at a time — **title first, body revealed on demand**, self-graded with Got it / Missed. No scheduling metadata yet.

## Rules

- If stuck (building, thinking, coding), stop and report. Do not hallucinate, and divide tasks. 
- **Run `npm run build` and make sure it passes** after your changes.
- Do **not** add dependencies (npm or Cargo) without asking first.
- Keep CSS minimal and plain (one global CSS file per component/tab area). No CSS frameworks, no styled-components.
- UI strings, comments, and docs are in English.
- Respect Tauri v2 conventions: capabilities in `src-tauri/capabilities/default.json`; new plugins require updating permissions.
- Keep `knowledge.json` human-readable: pretty-printed, stable field order.
- TypeScript strict mode: no `any`, no unchecked casts.
- All functions, classes, files shall be documented. _E.g_.
  - with docstrings;
  - `///` for Rust functions; 
  - `//!` for Rust files;
  - `/** ... */` for JS and TS functions;
  - `/* ... */` for JS and TS general comments;
  - still, remain concise and do not overdo;
- All functions shall do one and one thing : divide in multiple sub-functions if necessary.

## Future work (do not build unless asked)

- **Lesson/grouping**: add a grouping field to cards and let the quiz picker filter by it (schema bump + picker options).
- **Richer card fields**: tags, hints, SRS scheduling (ease/interval/due).
- **More quiz formats**: multiple choice, typed answers.
