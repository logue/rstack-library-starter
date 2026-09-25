# Rstack Library starter template

[![TypeScript](https://img.shields.io/badge/TypeScript-7-%230074c1.svg)](http://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-12-pink.svg)](https://pnpm.io/)
[![Rstack](https://img.shields.io/badge/rsbuild-0.8.0-orange.svg)](https://rstack.rs/)
[![X Follow](https://img.shields.io/twitter/follow/logue256?style=plastic)](https://x.com/logue256)
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
pnpm run build:demo
```

Build the library in watch mode:

```bash
pnpm run dev
```

Run tests:

```bash
pnpm run test
```

Run tests in watch mode:

```bash
pnpm run test:watch
```

Run build analysis. (Rsdoctor)

```bash
pnpm run analyze
```

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

Use rstack hooks: <https://rstack.rs/guide/cli/hooks>

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
- [ ] Change `umdName` in `rstack.config.ts`
- [ ] **Set `"private": false`** (currently `true` as a safety measure)
- [ ] Review and adapt `AGENTS.md` for your project conventions
- [ ] Clean up the READMEs
- [ ] Publish your project.

## License

©2026 by Logue.
Licensed under the [MIT License](LICENSE).
