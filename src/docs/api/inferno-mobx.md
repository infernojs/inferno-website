# Inferno Mobx API

This package provides the bindings for MobX and Inferno.
Exports `connect` function, a `Provider` component and some development utilities.

```
npm install mobx inferno-mobx --save
```

## `connect(componentClass)`

Function (and decorator) that converts a functional component or a component class into a reactive component.
See the [mobx](https://mobxjs.github.io/mobx/refguide/observer-component.html) documentation for more details.

```javascript
import { connect } from "inferno-mobx";


// ---- ES2015 syntax ----

const TodoView = connect(class TodoView extends Component {
    render() {
        return <div>{this.props.todo.title}</div>
    }
})

// ---- or even simpler with decorators

@connect
class TodoView extends Component {
    render() {
        return <div>{this.props.todo.title}</div>
    }
}

// ---- or just using a stateless component

const TodoView = connect(props => <div>{props.todo.title}</div>)
```

## `connect(storesArray, componentClass)`

An alternative version of connect with your stores automatically injected into props.

```javascript
@connect(['storeName'])
class MyComponent extends Component {
    render() {
        return <div>{props.storeName.data}</div>
    }
}
// ---- or just using a stateless component
const MyComponent = connect(['storeName'], props => <div>{props.storeName.data}</div>)
```

## `Provider`

`Provider` is a component that can pass stores (or other stuff) using context mechanism to child components. This is useful if you have things that you don't want to pass through multiple layers of components explicitly.

The easiest way to use the `Provider` is to add it before everything else. This way all your children can potentially have access to the stores.

```javascript
import { render } from 'inferno';
import { Provider } from 'inferno-mobx';

let myStore = { whatever: 'some data'};


render(<Provider myStore={ myStore }>
    <Router>
        <IndexRoute component={ MyComponent } />
    </Router>
</Provider>, document.getElementById('root'))
```

You can add more than one store (it is also recommended to do so to separate your logic), each prop added to `Provider` defines a store.

```javascript
import { Component } from 'inferno';

let myStore1 = 'hello';
let myStore2 = 'world';

render(<Provider myStore1={ myStore1 } myStore2={ myStore2 }>
    <MyComponent/>
</Provider>, document.getElementById('root'));
```

You can then access your stores using `connect`

```javascript
@connect(['myStore1', 'myStore2'])
class MyComponent extends Component {
    render({ myStore1, myStore2 }) {
        return <p>{ myStore2 }</p>
    }
}
```

By making your stores reactive using `observable` from mobx, you can have your components automatically update when your stores' content changes.

```javascript
import { observable } from 'mobx';

let myStore1 = observable({ someKey: 'someValue' });
let myStore2 = observable(['some', 'array']);
```

For more information on how to use `mobx observables`,  visit [mobx](https://github.com/mobxjs/mobx)


# Full Example

```javascript
// MyComponent.js
import { Component } from 'inferno';
import { connect } from 'inferno-mobx';

@connect(['englishStore', 'frenchStore'])
class MyComponent extends Component {
    render({ englishStore, frenchStore }) {
        return <div>
            <p>{ englishStore.title }</p>
            <p>{ frenchStore.title }</p>
        </div>
    }
}

export default MyComponent
```

Just make sure that you provided your stores using the `Provider`. Ex:

```javascript
// index.js
import { render } from 'inferno';
import { Provider } from 'inferno-mobx';
import { observable } from 'mobx';
import MyComponent from './MyComponent';

const englishStore = observable({
    title: 'Hello World'
});

const frenchStore = observable({
    title: 'Bonjour tout le monde'
});

render(<Provider englishStore={ englishStore } frenchStore={ frenchStore }>
    <MyComponent/>
</Provider>, document.getElementById('root'));
```
