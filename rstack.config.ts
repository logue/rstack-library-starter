import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import { define } from 'rstack';

import { readFileSync } from 'node:fs';

import markdownPlugin from '@eslint/markdown';
import prettierPlugin from 'eslint-config-prettier';

/**
 * The UMD name is used for the global variable name when the library
 * is included via a <script> tag.
 * DO NOT use kebab-case or snake_case for the UMD name.
 * Use camelCase or PascalCase instead.
 *
 * For example, if your library is called "my-library", you might use
 * "MyLibrary" as the UMD name.
 * Then, name might be used in the following way:
 *
 * @example
 * <script src="https://cdn.jsdelivr.net/npm/your-library@1.0.0/dist/index.umd.js"></script>
 * <script>
 *   const myLibrary = window.umdName;
 * </script>
 */
const umdName = 'RstackLibrary'; // CHANGE THIS to your library's global variable name.

/** Parse package.json content */
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8')) as {
  name: string;
  description: string;
  author: {
    name: string;
    email: string;
  };
  license: string;
  version: string;
  homepage: string;
};

const buildDate = new Date().toISOString();
const bannerText = `/**
* ${pkg.name}
*
* @description ${pkg.description}
* @author ${pkg.author.name} <${pkg.author.email}>
* @license ${pkg.license}
* @version ${pkg.version}
* @see {@link ${pkg.homepage}}
*/
`;

const createBuildDefines = () => ({
  'import.meta.env.APP_VERSION': JSON.stringify(pkg.version),
  'import.meta.env.BUILD_DATE': JSON.stringify(buildDate)
});

const createRsdoctorPlugins = () =>
  process.env.RSDOCTOR === 'true' ? [new RsdoctorRspackPlugin()] : [];

const IGNORE_PATTERNS = [
  // AI agents skill docs.
  '**/.agents/**',
  // Build intermediate artifacts.
  '**/.cache/**',
  '**/.data/**',
  '**/.mf/**',
  '**/.nitro/**',
  '**/.nuxt/**',
  '**/.output/**',
  '**/.rstack/**',
  // Test coverage reports.
  '**/coverage/**',
  '**/reports',
  '**/test-results',
  // Build artifacts.
  '**/demo/**',
  '**/dist-ssr/**',
  '**/dist/**',
  '**/docs/**',
  '**/storybook-static/**',
  // Grit (Biome Rules) source artifacts.
  '**/grit/**',
  // Node modules.
  '**/node_modules/**'
];

const APP_FILES = [
  '**/*.{ts,mts,tsx,js,mjs,jsx,json,jsonc,yml,yaml,mdx,vue,astro,svelte}'
];
const TEST_FILES = ['**/*.{test,spec}.{ts,mts,tsx,js,mjs,jsx}'];
const DOC_FILES = ['**/*.{md,mdx}'];

/**
 * Rslib Config
 * @see {@link https://rslib.rs/config/ | Rslib Config}
 */
define.lib({
  plugins: [pluginTypeCheck()],
  banner: {
    css: bannerText,
    dts: bannerText,
    js: bannerText
  },
  bundle: true,
  syntax: 'esnext',
  output: {
    target: 'node',
    autoExternal: true
  },
  lib: [
    {
      format: 'esm',
      dts: {
        // isolated: true,  // SWC fast_dts
        bundle: false,
        autoExtension: true,
        tsgo: true // Enable TypeScript 7 native compiler
      },
      output: {
        filename: {
          js: 'index.es.js'
        },
        sourceMap: true
      }
    },
    {
      // Compatibility-only browser build. npm consumers should prefer the ESM entry
      // above, which is the default package export and the primary distribution target.
      format: 'umd',
      output: {
        cleanDistPath: false,
        filename: {
          js: 'index.umd.js'
        },
        minify: true,
        sourceMap: false
      },
      syntax: 'es2020',
      umdName
    }
  ],
  source: {
    define: createBuildDefines(),
    tsconfigPath: './tsconfig.rslib.json'
  },
  tools: {
    rspack: {
      plugins: createRsdoctorPlugins()
    }
  }
});

/**
 * Rsbuild (Demo application) config
 * @see {@link https://rsbuild.rs/config | Rsbuild Config}
 */
define.app({
  plugins: [pluginTypeCheck()],
  output: {
    assetPrefix: './',
    distPath: {
      root: 'demo'
    },
    filenameHash: true
  },
  html: {
    template: './src-demo/index.html'
  },
  source: {
    define: createBuildDefines(),
    entry: {
      index: './src-demo/index.ts'
    },
    include: ['./src'],
    tsconfigPath: './tsconfig.rsbuild.json'
  },
  tools: {
    rspack: {
      plugins: createRsdoctorPlugins()
    }
  }
});

