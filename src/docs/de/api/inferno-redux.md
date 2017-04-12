# Inferno Redux API

Viele Anwendungen im React-Ökosystem nutzen [Redux](//reduxjs.org), um Daten zu verwalten. Daraufhin wurde React-Redux für Inferno angepasst, um die Portierung ganzer Anwendungen zu Inferno zu vereinfachen.

## `Provider`

Die `Provider` Komponente erlaubt es einer Anwendung, sich mit einem Redux-Store zu verbinden.

**Warnung:** Die `store` Prop im `Provider` darf nicht dynamisch geändert werden. Dies wird in `Inferno-redux` nicht unterstützt.

```jsx
import Inferno from 'inferno'
import { Provider } from 'inferno-redux'
import { createStore } from 'redux'

// Komponenten-Deklaration...

const store = createStore(..reducers)

Inferno.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

## Connect

```javascript
connect(
  mapStateToProps,
  mapDispatchToProps,
  options:
)
```

Die `connect` Funktion ermöglicht Komponenten den Zugriff auf den Redux-Store.
