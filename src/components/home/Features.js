import Inferno from 'inferno'
import IconArchitecture from '../icons/IconArchitecture'
import IconCompatible from '../icons/IconCompatible'
import IconIsomorphic from '../icons/IconIsomorphic'
import IconModular from '../icons/IconModular'
import IconSize from '../icons/IconSize'
import IconSpeed from '../icons/IconSpeed'

export default function() {
    return <div className="container">
        <div className="row features-wrapper">
            <div className="xs12 lg4 row">
                <IconSize/>
                <div className="desc">
                    <h2>Tiny Size</h2>
                    <p>Inferno is much smaller in size, 7kb vs 45kb gzip. This means inferno is faster to transfer over the network and much faster to parse.</p>
                </div>
            </div>
            <div className="xs12 lg4 row">
                <IconCompatible/>
                <div className="desc">
                    <h2>React Compatible</h2>
                    <p>React-like API, concepts and component lifecycle events. Switch over easily with inferno-compact.</p>
                </div>
            </div>
            <div className="xs12 lg4 row">
                <IconSpeed/>
                <div className="desc">
                    <h2>Fastest</h2>
                    <p>One the fastest front-end frameworks for rendering UI in the DOM.</p>
                </div>
            </div>
            <div className="xs12 lg4 row">
                <IconArchitecture/>
                <div className="desc">
                    <h2>One-way Architecture</h2>
                    <p>Component driven + One-way data flow architecture. Coupling with Redux, MobX or Ceberal supported.</p>
                </div>
            </div>
            <div className="xs12 lg4 row">
                <IconIsomorphic/>
                <div className="desc">
                    <h2>Isomorphic</h2>
                    <p>Isomorphic rendering on both client and server with the inferno-server package.</p>
                </div>
            </div>
            <div className="xs12 lg4 row">
                <IconModular/>
                <div className="desc">
                    <h2>Modular</h2>
                    <p>Highly modular with very little opinion of how things should be done.</p>
                </div>
            </div>
        </div>
    </div>
}
