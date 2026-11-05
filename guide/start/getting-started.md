> For AI agents: the complete documentation index is available at /rstack-library-starter/llms.txt, the full documentation bundle is available at /rstack-library-starter/llms-full.txt.

# Getting started

## Project structure

- `src-docs/` — The documentation source directory, configured via `root` in `rstack.config.ts`.
- `src-docs/_nav.json` — The navigation bar configuration.
- `src-docs/guide/_meta.json` — The sidebar configuration for the guide section.
- `src-docs/public/` — Static assets directory.
- `theme/` — Optional custom theme directory, generated when you choose the custom theme scaffold.
- `rstack.config.ts` — The Rspress configuration file.

## Development

Start the local development server:

```bash
pnpm run dev:docs
```

:::tip

You can specify the port number or host with `--port` or `--host`, such as `pnpm run dev:docs -- --port 8080 --host 0.0.0.0`.

:::

## Production build

Build the site for production:

```bash
pnpm run build:docs
```

The generated site is written to `docs/`, as configured in `rstack.config.ts`.

## Preview

Preview the production build locally:

```bash
pnpm run preview:docs
```

## Next steps

- Learn how to use [MDX & React Components](/rstack-library-starter/guide/use-mdx/components.md) in your docs.
- Learn about [Code Blocks](/rstack-library-starter/guide/use-mdx/code-blocks/index.md) syntax highlighting and line highlighting.
- Learn about [Custom Containers](/rstack-library-starter/guide/use-mdx/container.md) for tips, warnings, and more.
- Explore the full [Rspress documentation](https://rspress.rs/) for advanced features.
