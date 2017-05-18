# Inferno Redux API

Entendemos que muchas aplicaciones en el ecosistema de React usan [Redux](//reduxjs.org) para manejar la data. Nosotros hemos creado la portabilidad de React-Redux a Inferno Para facilitar el proceso de portar la aplicación. 

## `Provider`

El componente `Provider` permite a la aplicación la conexion con un Redux store. 

**Advertencia:** El `store` prop en `Provider` no debe de cambiar dinamicamente y no es soportado en `Inferno-redux`. 

```jsx
import Inferno from 'inferno'
import { Provider } from 'inferno-redux'
import { createStore } from 'redux'

// Component Declarations... 

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

La función `connect` permite a los componentes accesar a los redux store states 
