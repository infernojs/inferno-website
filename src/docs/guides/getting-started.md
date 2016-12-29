Getting Started
---

Let's start with some code. As you can see, Inferno intentionally keeps the same, good, design ideas as React regarding components: one-way data flow and separation of concerns.

In these examples, JSX is used via the [Inferno JSX Babel Plugin](https://github.com/infernojs/babel-plugin-inferno) to provide a simple way to express Inferno virtual DOM. You do not need to use JSX, it's completely **optional**, you can use [hyperscript](https://github.com/trueadm/inferno/tree/master/packages/inferno-hyperscript) or [createElement](https://github.com/trueadm/inferno/tree/master/packages/inferno-create-element) (like React does).

```jsx
import Inferno from 'inferno';

const message = "Hello world";

Inferno.render(
  <MyComponent message={ message } />,
  document.getElementById("app")
)
```
Furthermore, Inferno also uses ES6 components like React:

```jsx
import Inferno from 'inferno';
import Component from 'inferno-component';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }
  render() {
    return (
      <div>
        <h1>Header!</h1>
        <span>Counter is at: { this.state.counter }</span>
      </div>
    )
  }
}

Inferno.render(<MyComponent />, document.body);
```

### More Examples

- [**Simple Clock** (@JSFiddle)](https://jsfiddle.net/o01mvsyn/)

The best way to start to use Inferno is by using [Create Inferno App](https://github.com/infernojs/create-inferno-app). You can get setup and running within a few minutes.

Alternatively, you can get started with Inferno using the [Inferno Boilerplate](https://github.com/infernojs/inferno-boilerplate) for a very simple setup. For a more advanced example demonstrating how Inferno might be used, we recommend trying out [Inferno Starter Project](https://github.com/nightwolfz/inferno-starter) by [nightwolfz](https://github.com/nightwolfz/).

Core package:

```sh
npm install --save inferno
```

Addons:

```sh
# ES2015 class components
npm install --save inferno-component

# server-side rendering
npm install --save inferno-server

# routing
npm install --save inferno-router
```

Pre-bundled files for browser consumption can be found on [our cdnjs](https://cdnjs.com/libraries/inferno):

```
https://cdnjs.cloudflare.com/ajax/libs/inferno/1.0.0/inferno.min.js
```

Creating Virtual DOM
---

#### JSX:
```sh
npm install --save-dev babel-plugin-inferno
```

#### Hyperscript:
```sh
npm install --save inferno-hyperscript
```

#### createElement:
```sh
npm install --save inferno-create-element
```

Compatibility with existing React apps
---
```sh
npm install --save-dev inferno-compat
```

Note: Make sure you read more about [inferno-compat](https://github.com/trueadm/inferno/tree/master/packages/inferno-compat) before using it.
