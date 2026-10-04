# Using CDN

If you are not able to npm for installation, you can insert Inferno into your site via `<script>` resources directly from the CDN.

Since Inferno 10, the UMD bundles use modern syntax, such as `const`, arrow functions, spread and classes. They are compiled for Chrome 107, Edge 107, Firefox 84 (KaiOS 3) and Safari 16.
To run Inferno in an older browser, compile it again with your own build.

## Core packages:

```html
<script src="https://unpkg.com/inferno@[version]/dist/inferno.js"></script>
<script src="https://unpkg.com/inferno@[version]/dist/inferno.min.js"></script>
```

### Routing support:

```html
<script src="https://unpkg.com/inferno-router@[version]/dist/inferno-router.js"></script>
<script src="https://unpkg.com/inferno-router@[version]/dist/inferno-router.min.js"></script>
```

### Hyperscript:

```html
<script src="https://unpkg.com/inferno-hyperscript@[version]/dist/inferno-hyperscript.js"></script>
<script src="https://unpkg.com/inferno-hyperscript@[version]/dist/inferno-hyperscript.min.js"></script>
```

### createElement:

```html
<script src="https://unpkg.com/inferno-create-element@[version]/dist/inferno-create-element.js"></script>
<script src="https://unpkg.com/inferno-create-element@[version]/dist/inferno-create-element.min.js"></script>
```
