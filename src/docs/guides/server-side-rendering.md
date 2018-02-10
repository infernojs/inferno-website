# Server-side rendering

Inferno's `inferno-server` package supplies a server utility to render virtual DOM nodes into markup to be sent from a server.


```
renderToString(infernoComponent)
renderToStaticMarkup(infernoComponent)
```

## Full Example

```jsx
import { renderToString } from 'inferno-server';

const App = function({ color = 'red', name }) {
  return (
    <div style={{ color }}>
      Hello
      <span>{name}</span>
    </div>
  )
}

renderToString(<App color="blue" name="world">)
// "<div style="color: blue">Hello<span>World</span></div>"
```

Output:

```jsx
<div style="color: blue">Hello<span>World</span></div>
```
