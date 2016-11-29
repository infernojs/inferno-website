import Inferno from 'inferno'
import InfernoLogo from '../components/common/Logo'

export default function() {
    return <div className="home">
        <div className="hero-banner">
            <div className="row">
                <div className="col-xs-3 col-md-1">
                    <InfernoLogo showName={false}/>
                </div>
                <div className="col-xs-3 col-md-2">
                    <h1>Inferno</h1>
                    <h2>
                        An extremely fast React-like javascript library for building modern user interfaces
                    </h2>
                    <div>
                        <a className="button">Get Started</a>
                        <a className="button" href="https://github.com/trueadm/inferno">Github</a>
                    </div>
                </div>
            </div>
        </div>
        <section>
            <div className="container">
                <div className="row">
                <div className="col-xs-3 col-md-1">
                    <h2>Tiny Size</h2>
                    <p>Inferno is much smaller in size, 7kb vs 45kb gzip. This means inferno is faster to transfer over the network and much faster to parse.</p>
                </div>
                <div className="col-xs-3 col-md-1">
                    <h2>React Compatible</h2>
                    <p>React-like API, concepts and component lifecycle events. Switch over easily with inferno-compact.</p>
                </div>
                <div className="col-xs-3 col-md-1">
                    <h2>Fastest</h2>
                    <p>One the fastest front-end frameworks for rendering UI in the DOM.</p>
                </div>

                    <div className="col-xs-3 col-md-1">
                    <h2>One-way Architecture</h2>
                    <p>Component driven + One-way data flow architecture. Coupling with Redux, MobX or Ceberal supported.</p>
                </div>
                <div className="col-xs-3 col-md-1">
                    <h2>Isomorphic</h2>
                    <p>Isomorphic rendering on both client and server with the inferno-server package.</p>
                </div>
                <div className="col-xs-3 col-md-1">
                    <h2>Modular</h2>
                    <p>Highly modular with very little opinion of how things should be done.</p>
                </div>

                    </div>

            </div>
        </section>
    </div>
}
