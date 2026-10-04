# Babel Plugin Inferno

[babel-plugin-inferno](https://github.com/infernojs/babel-plugin-inferno) transforms JSX code in your projects to Inferno compatible virtual DOM.
It is different to other JSX plugins, because it outputs highly optimized Inferno specific `newVNode` calls instead of `createElement` calls. The plugin also checks the shape of the children during compilation to reduce work at runtime.

The same JSX can be compiled with [swc-plugin-inferno](/docs/api/swc-plugin-inferno), which generates the same code, or with [ts-plugin-inferno](https://github.com/infernojs/ts-plugin-inferno) for the TypeScript compiler.

## Inferno versions

Version 10 of the plugin compiles JSX for Inferno 10. It calls `newVNode`, `newComponentVNode`, `newFragment` and `newTextVNode`, and writes the flags of each vNode, including the shape of its children, as one number.

For Inferno 9 and older, use version 7 of the plugin. Inferno 10 numbers its vNode flags differently, so code compiled by version 7 does not work with Inferno 10 and has to be compiled again. This includes packages that ship JSX compiled by version 7.

From version 10 on, the major version of the plugin matches the major version of Inferno: use plugin 10.x with Inferno 10.x, plugin 11.x with Inferno 11.x, and so on. There is no plugin 8 or 9. Version 10 requires Node.js 24 or newer.

```js
<div>Hello</div>
// 7.x
createVNode(1, "div", null, "Hello", 16);
// 10.x: HtmlElement (1) + HasTextChildren (2)
newVNode(3, "div", null, "Hello");

<><a /><b /></>
// 7.x
createFragment([createVNode(1, "a"), createVNode(1, "b")], 4);
// 10.x: Fragment (256) + HasNonKeyedChildren (4)
newFragment(260, [newVNode(17, "a"), newVNode(17, "b")]);
```

Children that are only known at runtime, such as `{expression}`, get no child bit and are normalized by Inferno. Components get `ComponentUnknown`, which is 0.
See [inferno-vnode-flags](/docs/api/inferno-vnode-flags) for all the flag values.

## How to install

```bash
npm install --save-dev babel-plugin-inferno
```

## How to use

Add the plugin to the plugin section of your Babel configuration, for example `.babelrc`. Make sure the inferno plugin is added before babel module transformers.

```json
{
    "presets": [ "@babel/preset-env" ],
    "plugins": [["babel-plugin-inferno", { "imports": true }]]
}
```

Inferno 10's own bundles use modern syntax and are compiled for Chrome 107, Edge 107, Firefox 84 and Safari 16, so you can use Babel targets that don't need `@babel/plugin-transform-classes`.

## Fragments

All of the following syntaxes are **reserved** for `newFragment` call

```jsx
<>
    <div>Foo</div>
    <div>Bar</div>
</>

<Fragment>
    <div>Foo</div>
    <div>Bar</div>
</Fragment>

<Inferno.Fragment>
    <div>Foo</div>
    <div>Bar</div>
</Inferno.Fragment>
```

`React.Fragment` is also compiled to an Inferno `newFragment` call to ease project migration to Inferno.

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
<div $Flags={expression} /> - Replaces the vNode flags, see VNodeFlags in inferno-vnode-flags
```

A numeric `$ChildFlag` is written into the flags like the other child flags. Any other `$ChildFlag` expression is only known at runtime, so that element is compiled to the deprecated `createVNode` (or `createFragment`), which converts the value.

`$Flags={expression}` replaces the flags of the element. The value is read as Inferno 10 `VNodeFlags`, and the plugin still adds the child bit of the children, and `HasInvalidChildren` (16) for a component. Update any numbers you pass, for example `$Flags={64}` meant `InputElement` in plugin 7 and means `SvgElement` in plugin 10.

`$ReCreate` has been removed in Inferno 10, and the plugin throws an error for it. To re-create an element, change its key instead, for example `key={version}`: Inferno unmounts the old element and mounts a new one when the key changes.

```jsx
// 7.x
<section $ReCreate>{content}</section>
// 10.x
<section key={version}>{content}</section>
```

### Invalid flags

When the JSX shows that the children cannot have the shape a child flag declares, the plugin throws an error that points at the flag. Inferno would otherwise render the children wrong or throw in development. For example:

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
SyntaxError: /project/src/App.jsx: $HasVNodeChildren needs one element or component child, but there are 2 children.
> 1 | <div $HasVNodeChildren><a/><b/></div>
    |      ^^^^^^^^^^^^^^^^^
```

Dynamic children such as `{expression}` are not checked, and neither are the children of components.

A `ref` without a value, such as `<div ref />`, is a compile error too. Give every `ref` an explicit value.

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
```

The warning is printed with `console.warn` and shows the file, line and column of the flag.
The `uselessFlags` option below turns it into an error or turns it off.

## Options

#### imports (boolean)

babel-plugin-inferno will automatically import the required methods from inferno library.
There is no need to import inferno in every single JSX file. Only import the inferno specific code required by the application.

```js
import { render } from 'inferno'; // Just import what you need, (render in this case)

// The plugin will automatically import newVNode
render(<div>1</div>, document.getElementById('root'));
```

You need to have support for ES6 modules for this to work. If you are using legacy build system, you can revert this by using `imports: false`.

#### pragma

Each method that is used from inferno can be replaced by custom name.

- `pragma` (string) defaults to `newVNode`.
- `pragmaCreateComponentVNode` (string) defaults to `newComponentVNode`.
- `pragmaNormalizeProps` (string) defaults to `normalizeProps`.
- `pragmaTextVNode` (string) defaults to `newTextVNode`.
- `pragmaFragmentVNode` (string) defaults to `newFragment`.

A custom function set with these options gets the Inferno 10 arguments: `newVNode(flags, type, className, children, props, key, ref)` has no `childFlags` argument, and `newFragment(flags, children, key)` takes the flags first.

#### defineAllArguments (boolean)

Writes every argument of the generated calls, also the ones that are `null`, so all the calls have the same number of arguments.

#### uselessFlags (string)

What to do about the useless flags:

- `"warn"` (default): print a warning with `console.warn`.
- `"error"`: stop the build with an error that points at the flag. For example, CI can use it to keep useless flags out.
- `"off"`: do nothing.

```json
{
    "plugins": [["babel-plugin-inferno", {
        "imports": true,
        "uselessFlags": "error"
    }]]
}
```

Any value other than `"warn"`, `"error"` or `"off"` fails when Babel loads the config, so a typo does not turn the check off silently.

## Troubleshoot

You can verify `babel-plugin-inferno` is used by looking at the compiled output.
This plugin does not generate calls to `createElement` or `h`, but instead it uses low level InfernoJS API
`newVNode`, `newComponentVNode`, `newFragment` etc. If you see your JSX being transpiled into `createElement` calls
its good indication that your babel configuration is not correct. If you see `createComponentVNode` or `createTextVNode` calls, the JSX was compiled by an older version of the plugin.
