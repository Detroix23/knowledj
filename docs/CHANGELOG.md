# Knowledj changelog.

## Basic setup (2026-10-21).

**Setup of Tauri**.

**First plate code**: 
- Rust `lib.rs` defines: 
    - `Card`/`KnowledgeFile` (serde, rename_all = "camelCase")
    - 2 commands, `knowledge_load` (creates the file if missing) and `knowledge_save`. 
- Rust `main.rs`. Registers in `generate_handler!`. 
    - Catch: the file only appears once the frontend actually invokes knowledge_load — a command is a route, not a trigger. 
    - Verify via devtools: `await window.__TAURI__.core.invoke("knowledge_load")`. File lands in `~/.local/share/com.detroix23.knowledj/`.

**ESLint**: 
- installed ESLint 10 + typescript-eslint + react-hooks; 
- removed eslint-plugin-react (only package whose peer range blocked ESLint 10 — this forced `--legacy-peer-deps`; now retired). 
- Config: `eslint.config.js` flat config, 
    - `globalIgnores(["dist","src-tauri","public"])`, 
    - browser vs Node globals, 
    - spread `...tseslint.configs.recommended` (it's an array). 
    - Script: `npm run lint`.

**Commands**: npm run tauri dev / npm run build / npm run lint.
