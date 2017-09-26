import Inferno from 'inferno'
// import IconArchitecture from '../icons/IconArchitecture'
// import IconCompatible from '../icons/IconCompatible'
// import IconIsomorphic from '../icons/IconIsomorphic'
// import IconModular from '../icons/IconModular'
// import IconSize from '../icons/IconSize'
// import IconSpeed from '../icons/IconSpeed'

export default function() {
  return <div className="container">
    <div className="row features-wrapper">
      <div className="xs6 lg6 row">
        {/*<IconCompatible/>*/}
        <div className="desc">
          <h2>React Compatible</h2>
          <p>React-like API, concepts and component lifecycle events. Switch over easily with inferno-compat.</p>
        </div>
      </div>
      <div className="xs6 lg6 row">
        {/*<IconSpeed/>*/}
        <div className="desc">
          <h2>Insane Performance</h2>
          <p>One of the fastest front-end frameworks for rendering UI in the DOM, making 60 FPS on mobile possible.</p>
        </div>
      </div>
      <div className="xs6 lg6 row">
        {/*<IconArchitecture/>*/}
        <div className="desc">
          <h2>One-way Architecture</h2>
          <p>Component driven + One-way data flow architecture. Bindings also supplied for Redux, MobX and Cerebral.</p>
        </div>
      </div>
      <div className="xs6 lg6 row">
        {/*<IconIsomorphic/>*/}
        <div className="desc">
          <h2>Isomorphic</h2>
          <p>Isomorphic rendering on both client and server, along with fast-booting from server-side renders.</p>
        </div>
      </div>
    </div>
  </div>
}
