# SWC Plugin Inferno

[swc-plugin-inferno](https://github.com/infernojs/swc-plugin-inferno) is a plugin for [SWC](https://swc.rs/) that transforms JSX and TSX code in your projects to Inferno compatible virtual DOM.
It is the recommended way to compile JSX for Inferno: SWC can compile both TSX and JSX, up to 100X faster than `ts-plugin-inferno` or `babel-plugin-inferno`.

Like the other Inferno JSX plugins, it outputs highly optimized Inferno specific `newVNode` calls instead of `createElement` calls, and checks the shape of the children during compilation to reduce work at runtime.
The plugin generates the same code as [babel-plugin-inferno](/docs/api/babel-plugin-inferno), and the test suite of babel-plugin-inferno is ported to its repository.

## Inferno versions

Version 10 of the plugin compiles JSX for Inferno 10. It calls `newVNode`, `newComponentVNode`, `newFragment` and `newTextVNode`, and writes the flags of each vNode, including the shape of its children, as one number. For example `<div>Hello</div>` becomes `newVNode(3, "div", null, "Hello")`: `HtmlElement` (1) and `HasTextChildren` (2).

For Inferno 9 and older, use version 3.x of the plugin. Inferno 10 numbers its vNode flags differently, so code compiled by version 3.x has to be compiled again for Inferno 10.

From version 10 on, the major version of the plugin matches the major version of Inferno: use plugin 10.x with Inferno 10.x, plugin 11.x with Inferno 11.x, and so on. The plugin does not declare `inferno` as a peer dependency, so your package manager does not check this for you.

<table>
  <thead>
    <tr><th>JSX</th><th>3.x (Inferno 9)</th><th>10.x (Inferno 10)</th></tr>
  </thead>
  <tbody>
    <tr><td><code>&lt;div&gt;Hello&lt;/div&gt;</code></td><td><code>createVNode(1, "div", null, "Hello", 16)</code></td><td><code>newVNode(3, "div", null, "Hello")</code></td></tr>
    <tr><td><code>&lt;div ref={a} /&gt;</code></td><td><code>createVNode(1, "div", null, null, 1, null, null, a)</code></td><td><code>newVNode(17, "div", null, null, null, null, a)</code></td></tr>
    <tr><td><code>&lt;Foo /&gt;</code></td><td><code>createComponentVNode(2, Foo)</code></td><td><code>newComponentVNode(0, Foo)</code></td></tr>
    <tr><td><code>&lt;&gt;Test&lt;/&gt;</code></td><td><code>createFragment([createTextVNode("Test")], 4)</code></td><td><code>newFragment(260, [newTextVNode("Test")])</code></td></tr>
  </tbody>
</table>

Children that are only known at runtime, such as `{expression}`, get no child bit and are normalized by Inferno. Components get `ComponentUnknown`, which is 0.
`className={null}`, `key={null}`, `ref={null}` and a `{null}` fragment child are left out of the generated calls.
See [inferno-vnode-flags](/docs/api/inferno-vnode-flags) for all the flag values.

The plugin is built with `swc_core` 81 and tested end to end with `@swc/core` 1.16.0. See [plugins.swc.rs](https://plugins.swc.rs) for the `@swc/core` versions that can load it.

## How to install

```bash
npm install --save-dev @swc/core swc-plugin-inferno
```

Install the major version that matches your `inferno` version. For Inferno 9 and older:

```bash
npm install --save-dev swc-plugin-inferno@3
```

## How to use

Enable JSX in the parser and add `swc-plugin-inferno` to `jsc.experimental.plugins` in your `.swcrc` configuration:

```json
{
  "jsc": {
    "parser": {
      "syntax": "ecmascript",
      "jsx": true
    },
    "experimental": {
      "plugins": [
        ["swc-plugin-inferno", {}]
      ]
    }
  }
}
```

For TSX, use the TypeScript parser instead:

```json
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": true
    },
    "experimental": {
      "plugins": [
        ["swc-plugin-inferno", {}]
      ]
    }
  }
}
```

For the rest of the settings see the [SWC configuration docs](https://swc.rs/docs/configuration/compilation).
SWC compiles to `es5` by default. Inferno 10's own bundles use modern syntax and are compiled for Chrome 107, Edge 107, Firefox 84 and Safari 16, so you can set `jsc.target` to `es2015` or newer and skip SWC's class helpers.

To use SWC with webpack, install `swc-loader` and add it to the webpack configuration:

```js
{
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: 'swc-loader',
        },
      }
    ]
  }
}
```

### Upgrading from 3.x

1. Upgrade `inferno` and `swc-plugin-inferno` to 10 together.
2. Clear the SWC cache. SWC caches compiled plugins in the `.swc` directory of your project, or in `jsc.experimental.cacheRoot` if you set it. If the compiled code still calls `createComponentVNode` or `createTextVNode` after the upgrade, SWC is running the old plugin: delete that directory and build again.
3. Rebuild everything that was compiled by 3.x. Inferno 10 cannot run vNodes compiled for Inferno 9.
4. Replace `$ReCreate` with a changing `key`.
5. Update hard-coded `$Flags` numbers to Inferno 10 `VNodeFlags` values.
6. Fix the new child flag errors, and give every `ref` a value.

## Options

Unknown plugin options are rejected with an error. The options are:

<table>
  <thead>
    <tr><th>Option</th><th>Default</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>pure</code></td><td><code>true</code></td><td>Add <code>/*#__PURE__*/</code> annotations, see below.</td></tr>
    <tr><td><code>importSource</code></td><td><code>"inferno"</code></td><td>The module the helpers are imported from.</td></tr>
    <tr><td><code>development</code></td><td><code>false</code></td><td>Enables fast refresh together with <code>refresh</code>. On its own it changes nothing.</td></tr>
    <tr><td><code>refresh</code></td><td>off</td><td>Fast refresh: <code>true</code>, or <code>{ "refreshReg": "$RefreshReg$", "refreshSig": "$RefreshSig$", "emitFullSignatures": false }</code>. Only applies when <code>development</code> is <code>true</code>.</td></tr>
    <tr><td><code>uselessFlags</code></td><td><code>"warn"</code></td><td>What to do about useless flags: <code>"warn"</code>, <code>"error"</code> or <code>"off"</code>.</td></tr>
  </tbody>
</table>

#### Imports

swc-plugin-inferno will automatically import the required methods from inferno library.
There is no need to import inferno in every single JSX file. Only import the inferno specific code required by the application.

```js
import { render } from 'inferno'; // only import 'render'

// The plugin will automatically import 'newVNode'
render(<div>1</div>, document.getElementById('root'));
```

A helper that the file already declares at the top level, for example with `import { newVNode } from 'inferno'`, is used instead of importing it again. In scripts (files without `import` or `export`) the helpers are read from `require('inferno')`.

Set `importSource` to import the helpers from another module, like the `imports` option of babel-plugin-inferno:

```json
["swc-plugin-inferno", { "importSource": "inferno-compat" }]
```

#### pure

With `"pure": true` the plugin adds `/*#__PURE__*/` to the calls it generates from JSX, and also to hand-written calls of Inferno factories such as `forwardRef`, `createRef`, `createPortal`, `newVNode` and the deprecated `createVNode` imported from `inferno` or from `importSource`.
Minifiers remove these calls when their result is unused, so don't call them only for their side effects. `normalizeProps` is annotated only when its argument is a freshly created vNode, because it mutates the vNode passed to it.

#### Fast refresh

With `"development": true` and `"refresh": true` the plugin registers components for hot reloading like `react-refresh/babel`: components are passed to `$RefreshReg$`, and the hooks of a component to a signature created by `$RefreshSig$`.
The functions are renamed with `refreshReg` and `refreshSig`. Your hot reloading runtime has to define them. Any call of a function named `use` followed by a capital letter counts as a hook, for example `useLoaderData` of inferno-router. A `// @refresh reset` comment in a file remounts its components on every edit.

## Fragments

All the following syntaxes are **reserved** for Inferno's `newFragment` call

```jsx
<>
    <div>Foo</div>
    <div>Bar</div>
</>

<Fragment>
    <div>Foo</div>
    <div>Bar</div>
</Fragment>
```

## Special flags

This plugin provides few special compile time flags that can be used to optimize an Inferno application.

```jsx
// ChildFlags:
<div $HasTextChildren /> - Children is rendered as pure text
<div $HasVNodeChildren /> - Children is another vNode (Element or Component)
<div $HasNonKeyedChildren /> - Children is always array without keys
<div $HasKeyedChildren /> - Children is array of vNodes having unique keys
<div $ChildFlag={expression} /> - This attribute is used for defining children shape runtime. See inferno-vnode-flags (ChildFlags) for possible values

// Functional flags
<div $Flags={expression} /> - Replaces the vNode flags the plugin computes. See inferno-vnode-flags (VNodeFlags) for possible values
```

A numeric `$ChildFlag` is written into the flags like the other child flags: `<div $ChildFlag={16}>{a}</div>` compiles to `newVNode(3, "div", null, a)`. Any other `$ChildFlag` expression is only known at runtime, so that element is compiled to the deprecated `createVNode` (or `createFragment`), which converts the value.

`$Flags={expression}` replaces the flags of the element. The value is an Inferno 10 `VNodeFlags` value, so update hard-coded numbers. The plugin still adds the child bit of the children, and `HasInvalidChildren` (16) for a component:

```jsx
<div $Flags={f}>text</div>     // newVNode(f | 2, "div", null, "text")
<ComponentA $Flags={magic} />  // newComponentVNode(magic | 16, ComponentA)
```

`$ReCreate` has been removed in Inferno 10, and the plugin reports an error for it. To re-create an element, change its key instead, for example `key={version}`: Inferno unmounts the old element and mounts a new one when the key changes.

### Invalid flags

When the JSX shows that the children cannot have the shape a child flag declares, the plugin reports an error that points at the flag, and the build fails. Inferno would otherwise render the children wrong or throw in development. For example:

```jsx
// An array is not a single vNode
<div $HasVNodeChildren><a/><b/></div>
<div $HasVNodeChildren>{[a, b]}</div>

// Text is not a vNode, and an element is not text
<div $HasVNodeChildren>text</div>
<div $HasTextChildren><a/></div>

// One element is not an array, and keyed children need keys
<ul $HasNonKeyedChildren><li/></ul>
<ul $HasKeyedChildren><li key="1"/><li/></ul>

// Not a ChildFlags value
<div $ChildFlag={3}>{a}</div>
```

```
  x $HasVNodeChildren needs one element or component child, but there are 2 children.
   ,-[/project/src/App.jsx:1:1]
 1 | <div $HasVNodeChildren><a/><b/></div>
   :      ^^^^^^^^^^^^^^^^^
   `----
```

Dynamic children such as `{expression}` are not checked, and neither are the children of components. The `uselessFlags` option does not change this check.

A `ref` without a value, such as `<div ref />`, is an error too. Give every `ref` an explicit value.

### Useless flags

Child flags are only needed for children whose shape the plugin cannot see, such as `{expression}` children or a `children={expression}` prop.
When the children are written as JSX, the plugin sets the child flags itself.
It warns about flags that cannot improve the output:

```jsx
// The children are known at compile time: the plugin already compiles them with HasVNodeChildren
<div $HasVNodeChildren>
  <h1>Hi</h1>
</div>

// Components get their children in props.children, so child flags do nothing
<Foo $HasKeyedChildren>{items}</Foo>

// Only one child flag applies. The order is $ChildFlag, $HasKeyedChildren, $HasNonKeyedChildren,
// $HasTextChildren, $HasVNodeChildren
<div $HasKeyedChildren $HasNonKeyedChildren>{items}</div>

// Fragments have no vNode flags
<Fragment $Flags={1}>{items}</Fragment>
```

The `uselessFlags` option sets what the plugin does about them:

- `"warn"` (default): print a warning.
- `"error"`: fail the build with an error for each useless flag. For example, CI can use it to keep useless flags out.
- `"off"`: do nothing.

SWC does not show the warnings of plugins, so the plugin prints them to stderr itself, in the same format as babel-plugin-inferno:

```
swc-plugin-inferno: /project/src/App.jsx:3:10: $HasVNodeChildren is not needed: the children are known at compile time, so the plugin sets their child flags. Child flags only help with dynamic children such as {expression}.
  1 | function App() {
  2 |   return (
> 3 |     <div $HasVNodeChildren>
    |          ^^^^^^^^^^^^^^^^^
  4 |       <h1>Hi</h1>
  5 |     </div>
  6 |   );
```

With `"error"` SWC reports the same messages as errors, with its own code frames. Any value other than `"warn"`, `"error"` or `"off"` fails with an error, so a typo does not turn the check off silently.

To use a different level in CI, set the plugin options in a JavaScript config, such as the `swc-loader` options in `webpack.config.js`:

```js
{
  loader: 'swc-loader',
  options: {
    jsc: {
      parser: { syntax: 'ecmascript', jsx: true },
      experimental: {
        plugins: [['swc-plugin-inferno', {
          // Most CI services set CI=true
          uselessFlags: process.env.CI ? 'error' : 'warn'
        }]]
      }
    }
  }
}
```

## Troubleshoot

You can verify `swc-plugin-inferno` is used by looking at the compiled output.
This plugin does not generate calls to `createElement` or `h`, but instead it uses low level InfernoJS API
`newVNode`, `newComponentVNode`, `newFragment` etc. If you see your JSX being transpiled into `createElement` calls
it is a good indication that your build configuration is not correct.
If you see `createComponentVNode` or `createTextVNode` calls after upgrading to version 10, SWC is running the old plugin from its cache: delete the `.swc` directory and build again.
