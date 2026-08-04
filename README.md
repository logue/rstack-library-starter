# Rstack Library starter template

[![TypeScript](https://img.shields.io/badge/TypeScript-7-%230074c1.svg)](http://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-11-pink.svg)](https://pnpm.io/)
[![Rsbuild](https://img.shields.io/badge/rsbuild-2-orange.svg)](https://rsbuild.rs/)
[![Rsblib](https://img.shields.io/badge/rslib-0.2-yellow.svg)](https://rsbuild.rs/)
[![X Follow](https://img.shields.io/twitter/follow/logue256?style=plastic)](https://twitter.com/logue256)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/logue?label=Sponsor&logo=github&color=ea4aaa)](https://github.com/sponsors/logue)

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get started

Build the library:

```bash
pnpm run build
```

Build for the web

```bash
pnpm run build:docs
```

Build the library in watch mode:

```bash
pnpm run dev
```

Build the library with Web in watch mode:

```bash
pnpm run dev:docs
```

Run tests:

```bash
pnpm run test
```

Run tests in watch mode:

```bash
pnpm run test:watch
```

## Development Environment

This template uses Biome as the default formatter.

### VSCode Configuration

The `.vscode/settings.json` sets [Biome](https://biomejs.dev/) as the formatter for this project only.
This does not affect your global VSCode configuration or other projects.

If you use Prettier globally, it will continue to work for other projects.

### TypeScript Configuration

Separate tsconfig files for different purposes:

- `tsconfig.node.json` - Bundler
- `tsconfig.rslib.json` - Library bundling
- `tsconfig.rsbuild.json` - Demo/documentation site
- `tsconfig.rstest.json` - Testing

Performance note:
exclude patterns should include nested directories and hidden files
for optimal type-checking performance:
<https://github.com/microsoft/TypeScript/wiki/Performance#misconfigured-include-and-exclude>

## Optional: 🪝 Git Hooks (Recommended for Teams)

If your team wants to enforce linting pre-commit,
consider setting up husky and lint-staged:

```bash
pnpm add -D husky lint-staged
npx husky install
```

Then add a `pre-commit` file to the `.husky` directory with:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm exec lint-staged
```

Alternatively, you can create it with:

```bash
npx husky add .husky/pre-commit "pnpm exec lint-staged"
```

## 🔒️ Safety Measures

This template has `"private": true` in `package.json` as a default safety measure.

**Before publishing to npm:**

1. Change `"private": false`
2. Ensure your package name is unique and correct
3. Review your `package.json` metadata (description, keywords, repository, etc.)

This prevents accidental npm publishes during development.

## 📝 Checklist

When using this template, follow the checklist to update your info properly.

- [ ] Change the author name in LICENSE
- [ ] Update package name and metadata in `package.json`
- [ ] Change `umdName` in `rslib.config.ts`
- [ ] **Set `"private": false`** (currently `true` as a safety measure)
- [ ] Review and adapt `AGENTS.md` for your project conventions
- [ ] Clean up the READMEs
- [ ] Publish your project.

## License

©2026 by Logue.
Licensed under the [MIT License](LICENSE).
