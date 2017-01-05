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
                    <p>Inferno is much smaller in size, 9kb vs 45kb gzip. This means inferno is faster to transfer over the network and much faster to parse.</p>
                </div>
            </div>
            <div className="xs12 lg4 row">
                <IconCompatible/>
                <div className="desc">
                    <h2>React Compatible</h2>
                    <p>React-like API, concepts and component lifecycle events. Switch over easily with inferno-compat.</p>
                </div>
            </div>
            <div className="xs12 lg4 row">
                <IconSpeed/>
                <div className="desc">
                    <h2>Insane Performance</h2>
                    <p>One of the fastest front-end frameworks for rendering UI in the DOM, making 60 FPS on mobile possible.</p>
                </div>
            </div>
            <div className="xs12 lg4 row">
                <IconArchitecture/>
                <div className="desc">
                    <h2>One-way Architecture</h2>
                    <p>Component driven + One-way data flow architecture. Bindings also supplied for Redux, MobX and Cerebral.</p>
                </div>
            </div>
            <div className="xs12 lg4 row">
                <IconIsomorphic/>
                <div className="desc">
                    <h2>Isomorphic</h2>
                    <p>Isomorphic rendering on both client and server, along with fast-booting from server-side renders.</p>
                </div>
            </div>
            <div className="xs12 lg4 row">
                <IconModular/>
                <div className="desc">
                    <h2>Modular</h2>
                    <p>Highly modular with very little opinion of how things should be done, removing bloat and unecessary overhead.</p>
                </div>
            </div>
        </div>
    </div>
}
