# Inferno Server API

## `renderToString`

```jsx
import Inferno from 'inferno';
import InfernoServer from 'inferno-server';

InfernoServer.renderToString(<div />);
```

Render a HTML string, given the supplied virtual DOM. This should only be used on the server to generate a HTML string to send on request for faster page loads and improved SEO performance.

If `Inferno.render()` is called on a string send using this method then Inferno will only attach hooks to the DOM increasing performance on the initial render.

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

## `renderToStaticMarkup`

```jsx
import Inferno from 'inferno';
import InfernoServer from 'inferno-server';

InfernoServer.renderToStaticMarkup(<div />);
```

Much like `InfernoServer.renderToString()` `renderToStaticMarkup` will return a HTML string from a supplied virtual DOM, however this will not attach any of the Inferno DOM attributes which are used internally by Inferno. This is useful to improve performance as it can save a number of bytes on the page request.

## Render Stream API

Inferno 1.2.1 introduced an experimental stream renderer that supports async stateful components. It shouldn't be used in production yet as work is being done to increase performance and features. Note that stream rendering is currently approximately 10-15% slower than `renderToString`.

## `streamQueueAsString`

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
InfernoServer.streamQueueAsString(App).pipe(res);
```

The following is an example of stateful component providing a Promise. The renderer will queue the promise and upon being resolved, stream its output to the client. Use `getInitialProps()` to denote an async action, which receives props and context as parameters. The object returned in the promise is merged into the props of the component.

Having access to props and context in this manner gives you the ability to pass in any necessary dependencies ie. a database connector, incoming props from a parent etc.

```jsx
class MyAsyncComponent extends Component<any, any> {
  getInitialProps(props, context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          value: 'I waited long enough!'
        });
      }, 150);
    });
  }
  render() {
    return createElement(
      'span', null,
      `The returned value is: ${ this.props.value }`
    );
  }
}
InfernoServer.streamQueueAsString(MyAsyncComponent).pipe(res);
```

Elements produced by the renderer are streamed in chunks, usually node for node but as a symptom of the implementation, may stream larger chunks if promises take more time to resolve.
