# Inferno Mobx API

Este paquete provee los vinculos para usar MobX e Inferno.
Exporta la función `connect`, y el componente `Provider` algunas utilidades de desarrollo.

```
npm install mobx inferno-mobx --save
```

## `connect(componentClass)`

Función (y decorador) que convierte un componete funcional o un componente clase en un componente reactivo.
Ver en [mobx](https://mobxjs.github.io/mobx/refguide/observer-component.html) documentación y más detalles.

```javascript
import { connect } from "inferno-mobx";


// ---- ES6 syntax ----

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

Un versión alternativa que conecta con tus stores y automaticamente se inyecta en props.

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

`Provider` es un componente que pasa stores (y otras cosas) usando el mecanismo de contexto a componentes hijos. Esto es útil si tienes cosas que no quisieras pasar a multiples capas de componentes explicitamente.

La forma más facil de utilizar `Provider` es añadirlo antes que todo. De esta forma que tus componentes hijos tengan acceso a los stores.

```javascript
import { Provider } from 'inferno-mobx'

let myStore = { whatever: 'some data'}


Inferno.render(<Provider myStore={ myStore }>
    <Router>
        <IndexRoute component={ MyComponent } />
    </Router>
</Provider>, document.getElementById('root'))
```
Tu puedes añadir mas de un store (Es recomendado que lo hagas para separar tu logica), cada prop añadido a  `Provider` define un store.

```javascript
let myStore1 = 'hello'
let myStore2 = 'world'

Inferno.render(<Provider myStore1={ myStore1 } myStore2={ myStore2 }>
    <MyComponent/>
</Provider>, document.getElementById('root'))
```

Tu despúes puedes acceder a tus stores usando `connect`


```javascript
@connect(['myStore1', 'myStore2'])
class MyComponent extends Component {
    render({ myStore1, myStore2 }) {
        return <p>{ myStore2 }</p>
    }
}
```

Haciendo tu store reactivo usando `observable` de mobx, tus componentes se pueden actualizar automaticamente cuando el contenido de tus stores cambia.

```javascript
import { observable } from 'mobx'

let myStore1 = observable({ someKey: 'someValue' })
let myStore2 = observable(['some', 'array'])
```

Para más información de como usar `mobx observables`,  visita [mobx](https://github.com/mobxjs/mobx)


# Full Example

```javascript
// MyComponent.js
import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'

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

Solo para estar seguro que utilizaste tu store usando `Provider`. Eje:

Just make sure that you provided your stores using the `Provider`. Ex:

```javascript
// index.js
import Inferno from 'inferno'
import { Provider } from 'inferno-mobx'
import { observable } from 'mobx'
import MyComponent from './MyComponent'

const englishStore = observable({
    title: 'Hello World'
})

const frenchStore = observable({
    title: 'Bonjour tout le monde'
})

Inferno.render(<Provider englishStore={ englishStore } frenchStore={ frenchStore }>
    <MyComponent/>
</Provider>, document.getElementById('root'))
```
