import Inferno from 'inferno'
import InfernoLogo from './Common/Logo'

function componentDidMount() {
    document.title = 'Home'
}

export default function() {
    return <div className="home">
        <div className="hero-banner">
            <div className="row">
                <div>
                    <InfernoLogo height="130" width="130" showName={false}/>
                </div>
                <div>
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
                <article>
                    <h2>Tiny Size</h2>
                    <p>Lightweight filesize of only 6kb.</p>
                </article>
                <article>
                    <h2>React Compatible</h2>
                    <p>React-like API, concepts and component lifecycle events.</p>
                </article>
                <article>
                    <h2>Modular</h2>
                    <p>Highly modular with very little opinionation of how things should be done.</p>
                </article>
            </div>
        </section>
    </div>
}
