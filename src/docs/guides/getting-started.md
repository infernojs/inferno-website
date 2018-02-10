# Getting Started

Let's start with some code. As you can see, Inferno intentionally keeps the same design ideas as React regarding components: one-way data flow and separation of concerns.

In these examples, JSX is used via the [Inferno JSX Babel Plugin](https://github.com/infernojs/babel-plugin-inferno) to provide a simple way to express Inferno virtual DOM. You do not need to use JSX, it's completely **optional**, you can use [hyperscript](https://github.com/infernojs/inferno/tree/master/packages/inferno-hyperscript) or [createElement](https://github.com/infernojs/inferno/tree/master/packages/inferno-create-element) (like React does).
Keep in mind that compile time optimizations are available only for JSX.

```jsx
import { render } from 'inferno';

const message = "Hello world";

render(
  <MyComponent message={ message } />,
  document.getElementById("app")
);
```
Furthermore, Inferno also uses ES6 components like React:

```jsx
import { render, Component } from 'inferno';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }
  render() {
    return (
      <div>
        <h1>Header!</h1>
        <span>Counter is at: { this.state.counter }</span>
      </div>
    );
  }
}

render(
  <MyComponent />,
  document.getElementById("app")
);
```

Because performance is an important aspect of this library, we want to show you how to optimize your application even further.
In the example below we optimize the diffing process by using JSX **$HasVNodeChildren** to predefine children shape compile time.
Then we create text vNode using `Inferno.createTextVNode`.

```jsx
import { createTextVNode, render, Component } from 'inferno';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }
  render() {
    return (
      <div>
        <h1>Header!</h1>
        <span $HasVNodeChildren>{createTextVNode('Counter is at: ' + this.state.counter)}</span>
      </div>
    );
  }
}

render(
  <MyComponent />,
  document.getElementById("app")
);
```
