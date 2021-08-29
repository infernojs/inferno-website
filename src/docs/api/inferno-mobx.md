# Inferno Mobx API

This is a fork of [mobx-react](https://github.com/mobxjs/mobx-react) for [Inferno](https://github.com/infernojs/inferno).

Inferno-mobx is compatible with Inferno v1+, for older versions use [mobx-inferno](https://www.npmjs.com/package/mobx-inferno).

This package provides the bindings for MobX and Inferno and exports `observer` & `inject` decorators and functions, `Provider`, and some development utilities.

## `Install`
```
npm install mobx inferno-mobx --save
```

## `Usage`
In MobX, observers react to changes in observables. Observable creation is universal to all MobX applications and is not specific to Inferno-MobX. Observers are created with either the `observer` function or observer decorator and can then be given a reference to stores either as props or through the use of `Provider` and `inject`, which allows the passing of stores to arbitrarily positioned components.

See the [mobx](https://mobxjs.github.io/mobx/refguide/observer-component.html) documentation for more details. Be aware that much of the offical MobX documentation is specific to the newest versions of React, which use React Context and Hooks.

## `Provider`

If data is required in arbitrary positions without passing through intermediate components, the root of the application is wrapped in a `Provider` component. This is conceptually similar to React's Context. The props for this component are commonly Stores but can be any observable.

Any component can be wrapped in a Provider, but only its descendents will have access to the provided stores.

```javascript
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

render(
    <Provider englishStore={ englishStore } frenchStore={ frenchStore }>
        <MyComponent/>
    </Provider>, 
    document.getElementById('root')
);
```

## `Inject & Observer`
Any component that needs to react to data changes must be wrapped in an `observer`. These components can then have one or more of the stores supplied by the Provider injected into them. The injected stores are then available as props within the component's scope.

### `Decorator syntax`
Inferno MobX supports [TC39 Decorator syntax](https://github.com/tc39/proposal-decorators), but it should be noted that, because of specification instability, the MobX maintainers no longer recommend using decorators and the syntax has been removed from the official MobX documentation.

```javascript
import { Component } from 'inferno';
import { inject, observer } from 'inferno-mobx';
```

### `Class`

```javascript
class MyComponent extends Component {
    render({ englishStore, frenchStore }) {
        return (
            <div>
                <p>{ englishStore.title }</p>
                <p>{ frenchStore.title }</p>
            </div>
        )
    }
}

export default inject('englishStore', 'frenchStore')(observer(MyComponent));
```
### `With Decorators`
```javascript
@inject('englishStore', 'frenchStore') @observer
class MyComponent extends Component {
    render({ englishStore, frenchStore }) {
        return (
            <div>
                <p>{ englishStore.title }</p>
                <p>{ frenchStore.title }</p>
            </div>
        )
    }
}

export default MyComponent;
```
### `Functional Components`
```javascript
const MyComponent = observer(({ frenchStore }) => <div>{ frenchStore.title }</div>);

export default MyComponent;
```

## `TypeScript`

The inject syntax requires strings that map to the names of available stores. If using TypeScript, be aware that the string-to-object mapping prevents TypeScript's static analysis from determining value and availability of the store in a component. You can solve this issue by either declaring the store as an optional prop, and then deciding how to check for undefined, or by opting to pass the store explicitly through the component tree.

```typescript
type MyProps = {
    englishStore? : EnglishStore,
    frenchStore? : FrenchStore,
}

class MyComponent extends Component<MyProps> {
    render({ englishStore, frenchStore }) {
        return (
            <div>
                <p>{ englishStore!.title }</p>
                <p>{ frenchStore!.title }</p>
            </div>
        )
    }
}

const FuncComponent = observer((props : MyProps) => {
    <div>{ props.englishStore?.title }</div>)
};
```