# Installation

If you're building something bigger than a small hobby project, why not kick things off with a bang?
Start your InfernoJs adventure using the [inferno-swc-example](https://github.com/infernojs/inferno-swc-example).
It has the latest and greatest tech to supercharge your next project!

If you want one-liner and get coding in few seconds you can still use the old [Create Inferno App (legacy)](https://github.com/infernojs/create-inferno-app). You can get setup and running within a few minutes.
Just run following command (requires npm v5.2+)

```sh
npx create-inferno-app my-app
cd my-app
npm start
```

Note that Create Inferno App compiles JSX with an older version of `babel-plugin-inferno`, which does not work with Inferno 10.
Whichever template you start from, make sure it uses Inferno 10 together with version 10 of its JSX plugin, see the JSX plugin versions below.

Our recommended approach to installing and using Inferno is via NPM. Alternatively, you can insert Inferno into your site via `<script>` resources
[directly from the CDN](using-cdn).

## Core packages:

The core Inferno package contains almost everything you need to get going and works out the box with JSX (note: JSX will need a build step).

```sh
npm install --save inferno
```

### Compatibility with existing React apps

Inferno can support most React apps by using a compatibility layer that sits between React and Inferno. There is a cost in performance doing
this, but this can help improve the size and performance of existing React 15.x apps.

```sh
npm install --save-dev inferno-compat
```

Note: Make sure you read more about [`inferno-compat`](https://github.com/infernojs/inferno/tree/master/packages/inferno-compat) before using it.

### Routing support:

Inferno's router will provide basic routing support and is usable on both the server and client. For more information on how to use `inferno-router`, visit the project page.
Check out the [routing guide](../api/inferno-router) for more information on how this works.

```sh
npm install --save inferno-router
```

### Server-side rendering support:

Inferno is isomorphic, which means it can work on both the server (with Node JS) and the client. It can render your components on the server using the `inferno-server` package.
Check out the [server-side rendering guide](server-side-rendering) for more information on how this works.

```sh
npm install --save inferno-server
```

## Installing a virtual DOM package

Behind the scenes, Inferno uses a concept called virtual DOM to create views/components that make up your UI.

There are many different ways you can create virtual DOM with Inferno.

Inferno 10 needs JSX compiled by version 10 of its JSX plugins. From version 10 on, the major version of each JSX plugin matches the major version of Inferno: use plugin 10.x with Inferno 10.x, plugin 11.x with Inferno 11.x, and so on.
The plugins do not declare `inferno` as a peer dependency, so your package manager will not warn you about a mismatch. Update Inferno and the JSX plugin together.

<table>
  <thead>
    <tr><th>Plugin</th><th>Inferno 9 and older</th><th>Inferno 10</th></tr>
  </thead>
  <tbody>
    <tr><td><a href="https://github.com/infernojs/swc-plugin-inferno" target="_blank" rel="noopener"><code>swc-plugin-inferno</code></a></td><td>3.x</td><td>10.x</td></tr>
    <tr><td><a href="https://github.com/infernojs/ts-plugin-inferno" target="_blank" rel="noopener"><code>ts-plugin-inferno</code></a></td><td>7.x</td><td>10.x</td></tr>
    <tr><td><a href="https://github.com/infernojs/babel-plugin-inferno" target="_blank" rel="noopener"><code>babel-plugin-inferno</code></a></td><td>7.x</td><td>10.x</td></tr>
  </tbody>
</table>

JSX compiled by an older plugin does not work with Inferno 10, so compile all your JSX again after upgrading, including dependencies that ship precompiled JSX.

### TSX or JSX
[swc-plugin-inferno](https://github.com/infernojs/swc-plugin-inferno) requires SWC compiler, it can compile both TSX and JSX formats, up to 100X faster than `ts-plugin-inferno` or `babel-plugin-inferno`.
See the [swc-plugin-inferno docs](/docs/api/swc-plugin-inferno) for how to configure it.

```sh
npm install --save-dev @swc/core swc-plugin-inferno
```

### TSX:
[ts-plugin-inferno](https://github.com/infernojs/ts-plugin-inferno) requires Typescript compiler TSC and Node JS in order to compile TSX to JS. Version 10 requires TypeScript 6 and Node.js 24 or newer.

```sh
npm install --save-dev ts-plugin-inferno typescript
```

### JSX:

[babel-plugin-inferno](https://github.com/infernojs/babel-plugin-inferno) requires Babel and Node JS in order to compile JSX to JS. Version 10 requires Node.js 24 or newer.
See the [babel-plugin-inferno docs](/docs/api/babel-plugin-inferno) for how to configure it.

```sh
npm install --save-dev babel-plugin-inferno
```

It is recommended to use JSX or TSX syntax with Inferno, so you don't have to manage the lower level details of vNodes.
However, if for some reason you can't use the above compiler tools, you can manually construct vNodes using following packages: 

### Hyperscript:

```sh
npm install --save inferno-hyperscript
```

### createElement:

```sh
npm install --save inferno-create-element
```

## Compile target

Since Inferno 10, `Component` is a native class and all Inferno bundles use modern syntax, such as `const`, arrow functions, spread and classes.
Compile your own components to ES2015 or newer: TypeScript `target` `ES2015` or later, or Babel targets that don't need `@babel/plugin-transform-classes`.
A component class that calls `Component` as an ES5 function, such as TypeScript's `target: "ES5"` output, throws `TypeError: Class constructor Component cannot be invoked without 'new'`.
