# Event Handling

To create events with Inferno, you pass a relevant event name to the props of your VNode. For example, when using JSX:

```jsx
function clickMe(event) {
  console.log('Clicked !', event)
}
```

Then you render a VNode with this event passed as props:
```
Inferno.render(
  <button onClick={ clickMe }> Click Here </button>,
  document.getElementById('app')
)
```
Upon clicking the `<button>`, the `clickMe()` event will fire.

Like React, Inferno also uses a light-weight synthetic event system in certain places (although both event systems differ massively). Inferno's event system provides highly efficient delegation and an event helper called [`linkEvent`](https://github.com/infernojs/inferno/blob/master/README.md#linkevent-package-inferno).

One major difference between Inferno and React is that Inferno does not rename events or change how they work by default. Inferno only specifies that events should be camel cased, rather than lower case. Lower case events will bypass
Inferno's event system in favour of using the native event system supplied by the browser. For example, when detecting changes on an `<input>` element, in React you'd use `onChange`, with Inferno you'd use `onInput` instead (the
native DOM event is `oninput`).

Available synthetic events are:
- `onClick`
- `onDblClick`
- `onMouseMove`
- `onMouseDown`
- `onMouseUp`
- `onSubmit`
- `onKeyPress`
- `onKeyDown`
- `onKeyUp`
- `onInput`
- `onChange`
- `onFocusIn`
- `onFocusOut`

### `linkEvent` (package: `inferno`)

`linkEvent()` is a helper function that allows attachment of `props`/`state`/`context` or other data to events without needing to `bind()` them or use arrow functions/closures. This is extremely useful when dealing with events in functional components. Below is an example:

```jsx
import { linkEvent } from 'inferno';

function handleClick(props, event) {
  props.validateValue(event.target.value);
}

function MyComponent(props) {
  return <div><input type="text" onClick={ linkEvent(props, handleClick) } /><div>;
}
```

This is an example of using it with ES2015 classes:


```jsx
import { linkEvent, Component } from 'inferno';

function handleClick(instance, event) {
  instance.setState({ data: event.target.value });
}

class MyComponent extends Component {
  render () {
    return <div><input type="text" onClick={ linkEvent(this, handleClick) } /><div>;
  }
}
```

`linkEvent()` offers better performance than binding an event in a class constructor and using arrow functions, so use it where possible.