/**
 * Rspress Config
 * To use this, you will need to install @rspress/core separately.
 *
 * @see {@link https://rstack.rs/guide/cli/doc | Doc Config}
 */
/*
define.doc({
  root: 'docs',
  title: 'My Site',
});
*/

/**
 * Rstest Config
 * @see {@link https://rstest.rs/config/ | Rstest Config}
 */
define.test({
  source: {
    tsconfigPath: './tsconfig.rstest.json'
  }
});

/**
 * Rslint Config
 * @see {@link https://rslint.rs/config/ | Rslint Config}
 */
define.lint(
  ({
    globals,
    // See https://rslint.rs/config/rules-and-presets
    js,
    ts,
    reactPlugin,
    reactHooksPlugin,
    importPlugin,
    // nodePlugin,
    promisePlugin,
    // jestPlugin,
    rstestPlugin,
    unicornPlugin,
    jsxA11yPlugin
  }) => [
    {
      ignores: IGNORE_PATTERNS,
      languageOptions: {
        lobals: {
          ...globals.browser,
          ...globals.nodeBuiltin
        },
        parserOptions: {
          project: ['./tsconfig.json']
        }
      }
    },

    // Base TypeScript recommended sets.
    js.configs.recommended,
    ts.configs.strictTypeChecked,
    ts.configs.stylisticTypeChecked,
    promisePlugin.configs.recommended,
    unicornPlugin.configs.recommended,
    // nodePlugin.configs.recommended,
    reactPlugin.configs.recommended,
    reactHooksPlugin.configs.recommended, // Comment out this line when using Vue.
    jsxA11yPlugin.configs.recommended,

    {
      ...importPlugin.configs.recommended,
      files: APP_FILES,
      plugins: ['@typescript-eslint', 'import', 'promise', 'unicorn'],
      rules: {
        ...importPlugin.configs.recommended.rules,
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'array'
          }
        ],

        // Keep project lint behavior aligned with the previous baseline.
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/consistent-generic-constructors': [
          'error',
          'type-annotation'
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',

        // Ignore intentionally unused identifiers with underscore prefix.
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            ignoreRestSiblings: true,
            varsIgnorePattern: '^_'
          }
        ],
        '@typescript-eslint/triple-slash-reference': 'off',
        // Use them according to the context (see AGENTS.md).
        '@typescript-eslint/consistent-type-definitions': 'off',

        // Using parent traversal is prohibited in app code. Use @/ alias instead.
        'import/no-relative-parent-imports': [
          'error',
          {
            ignore: ['^@/']
          }
        ],
        'import/order': [
          'error',
          {
            alphabetize: {
              order: 'asc'
            },
            groups: [
              'builtin',
              'external',
              'parent',
              'sibling',
              'index',
              'object',
              'type'
            ],
            'newlines-between': 'always',
            pathGroups: [
              {
                group: 'builtin',
                pattern:
                  '{@rsbuild/**,@rsdoctor/**,@rslint/**,@rslib/*,@rspack/**,@rstest/**,rstack,rstack/**}',
                position: 'before'
              },
              {
                group: 'internal',
                pattern: '{@/**}',
                position: 'before'
              }
            ],
            pathGroupsExcludedImportTypes: ['builtin']
          }
        ],
        // File names should, in principle, be in PascalCase, with some exceptions.
        'unicorn/filename-case': 'off'
      },
      settings: {
        'import/resolver': {
          'eslint-import-resolver-custom-alias': {
            alias: {
              '@': './src',
              '~': './node_modules'
            },
            extensions: [
              '.js',
              '.ts',
              '.json',
              '.jsonc',
              '.yml',
              '.yaml',
              '.jsx',
              '.tsx',
              '.vue',
              '.svelte',
              '.astro'
            ]
          },
          node: true,
          typescript: true
        }
      }
    },

    {
      // Test files intentionally import from parent directories.
      files: TEST_FILES,
      ...rstestPlugin.configs.recommended,
      rules: {
        // The demo data for the test code should preferably be of type `any`.
        '@typescript-eslint/no-explicit-any': 'warn',
        'import/no-relative-parent-imports': 'off'
      }
    },

    {
      files: DOC_FILES,
      plugins: ['markdown'],
      ...markdownPlugin.configs.recommended
    },
    prettierPlugin.rules
  ]
);

/**
 * Prettier Configs
 * @see {@link https://prettier.io/docs/options | Prettier Options}
 */
define.fmt({
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  // Bellow is rstack options
  // see https://rstack.rs/guide/formatting
  ignorePatterns: IGNORE_PATTERNS,
  sortPackageJson: true
});
