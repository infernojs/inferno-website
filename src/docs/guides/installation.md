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

Note: Make sure you read more about [`inferno-compat`](https://github.com/trueadm/inferno/tree/master/packages/inferno-compat) before using it.

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

### TSX or JSX
[swc-plugin-inferno](https://github.com/infernojs/swc-plugin-inferno) requires SWC compiler, it can compile both TSX and JSX formats, up to 100X faster than `ts-plugin-inferno` or `babel-plugin-inferno`.

### TSX:
[ts-plugin-inferno](https://github.com/infernojs/ts-plugin-inferno) requires Typescript compiler TSC and Node JS in order to compile TSX to JS.

```sh
npm install --save-dev ts-plugin-inferno
```

### JSX:

This package requires Babel 6+ and Node JS in order to compile JSX to JS.

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
