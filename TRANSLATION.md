# Documentation Translation Guidelines

This document defines strict rules for translating Rspress documentation under `src-docs/`.
AI agents MUST read this file before creating or editing any files in `src-docs/`.

## 1. Scope & Directory Boundaries

- **Managed Scope**: `src-docs/en/` and `src-docs/ja/` ONLY.
- **Excluded (Do NOT Touch)**: `src-demo/`, `src-docs/public/demo/`, `src/`, `theme/`.
- **Source of Truth**: `src-docs/en/` (or `src-docs/ja/` — _set your primary locale_).
- **Strict Mirroring**: Target locale directories MUST mirror the exact file paths, `kebab-case` filenames, and `_meta.json` structure of the primary locale.

## 2. Structural Integrity Rules (Anti-Drift)

To prevent structural drift across languages and keep `llms.txt` clean:

1. **1-to-1 Block Parity**: Keep the exact same number and hierarchy of headings (`#`, `##`, `###`), list items, tables, callouts (`:::`), and code blocks as the source file. Never merge or split paragraphs.
2. **No Raw HTML**: Do NOT use raw HTML tags (`<br>`, `<div>`, `<span>`, etc.) inside Markdown files unless embedding the Playground iframe. Use pure Markdown syntax.
3. **Explicit Anchor IDs**: When linking to headings, preserve anchor IDs or use explicit ASCII anchor syntax (`## 日本語見出し {#english-anchor}`) so links never break across locales.
4. **Code & Identifiers**: Wrap all CLI commands, file paths, config keys, and API names in backticks (`` ` ``). Never translate content inside backticks or fenced code blocks (except explanatory comments when necessary).

## 3. File-Specific Rules

- **Frontmatter**: Translate ONLY `title` and `description`. Keep `pageType`, `sidebar`, `outline`, etc. untouched.
- **`_meta.json`**: Translate ONLY the `"label"` property. NEVER alter `"name"`, `"type"`, `"dir"`, or `"file"`.
- **Rspress Callouts**: Keep directive keywords (`:::tip`, `:::info`, `:::warning`, `:::danger`, `:::details`) in English; translate only the optional custom title.

## 4. Style & Terminology

> [!NOTE]
> This is example.

- **Japanese (`ja`)**:
  - Use polite "Desu/Masu" (です・ます調) consistently.
  - Use full-width punctuation (`。`, `、`). Never use half-width commas/periods in Japanese sentences.
  - Do NOT put spaces between Japanese characters and ASCII words (e.g., `Rspressの設定`, not `Rspress の 設定`).
  - Standardize katakana long vowels (e.g., `サーバー`, `ユーザー`, `レイヤー`, `パラメーター`).
- **Do-Not-Translate (DNT)**: `Rstack`, `Rspack`, `Rsbuild`, `Rslib`, `Rspress`, `Oxc`, `oxlint`, `oxfmt`, `Playground`, `llms.txt`, `_meta.json`.
