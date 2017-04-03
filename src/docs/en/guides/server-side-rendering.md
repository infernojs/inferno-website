# Server-side rendering

Inferno's `inferno-server` package supplies a server utility to render virtual DOM nodes into markup to be send from a server.



```
renderToString(infernoComponent)
renderToStaticMarkup(infernoComponent)
```

## Full Example

```jsx
import Inferno from 'inferno';
import InfernoServer from 'inferno-server';

const App = function({ color = 'red', name }) {
  return (
    <div style={{ color }}>
      Hello
      <span>{name}</span>
    </div>
  )
}

InfernoServer.renderToString(<App color="blue" name="world">)
// "<div style="color: blue;">Hello<span>World</span></div>"
```

Output:

```jsx
<div style="color: blue;">Hello<span>World</span></div>
```
