# Inferno Server API

## `renderToString`

```jsx
import Inferno from 'inferno';
import InfernoServer from 'inferno-server';

InfernoServer.renderToString(<div />);
```

Rendert einen HTML-String eines zur Verfügung gestellten virtuellen DOMs. Dies sollte nur auf dem Server genutzt werden, um ein HTML als Response zu senden, sinnvoll für schnellere Seitenladezeiten und verbessertes SEO.

Wenn `Inferno.render()` mit einem String aufgerufen wird, fügt Inferno nur Hooks dem DOM hinzu, was die Performance initial possitiv beeinflußt.

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

Ähnlich wie `InfernoServer.renderToString()` `renderToStaticMarkup` gibt einen HTML-String von einem bereit gestelltem virtuellen DOM zurück. Diesem werden jedoch keine von Inferno intern genutzten DOM-Attribute hinzugefügt. Dies ist sinnvoll um die Seitenladezeit zu verbessern, da weniger Bytes pro Request übertragen werden.

## Render Stream API

Inferno 1.2.1 führte einen experimentellen Stream-Renderer ein, der asynchrone zustandardsorientierte Komponenten unterstützt. Es sollte nicht in Produktion eingesetzt werden. Aber es ist ein umgesetztes Feature. Hinweis: Stream-Rendering ist etwa 10-15% langsamer als `renderToString`.

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

Das folgende Beispiel zeigt eine zustandardsorientierte Komponente, der ein Promise bereit gestellt wird. Der Renderer wird eine Warteschlange bilden und nach dem Auflösen das Ergebnis zum Client streamen. `getInitialProps` markiert eine asynchrone Aktion, welche Props und Context als Parameter entgegen nimmt. Das vom Promise zurückgegebene Objekt, wird mit den Props der Komponente vereint.

Zugriff dieser Art auf Props und Context ermöglicht es notwendige Abhängigkeiten zu übergeben. Zum Beispiel: Datenbank-Ergebnis, Props von einem Eltern-Element, ...

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

Elemente, welche vom Renderer erstellt wurden, sind gestreamte Teile, normalerweise Element für Element, Allerdings, wie die Implementierung zeigt, können größere Teile (mehr Elemente) gestreamt werden, wenn das Promise mehr Zeit für die Auflösung braucht.
