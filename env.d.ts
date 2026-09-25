/* rslint-disable @typescript-eslint/no-explicit-any */

interface ImportMetaEnv {
  /** package.json version value. */
  readonly APP_VERSION: string;
  /** Last build date */
  readonly BUILD_DATE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/*
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // rslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/ban-types
  const component: DefineComponent<
    Record<string, never>,
    Record<string, never>,
    any
  >;
  export default component;
}

// Example when you are using rsbuild-plugin-yaml, comment out below:
declare module '*.yml' {
  const content: Record<string, any>;
  export default content;
}
declare module '*.yaml' {
  const content: Record<string, any>;
  export default content;
}
*/
