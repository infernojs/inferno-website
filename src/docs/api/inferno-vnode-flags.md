# Inferno VNode Flags API

Inferno VNode Flags is a small utility library for [Inferno](https://github.com/infernojs/inferno).

Usage of `inferno-vnode-flags` should be limited to assigning `VNodeFlags` and `ChildFlags` when using creating vNodes.

## Install

```
npm install --save inferno-vnode-flags
```

## Contents

**VNodeFlags:**
- `VNodeFlags.HtmlElement` vNode type is any generic HTML element
- `VNodeFlags.ComponentUnknown` vNode type is Functional or Class component, component resolution will be done runtime
- `VNodeFlags.ComponentClass` vNode type is class component
- `VNodeFlags.ComponentFunction` vNode type is functional component
- `VNodeFlags.Text` vNode type is text
- `VNodeFlags.SvgElement` vNode is html element that belongs to SVG namespace
- `VNodeFlags.InputElement` vNode type is "input" element
- `VNodeFlags.TextareaElement` vNode type is "textarea" element
- `VNodeFlags.SelectElement` vNode type is "select" element
- `VNodeFlags.Void` vNode type is empty
- `VNodeFlags.Portal` vNode type is portal
- `VNodeFlags.ReCreate` (JSX **$ReCreate**) always re-creates the vNode

**VNodeFlags Masks:**
- `VNodeFlags.FormElement` - vNode type is any form element "input", "textarea", "select" etc.
- `VNodeFlags.Element` - vNode type is any element ( not component )
- `VNodeFlags.Component` - vNode type is Component


**ChildFlags**
- `ChildFlags.UnknownChildren` Children type is not known compile time, children resolution will be done runtime. This is the default flag when JSX contains javascript expression that cannot be resolved compile time. ( slow )
- `ChildFlags.HasInvalidChildren` Children type is invalid/empty "null", "undefined", "false", "true" (fast)
- `ChildFlags.HasVNodeChildren` (JSX **$HasVNodeChildren**) Children type is single vNode (fast)
- `ChildFlags.HasNonKeyedChildren` (JSX **$HasNonKeyedChildren**) Children type is array of vNodes, diff is done based on array indexes, no nested arrays, no holes (fast)
- `ChildFlags.HasKeyedChildren` (JSX **$HasKeyedChildren**) Children type is array of vNodes, diff is done based on "key" properties all vNodes must have a key, no nested arrays, no holes (fast)
- `ChildFlags.HasTextChildren` (JSX **$HasTextChildren**) Children type is only string (fast)

You can easily combine multiple flags, by using bitwise operators. A common use case is an element that has keyed children:
