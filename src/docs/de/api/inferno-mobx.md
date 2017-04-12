# Inferno Mobx API

Dieses Packet stellt Bindings für MobX und Inferno zur Verfügung.
Es exportiert die Funktion `connect`, eine `Provider` Komponente und einige Entwicklungswerkzeuge.

```
npm install mobx inferno-mobx --save
```

## `connect(componentClass)`

Funktion (und Decorator), die eine funktionale Komponente or eine Koponentenklasse in eine reaktive Komponente überführt.
Weitere Details gibt es in der [mobx](https://mobxjs.github.io/mobx/refguide/observer-component.html) Dokumentation.

```jsx
import { connect } from "inferno-mobx";


// ---- ES6 Syntax ----

const TodoView = connect(class TodoView extends Component {
    render() {
        return <div>{this.props.todo.title}</div>
    }
})

// ---- oder einfacher als Decorator

@connect
class TodoView extends Component {
    render() {
        return <div>{this.props.todo.title}</div>
    }
}

// ---- oder als Komponente ohne State

const TodoView = connect(props => <div>{props.todo.title}</div>)
```

## `connect(storesArray, componentClass)`

Eine alternative Version der connect-Funktion, die Stores automatisch via Props bereitstellt.

```jsx
@connect(['storeName'])
class MyComponent extends Component {
    render() {
        return <div>{props.storeName.data}</div>
    }
}
// ---- oder als Komponente ohne State
const MyComponent = connect(['storeName'], props => <div>{props.storeName.data}</div>)
```

## `Provider`

`Provider` ist eine Komponente, die Stores (oder andere Daten) Kind-Komponenten mit Hilfe von Kontext bereitstellt.
Dies ist nützlich, wenn Daten nicht explizit durch mehrere Ebenen von Komponenten gegeben werden sollen.

Der einfachste Weg `Provider` zu nutzen, ist es diesen on oberster Stelle einzubinden. Somit bekommen alle Kind-Komponenten potenziellen Zugriff auf die Stores.

```jsx
import { Provider } from 'inferno-mobx'

let myStore = { whatever: 'some data'}


Inferno.render(<Provider myStore={ myStore }>
    <Router>
        <IndexRoute component={ MyComponent } />
    </Router>
</Provider>, document.getElementById('root'))
```

Es kann mehr als ein Store bereitgestellt werden (es ist sogar empfohlen, da so Logik separiert werden kann). Jede Prop, die zu einem `Provider` hinzugefügt wird, definiert einen Store.

```jsx
let myStore1 = 'hello'
let myStore2 = 'world'

Inferno.render(<Provider myStore1={ myStore1 } myStore2={ myStore2 }>
    <MyComponent/>
</Provider>, document.getElementById('root'))
```

`connect` stellt später Zugriff auf die Stores her.

```jsx
@connect(['myStore1', 'myStore2'])
class MyComponent extends Component {
    render({ myStore1, myStore2 }) {
        return <p>{ myStore2 }</p>
    }
}
```

Wenn Stores durch mobx `observable` reaktiv gemacht werden, können sich Komponenten automatisch aktualisieren, wenn sich der Inhalt der Stores ändert.

```jsx
import { observable } from 'mobx'

let myStore1 = observable({ someKey: 'someValue' })
let myStore2 = observable(['some', 'array'])
```

Weitere Informationen, wie `mobx observables` genutzt werden, gibt es auf der Webseite [mobx](https://github.com/mobxjs/mobx).

# Komplettes Beispiel

```jsx
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

Stores sollten über `Provider` zur Verfügung gestellt werden.

```jsx
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
