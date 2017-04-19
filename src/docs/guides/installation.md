# Installation

The best way to start to use Inferno is by using [Create Inferno App](https://github.com/infernojs/create-inferno-app). You can get setup and running within a few minutes.

Alternatively, you can get started with Inferno using the [Inferno Boilerplate](https://github.com/infernojs/inferno-boilerplate) for a very simple setup.
For a more advanced example demonstrating how Inferno might be used, we recommend trying
out [Inferno Starter Project](https://github.com/nightwolfz/inferno-starter) by [nightwolfz](https://github.com/nightwolfz/).

Our recommended approach to installing and using Inferno is via NPM. Alternatively, you can insert Inferno into your site via `<script>` resources
directly from the CDN. Both approaches are outlined below.

## Core packages:

The core Inferno package contains almost everything you need to get going and works out the box with JSX (note: JSX will need a build step).

*NPM:*
```sh
npm install --save inferno
```
*Scripts:*
```html
<script src="https://unpkg.com/inferno@[version]/dist/inferno.js"></script>
<script src="https://unpkg.com/inferno@[version]/dist/inferno.min.js"></script>
```

### Support for ES2015 components:

The core Inferno package does not support ES2015 class components, only functional components, out of the box. Including
`inferno-component` will provide full ES2015 class support.

*NPM:*
```sh
npm install --save inferno-component
```
*Scripts:*
```html
<script src="https://unpkg.com/inferno-component@[version]/dist/inferno-component.js"></script>
<script src="https://unpkg.com/inferno-component@[version]/dist/inferno-component.min.js"></script>
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
Check out the [routing guide](routing) for more information on how this works.

*NPM:*
```sh
npm install --save inferno-router
```
*Scripts:*
```html
<script src="https://unpkg.com/inferno-router@[version]/dist/inferno-router.js"></script>
<script src="https://unpkg.com/inferno-router@[version]/dist/inferno-router.min.js"></script>
```

### Server-side rendering support:

Inferno is isomorphic, which means it can work on both the server (with Node JS) and the client. It can render your components on the server using the `inferno-server` package.
Check out the [server-side rendering guide](server-side-rendering) for more information on how this works.

*NPM:*
```sh
npm install --save inferno-server
```

## Installing a virtual DOM package

Behind the scenes, Inferno uses a concept called virtual DOM to create views/components that make up your UI. If you want to understand more about what
virtual DOM is, check the [virtual DOM guide](todo).

There are many different ways you can create virtual DOM with Inferno.

### JSX:

This package requires Babel 6+ and Node JS in order to compile JSX to JS.

```sh
npm install --save-dev babel-plugin-inferno
```

### Hyperscript:
*NPM:*
```sh
npm install --save inferno-hyperscript
```
*Scripts:*
```html
<script src="https://unpkg.com/inferno-hyperscript@[version]/dist/inferno-hyperscript.js"></script>
<script src="https://unpkg.com/inferno-hyperscript@[version]/dist/inferno-hyperscript.min.js"></script>
```

### createElement:
*NPM:*
```sh
npm install --save inferno-create-element
```
*Scripts:*
```html
<script src="https://unpkg.com/inferno-create-element@[version]/dist/inferno-create-element.js"></script>
<script src="https://unpkg.com/inferno-create-element@[version]/dist/inferno-create-element.min.js"></script>
```
