import Inferno, { linkEvent } from 'inferno'
import InfernoLogo from '../components/icons/IconInferno'
import Benchmarks from '../components/common/Benchmarks'
import ContentAccordion from '../components/common/ContentAccordion'
import IconArchitecture from '../components/icons/IconArchitecture'
import IconBenchmark from '../components/icons/IconBenchmark'
import IconCompatible from '../components/icons/IconCompatible'
import IconIsomorphic from '../components/icons/IconIsomorphic'
import IconModular from '../components/icons/IconModular'
import IconSize from '../components/icons/IconSize'
import IconSpeed from '../components/icons/IconSpeed'

export default function() {
  return <div className="home">
    <div className="hero-banner row">
        <div className="logo xs12 sm3">
            <InfernoLogo/> </div>
        <div className="logo-text sm9">
            <h1>Inferno</h1>
            <h2>An extremely fast React-like javascript library for building modern user interfaces</h2>
            <div className="buttons">
                    <a className="button xs8">Get Started</a>
                    <a className="button second xs8" href="https://github.com/trueadm/inferno">Examples</a>
            </div>
        </div>
    </div>
    <section className="features">
        <div className="container">
            <div className="row">
                <div className="xs sm lg4">
                    <IconSize/>
                    <h2>Tiny Size</h2>
                    <p>Inferno is much smaller in size, 7kb vs 45kb gzip. This means inferno is faster to transfer over the network and much faster to parse.</p>
                </div>
                <div className="xs sm lg4">
                    <IconCompatible/>
                    <h2>React Compatible</h2>
                    <p>React-like API, concepts and component lifecycle events. Switch over easily with inferno-compact.</p>
                </div>
                <div className="xs sm lg4">
                    <IconSpeed/>
                    <h2>Fastest</h2>
                    <p>One the fastest front-end frameworks for rendering UI in the DOM.</p>
                </div>
                <div className="xs sm lg4">
                    <IconArchitecture/>
                    <h2>One-way Architecture</h2>
                    <p>Component driven + One-way data flow architecture. Coupling with Redux, MobX or Ceberal supported.</p>
                </div>
                <div className="xs sm lg4">
                    <IconIsomorphic/>
                    <h2>Isomorphic</h2>
                    <p>Isomorphic rendering on both client and server with the inferno-server package.</p>
                </div>
                <div className="xs sm lg4">
                    <IconModular/>
                    <h2>Modular</h2>
                    <p>Highly modular with very little opinion of how things should be done.</p>
                </div>
            </div>
        </div>
    </section>
    <section className="benchmarks container">
        <h3>
            <IconBenchmark/>
            Our Benchmarks
        </h3>
        <Benchmarks/>
    </section>
    <section className="compare-react container">
        <h3>React-like but, different.</h3>
        <ContentAccordion/>
    </section>
    <section className="try">
        <h3>Try Our Example</h3>
        <div className="container">
            <div className="row">
                <div className="lg7">
                    <h4>Todo List Component</h4>
                    <div className="code">CODE GOES HERE</div>
                </div>
                <div className="lg5">
                    <h4>Imports</h4>
                    <div className="code">CODE GOES HERE</div>
                </div>
            </div>
        </div>
    </section>
</div>
}
