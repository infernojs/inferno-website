# Upgrading to Inferno 10

Inferno 10 moves work from the runtime to the compiler. The JSX plugins know the shape of an element's children when they compile it, so they now write it into the vNode flags, and Inferno no longer computes it for every vNode at runtime. A vNode has one field less, delegated event handlers take less memory, and many allocations are gone from rendering, normalization and keyed diffing.

This release also rewrites `inferno-animation`, adds custom navigation confirmation to `inferno-router`, and fixes many bugs in core, hydration, server rendering, the router, compat and the MobX bindings.

Read the full [release notes](https://github.com/infernojs/inferno/releases/tag/v10.0.0) and the [migration guide](https://github.com/infernojs/inferno/blob/master/documentation/v10-migration.md) for all the details.

## Upgrading

1. Update every `inferno*` package to 10.
2. Update your JSX plugin to version 10. Version 10 of `babel-plugin-inferno` and `ts-plugin-inferno` requires Node.js 24 or newer to compile JSX. `ts-plugin-inferno` depends on TypeScript 6.
3. Compile all your JSX again, including dependencies that ship precompiled JSX.
4. If you write your own `componentWillMove` or `onComponentWillMove` hooks, add `import 'inferno-animation'`.
5. Compile your own components to ES2015 or newer. A component class that calls `Component` as an ES5 function, such as TypeScript's `target: "ES5"` output, can no longer extend it.

<table>
  <thead>
    <tr><th>Plugin</th><th>Inferno 9 and older</th><th>Inferno 10</th></tr>
  </thead>
  <tbody>
    <tr><td><a href="https://github.com/infernojs/babel-plugin-inferno" target="_blank" rel="noopener"><code>babel-plugin-inferno</code></a></td><td>7.x</td><td>10.x</td></tr>
    <tr><td><a href="https://github.com/infernojs/ts-plugin-inferno" target="_blank" rel="noopener"><code>ts-plugin-inferno</code></a></td><td>7.x</td><td>10.x</td></tr>
    <tr><td><a href="https://github.com/infernojs/swc-plugin-inferno" target="_blank" rel="noopener"><code>swc-plugin-inferno</code></a></td><td>3.x</td><td>10.x</td></tr>
  </tbody>
</table>

From version 10 on, the major version of each JSX plugin matches the major version of Inferno. The plugins do not declare `inferno` as a peer dependency, so your package manager will not warn you about a mismatch.

If you use SWC and the compiled code still calls `createComponentVNode` or `createTextVNode` after the upgrade, SWC is running the old plugin from its cache: delete the `.swc` directory of your project (or `jsc.experimental.cacheRoot`) and build again. See [swc-plugin-inferno](/docs/api/swc-plugin-inferno) and [babel-plugin-inferno](/docs/api/babel-plugin-inferno) for the changes in the plugins.

## Breaking changes

- **JSX must be compiled by the v10 plugins.** `VNodeFlags` have new values, so JSX compiled by an older plugin renders elements such as `<svg>`, `<input>`, `<select>` and `<textarea>` wrong. This includes npm packages that ship JSX compiled for Inferno 9.
- **`VNodeFlags` have new values.** Code compiled with `tsc` against `inferno-vnode-flags` 9 has the old numbers inlined and must be compiled again. Never write flag numbers by hand, and update numbers passed to `$Flags`. See [inferno-vnode-flags](/docs/api/inferno-vnode-flags).
- **`vNode.childFlags` has been removed.** The shape of the children is stored in bits of `vNode.flags`. Test them with `VNodeFlags.HasKeyedChildren` and the other `Has*Children` bits, or get the old `ChildFlags` value with the new `getChildFlags(vNode)` export.
- **`vNode.isValidated` has been removed.** It is the development-only `VNodeFlags.Validated` bit now.
- **`$ReCreate` and `VNodeFlags.ReCreate` have been removed.** Change the key of an element to re-create it. The v10 plugins report `$ReCreate` as a build error.
- **The JSX plugins report more errors.** A child flag that the children written in JSX cannot have, such as `$HasVNodeChildren` on two children, and a `ref` without a value are build errors.
- **Delegated event handlers are stored on the element.** `$EV` is now a bitmask, and each handler is in its own property of the element, such as `$onClick`. This only matters to tools that read Inferno's internal DOM properties.
- **Move animation hooks have new semantics.** Custom `componentWillMove` and `onComponentWillMove` hooks are only called when the app has imported `inferno-animation`, and they are called for every item that a keyed update keeps, before anything is patched. See [inferno-animation](/docs/api/inferno-animation).
- **Modern bundles, and `Component` is a native class in all of them.** All bundles are compiled for Chrome 107, Edge 107, Firefox 84 (KaiOS 3) and Safari 16. The CommonJS and UMD bundles keep modern syntax such as `const`, arrow functions, spread and classes. A component class that calls `Component` as an ES5 function, such as TypeScript's `target: "ES5"` output, throws `TypeError: Class constructor Component cannot be invoked without 'new'`.

```jsx
// v9
<div $ReCreate>{content}</div>

// v10: change the key whenever the element must be re-created
<div key={version}>{content}</div>
```

## Deprecations

`newVNode`, `newComponentVNode`, `newTextVNode` and `newFragment` replace `createVNode`, `createComponentVNode`, `createTextVNode` and `createFragment`. The new factories take the shape of the children as a bit in `flags`, so Inferno uses the flags as given. The v10 JSX plugins emit the new factories.

The old factories are marked `@deprecated` and keep working. They turn their `childFlags` argument into its bit and call the new factories.

```js
import { newVNode, newFragment } from 'inferno';
import { VNodeFlags } from 'inferno-vnode-flags';

// v9: createVNode(VNodeFlags.HtmlElement, 'div', 'foo', 'text', ChildFlags.HasTextChildren)
newVNode(
  VNodeFlags.HtmlElement | VNodeFlags.HasTextChildren,
  'div',
  'foo',
  'text',
);

// v9: createFragment(children, ChildFlags.HasKeyedChildren, key)
newFragment(VNodeFlags.Fragment | VNodeFlags.HasKeyedChildren, children, key);
```

When you copy flags from another vNode, clear the copied state first with `flags & VNodeFlags.ClearOnCopy`, then add the new child bit. See the [Inferno API](/docs/api/inferno) for the new factories.

## New features

**Custom navigation confirmation in `inferno-router`.** `Router`, `BrowserRouter`, `HashRouter` and `MemoryRouter` accept a `getUserConfirmation` prop, so `<Prompt>` can use your own in-page dialog instead of `window.confirm`, which browsers such as iOS Safari can suppress. See [Inferno Router](/docs/api/inferno-router).

**Rewritten `inferno-animation`.** The public API is the same. Items that are pushed aside by a moved item animate too, a move interrupted by another update continues from where it is on screen, and when leaving items are removed, the remaining items slide into the gap. The move engine is dormant until a component with a move hook mounts, and apps that don't import `inferno-animation` don't pay for move support. `inferno-animation/index.css` is exported from the package.

**More boolean attributes.** `async`, `defer`, `disablePictureInPicture`, `disableRemotePlayback`, `formNoValidate`, `inert`, `itemScope`, `noModule` and `playsInline` are now boolean attributes. Boolean attributes are written as attributes with their lowercase name, so both spellings work, for example `readOnly` and `readonly`. `hidden` and `capture` keep a string value such as `hidden="until-found"`. `checked`, `indeterminate`, `muted` and `selected` hold the current state of the element, so they are still set as properties.

**`autoFocus` works on mount.** Props are applied to an element before it is inserted into the document, so `autoFocus` focuses the element when it mounts.

**TypeScript.** `createElement` has separate overloads for DOM elements, function and `forwardRef` components, and class components. Lifecycle hooks of function components may be `null`, and a multiple `<select>` accepts `number[]` as its value. The typings of `inferno-compat`, `inferno-extras`, `inferno-mobx` and `inferno-redux` are more accurate.

## Performance

- **Smaller vNodes.** Each vNode is 4 bytes smaller in Chrome and 32 bytes smaller in Firefox.
- **Child flags at compile time.** The JSX plugins write the shape of the children into the flags as one number, so the runtime does no work to combine them.
- **Delegated events.** An element with one delegated handler takes 16 bytes less in Chrome, and unmounting an element visits only the events it registered.
- **Keyed diffing.** The key index is a `Map`, which removes 45–50 KiB of garbage per "replace all rows" in js-framework-benchmark.
- **vNode reuse.** A hoisted vNode, or the root passed to `render()` again, is no longer cloned when it is rendered again in the same position, and a component that renders `props.children` no longer allocates new vNodes for them on every update.
