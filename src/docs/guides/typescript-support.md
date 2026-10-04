# TypeScript Support

The Inferno project and all its modules are written in TypeScript. The typings are included in the distribution. The main Inferno project source can be checked out and imported directly into your TS application.

## Example Repository

Don't forget to have a look at the [`inferno-typescript-example` repository](https://github.com/infernojs/inferno-typescript-example) which lays out the structure of a sample component. The example uses Webpack for compiling your distribution files and a sample `tsconfig` file.

## Compiling TSX with ts-plugin-inferno

[ts-plugin-inferno](https://github.com/infernojs/ts-plugin-inferno) is a plugin for the TypeScript compiler that compiles TSX directly to Inferno's `newVNode` calls instead of `createElement` calls.
Use version 10 of the plugin with Inferno 10. It requires TypeScript 6 and Node.js 24 or newer. For Inferno 9 and older, keep using version 7 of the plugin.

```sh
npm install --save-dev ts-plugin-inferno typescript
```

```javascript
const transformInferno = require('ts-plugin-inferno').default

// Typescript compiler options, for example in ts-loader
options: {
    getCustomTransformers: () => ({
        after: [transformInferno()],
    }),
},
```

Examples for webpack, Rollup and FuseBox can be found in the [examples folder](https://github.com/infernojs/ts-plugin-inferno/tree/master/examples) of the repository.
[swc-plugin-inferno](/docs/api/swc-plugin-inferno) can compile TSX too, with SWC's TypeScript parser.

Set `compilerOptions.target` to `ES2015` or newer. Since Inferno 10, `Component` is a native class, and a component class compiled to an ES5 function cannot extend it.

## Why Typescript?

Typescript has been a pleasure to use on the Inferno project. During development we found that it provided many benefits. According to core team developers, TypeScript saved the project from a lot of potentially difficult bugs. Its type safety, fast compiler and language features worked wonderfully for the Inferno team.
