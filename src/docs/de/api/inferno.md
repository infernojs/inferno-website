# Inferno API

## `render`

```javascript
import Inferno from 'inferno';

const root = document.getElementById('root')

Inferno.render(<div />, root);
```

Rendert einen virtuellen Node in den DOM, unter Nutzung eines gestellten Containers, dem der virtuelle DOM übergeben wird. Wenn der virtuelle Node bereits in den Container gerendert wurde, wird ein Update gefahren, welches nur notwendige DOM-Änderungen anwendet um den aktuellen Stand des Inferno virtuellen Nodes wiederzugeben.

Warnung: Wenn das Container-Element nicht leer ist, wird dessen Inhalt initial überschrieben.

## `createRenderer`

`createRenderer` erlaubt das Rendern von Inhalten in den DOM als funktionale Komposition Beispiel:

```javascript
import Inferno from 'inferno';
import { scan, map } from 'most';

...
const model$ = scan(update, 0, actions$);
const vNodes$ = map(view(actions$), model$);
const renderer = Inferno.createRenderer();
const runApp = () => scan(renderer, container, vNodes$).drain();

runApp();
```

## `createElement`
Erstellt einen Inferno-VNode unter der Nutzung einer ähnlichen API wie in React's `createElement()`.

```javascript
import Component from 'inferno-component';
import createElement from 'inferno-create-element';

const root = document.getElementById('root')

class BasicComponent extends Component {
    render() {
        return createElement('div', {
               className: 'basic'
           },
           createElement('span', {
               className: this.props.name
           }, 'The title is ', this.props.title)
       )
    }
}

Inferno.render(createElement(BasicComponent, { title: 'abc' }), root);
```

## `Component`

**Class component:**

```javascript
import Component from 'inferno-component';

class MyComponent extends Component {
  render() {
    ...
  }
}
```

Die Basis-Klasse für Inferno-Komponenten, wenn ES6 Klassen zur Definition verwendet werden.

**Functional component:**

```jsx
import Inferno from 'inferno';

const MyComponent = ({ name, age }) => (
  <span>My name is: { name } and my age is: {age}</span>
);
```

Funktionale Komponenten sind First-Class Funktionen, dessen erster Argument `props` ist, welches von den Eltern übergeben wird.

## `createVNode`

```js
Inferno.createVNode(
  flags,
  type,
  className,
  [...children],
  [props],
  [key],
  [ref],
  [isNormalized]
)
```

`createVNode()` erstellt einen neuen Inferno VNode. Ein `VNode` ist ein virtuelles DOM-Object, welches genutzt wird um einzelne Elemente der UI zu beschreiben. Typischerweise werden `createElement()` (package: `inferno-create-element`), `h()` (package: `inferno-hyperscript`) oder JSX genutzt, um `VNode`s für Inferno zu erstellen, allerdings wird unter der Haube von allen `createVNode()` genutzt. Unten ist ein Beispiel für die Nutzung von `createVNode`:

```javascript
import Inferno from 'inferno';

const vNode = Inferno.createVNode(2, 'div', 'example', 'Hello world!');

Inferno.render(vNode, container);
```

Das erste Argument für `createVNode()` ist ein numerischer Wert aus den  [`VNodeFlags`](https://github.com/trueadm/inferno/tree/master/packages/inferno-vnode-flags), der Inferno zeigt, was der VNode auf der Seite beschreibt.

## `cloneVNode`
```js
Inferno.cloneVNode(
  vNode,
  [props],
  [...children]
)
```

Gibt einen neuen Inferno `VNode`, unter der Nutzung eines `VNode`s als Startpunkt, zurück. Die `VNode` Props des  Resultats sind eine flache Kombination (shallow merge) aus den Original-Props und neuen Props. Neue Kinder ersetzen alte Kinder. `key` und `ref` werden vom Original verwendet.

`cloneVNode()` ist fast gleich zu:

```jsx
<VNode.type {...VNode.props} {...props}>{children}</VNode.type>
```

Ein Beispiel zur Nutzung von `cloneVNode`:

```javascript
import Inferno from 'inferno';

const vNode = Inferno.createVNode(2, 'div', 'example', 'Hello world!');
const newVNode = Inferno.cloneVNode(vNode, { id: 'new' }); // Wir fügen vNode eine id prop hinzu

Inferno.render(newVNode, container);
```

Nutzung mit JSX:

```jsx
import Inferno from 'inferno';

const vNode = <div className="example">Hello world</div>;
const newVNode = Inferno.cloneVNode(vNode, { id: 'new' }); // Wir fügen vNode eine id prop hinzu

Inferno.render(newVNode, container);
```

## `findDOMNode`

`findDomeNode()` muss beim Starten der Anwendung per `options.findDOMNodeEnabled()` aktiviert werden.

Hinweis: Es wird eher empfohlen einen `ref` Callback auf der Komponente zusetzen, um auf dessen Instanz zuzugreifen, als `findDOMNode()` zu nutzen. `findDOMNode()` kann nicht mit funktionalen Komponenten genutzt werden und es reduziert die Performance der Anwendung signifikant.

Wenn eine Komponente in den DOM gehangen wurde, wird ein zugehöriges natives Browser-DOM-Element zurückgegeben. Diese Methode ist sinnvoll um Werte aus dem DOM zu lesen, z.B. Formular-Feld-Daten, oder DOM-Messungen durchzuführen. In den meisten Fällen, kann eine Referenz `ref` zu DOM-Nodes hinzugefügt werden, um `findDOMNode()` zu vermeiden. Wenn das Rendering `null` oder `false` zurückgibt, dann gibt `findDOMNode()` `null` zurück.

## `linkEvent`

`linkEvent()` ist eine Hilfsfunktion, die das Hinzufügen von `props`/`state`/`context` oder anderen Daten zu Events ohne `bind()` oder Arrow-Funktions/Closures ermöglicht. Dies ist extrem sinnvoll, wenn mit Events in funktionalen Komponenten gearbeitet wird. Beispiel unten:

```jsx
import Inferno, { linkEvent } from 'inferno';

function handleClick(props, event) {
    props.validateValue(event.target.value);
}

function MyComponent(props) {
    return <div><input type="text" onClick={ linkEvent(props, handleClick) } /><div>;
}
```

Hier ein Beispiel, das ES2016 Klassen nutzt:

```jsx
import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';

function handleClick(instance, event) {
    instance.setState({ data: event.target.value });
}

class MyComponent extends Component {
    render () {
        return <div><input type="text" onClick={ linkEvent(this, handleClick) } /><div>;
    }
}
```

`linkEvent()` bietet bessere Performance als Event-Binding im Klassen-Konstruktor oder Arrow-Funktions.

## Inferno Options

Es können Standardoptionen für Inferno mit `Inferno.options` gesetzt werden. Siehe unten:

### - `findDOMNodeEnabled`

***Default: `false`***

Dies aktiviert `findDOMNode()`. Es wird dringend davon abgeraten, diese API einzusetzen, da die Performance negativ signifikant leidet. In Zukunft wird diese API inklusive `findDOMNode()` entfernt.

### - `recyclingEnabled`

***Default: `true`***

Dies ermöglicht es DOM-Node-Recycling in Inferno, so dass DOM-Nodes wiederverwendet werden. Es kann sich possitiv signifikant auf die Performance auswirken, allerdings kann es Nebeneffekte bei Custom-Elements geben.
