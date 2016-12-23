Installation
---

The best way to start to use Inferno is by using [Create Inferno App](https://github.com/infernojs/create-inferno-app). You can get setup and running within a few minutes.

Alternatively, you can get started with Inferno using the [Inferno Boilerplate](https://github.com/infernojs/inferno-boilerplate) for a very simple setup. 
For a more advanced example demonstrating how Inferno might be used, we recommend trying 
out [Inferno Starter Project](https://github.com/nightwolfz/inferno-starter) by [nightwolfz](https://github.com/nightwolfz/).

Our recommended approach to installing and using Inferno is via NPM. Alternatively, you can insert Inferno into your site via `<script>` resources
directly the CDN. Both approaches are outlined below.

Core packages:
---

The core package contains almost everything you need to get going and works out the box with JSX (note: JSX will need a build step).
If you do not plan to use JSX, make sure you add the correct package to do so (check the Creating Virtual DOM section below).

*NPM:*
```sh
npm install --save inferno@beta42
```

*CDN:*
Development:
https://cdnjs.cloudflare.com/ajax/libs/inferno/1.0.0-beta41/inferno.js

Production:
https://cdnjs.cloudflare.com/ajax/libs/inferno/1.0.0-beta41/inferno.min.js

### Support for ES2015 components:

The core Inferno package does not support ES2015 class components, only functional components, out of the box. Including
`inferno-component` will provide full ES2015 class support.

*NPM:*
```sh
npm install --save inferno-component@beta42
```

*CDN:*
Development:
https://cdnjs.cloudflare.com/ajax/libs/inferno/1.0.0-beta41/inferno-component.js

Production:
https://cdnjs.cloudflare.com/ajax/libs/inferno/1.0.0-beta41/inferno-component.min.js

### Compatibility with existing React apps

Inferno can support most React apps by using a compatibility layer that sits between React and Inferno. There is a cost in performance doing
this, but this can help improve the size and performance of existing React 15.x apps.

```sh
npm install --save-dev inferno-compat@beta42
```

Note: Make sure you read more about [`inferno-compat`](https://github.com/trueadm/inferno/tree/master/packages/inferno-compat) before using it.

### Routing support:

Inferno's router will provide basic routing support and is usable on both the server and client. For more information on how to use `inferno-router`, visit the project page.

*NPM:*
```sh
npm install --save inferno-router@beta42
```

*CDN:*
Development:
https://cdnjs.cloudflare.com/ajax/libs/inferno/1.0.0-beta41/inferno-router.js

Production:
https://cdnjs.cloudflare.com/ajax/libs/inferno/1.0.0-beta41/inferno-router.min,js

Creating Virtual DOM
---

#### JSX:
```sh
npm install --save-dev babel-plugin-inferno@beta17
```

#### Hyperscript:
```sh
npm install --save inferno-hyperscript@beta42
```

#### createElement:
```sh
npm install --save inferno-create-element@beta42
```