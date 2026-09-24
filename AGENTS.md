# AGENTS.md

This project uses Rstack CLI as its JS toolchain:

- Read the docs linked from `node_modules/rstack/docs/llms.txt` when needed
- Online docs: <https://rstack.rs/llms.txt>
- Run `rs -h` for CLI help

## Setup & Overview

- **Build tool**: Rslib (for build library), Rsbuild (for demo site)
- **Linter**: Rslint and Prettir
- **Testing**: Rstest
- **Language**: TypeScript 7
- **Package manager**: pnpm (do not use npm or yarn)

**Last updated**: 2026-09-24
**Verified with**: `package.json` in this repository

### Tool Versions

See `package.json` for authoritative dependency versions.

This guide assumes:

- TypeScript 7.0.2 or later
- rstack 0.8.0 or later

**If you encounter version-related issues, check `package.json` directly—it is the source of truth.**

### Dependency Management

- `minimumReleaseAge: 0` is set in `pnpm-workspace.yaml` to prevent unpredictable auto-injection of `minimumReleaseAgeExclude`
- This ensures version resolution is deterministic and reproducible across projects

### VS Code Setup

Recommended extensions are listed in `.vscode/extensions.json`.
Formatter and linter are configured in `.vscode/settings.json`:

- Default formatter: **Biome**
- Format on save: enabled
- Auto-fix on save: Rslint

When you open the project in VS Code, you'll be prompted to install recommended extensions.

## Project

### Project Structure

This project uses the Rstack CLI as a unified interface for the library,
demo application, tests, and linting:

- **Rslib** - Builds the library for distribution (ESM and UMD)
  - Command: `pnpm run build`
  - Output: `dist/` (published to npm)
- **Rsbuild** - Builds the demo application
  - Command: `pnpm run build:demo`
  - Output: `demo/` (for manual testing and validation)
- **Rstest** - Runs the test suite
  - Command: `pnpm run test`
- **Rslint and Biome** - Lints and formats the project
  - Command: `pnpm run lint`

All tool configuration is defined in `rstack.config.ts` through
`define.app`, `define.lib`, `define.test`, and `define.lint`.
TypeScript compiler options remain separated by use case:

- `tsconfig.rslib.json` - Library source and declaration generation
- `tsconfig.rsbuild.json` - Demo application
- `tsconfig.rstest.json` - Tests

### Development Workflow

- `pnpm run dev` - Start the demo development server with hot reload
- `pnpm run build` - Build the library for production
- `pnpm run build:demo` - Build the demo application
- `pnpm run preview` - Preview the built demo application

## Commands

- `pnpm run dev` - Start the demo development server with hot reload
- `pnpm run lint` - Lint and format all code (Biome + Rslint)
- `pnpm run analyze` - Analyze library build artifacts
- `pnpm run test` - Run tests at once
- `pnpm run test:watch` - Watch mode for tests
- `pnpm run clean` - Remove build artifacts
- `pnpm run clean:hard` - Remove build artifact and build caches

### Directory Structure & File Organization

- **`types/`** — Type-only definitions:
  - `.d.ts`: Type aliases, interfaces, generic types (no values)
  - `.ts`: Type definitions paired with default values or constants
- **`interfaces/`** — Use only when:
  - Multiple inheritance levels needed
  - Clear contract inheritance matters

### Facade Pattern: Hiding Complexity

This project employs the **Facade pattern**. The public API should be simple and focused;
internal complexity is intentionally hidden.

- Users interact with high-level operations (read/write files, transform data)
- Implementation details (binary parsing, encoding, version handling) are internal
- This reduces cognitive load and provides stable contracts

Example: [`symbol-art-parser`](https://github.com/logue/symbol-art-parser) exposes only `.sar` ↔ JSON conversions, hiding binary protocol details.

### API Design Principle

Prioritize external API clarity over internal implementation patterns.
Hidden complexity is acceptable if it provides users with simple, intuitive interfaces.

This may include using the same identifier for both type and value when it improves ergonomics.

## Testing

This project uses **Rstest** for testing.

### Running Tests

- `pnpm run test` - Run all tests
- `pnpm run test:watch` - Run tests in watch mode

### Test Structure & Naming

Tests are co-located with source code in `__tests__/` directories:

```plain
src/
  components/
    Button.ts
    __tests__/
      Button.spec.ts
  utils/
    helpers.ts
    __tests__/
      helpers.spec.ts
```

Naming convention:

- Test files: `[SourceFile].spec.ts`
- Co-location makes tests easy to find and maintain

### Test Code Style

- Use descriptive test names
- Group related tests with `describe`
- Use `it` or `test` for individual cases
- Clean up resources after tests (`afterEach`, `afterAll`)
- Follow the same TypeScript rules as non-test code

## Markdown Generation

When generating markdown (documentation, AGENTS.md, etc.):

- **Preserve code formatting**: `__` should NOT be converted to bold
  within inline code or code blocks
- Use backticks for inline code: `` `__tests__` ``
- Code blocks will preserve literal `__` as-is
- This applies to Node.js globals (`__dirname`, `__filename`)
  and directory names (`__tests__`, `__mocks__`, etc.)

Example:

- ✓ Tests in `` `__tests__` `` directories
- ✗ Tests in `**tests**` directories (incorrect)
