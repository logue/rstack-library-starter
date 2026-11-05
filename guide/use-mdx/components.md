> For AI agents: the complete documentation index is available at /rstack-library-starter/llms.txt, the full documentation bundle is available at /rstack-library-starter/llms-full.txt.

# MDX & React components

Rspress supports not only Markdown but also [MDX](https://mdxjs.com/), a powerful way to develop content.

## Markdown

MDX is a superset of Markdown, which means you can write Markdown files as usual. For example:

```md
# Hello world
```

## Use components

When you want to use React components in Markdown files, you should name your files with `.mdx` extension.

```mdx
// docs/index.mdx
import { CustomComponent } from './custom';

# Hello world

<CustomComponent />
```

## Use Rspress built-in components


**foo.js**

```js
console.log('foo');
```


**bar.js**

```js
console.log('bar');
```

