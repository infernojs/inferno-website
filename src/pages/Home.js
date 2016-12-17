import Inferno, { linkEvent } from 'inferno'
import InfernoLogo from '../components/icons/IconInferno'
import ContentAccordion from '../components/common/ContentAccordion'
import IconBenchmark from '../components/icons/IconBenchmark'
import Benchmarks from '../components/home/Benchmarks'
import Features from '../components/home/Features'
import Editor from '../components/repl/Editor'

const codeSample = `
export default function MainComponent() {
    return <MyInfernoTest/>;
}

const MyInfernoTest = () => {
    return <h2>It works!</h2>;
}
`

export default function() {
    return <div className="home">
        <div className="hero-banner row">
            <div className="logo xs12 sm3">
                <InfernoLogo/>
            </div>
            <div className="logo-text sm9">
                <h1>Inferno</h1>
                <h2>An extremely fast React-like javascript library for building modern user interfaces.</h2>
                <div className="buttons">
                    <a className="button xs8" rel="noopener">Get Started</a>
                    <a className="button second xs8" href="https://github.com/trueadm/inferno" rel="noopener">Examples</a>
                </div>
            </div>
        </div>
        <section className="features">
            <Features/>
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
            <Editor>{codeSample}</Editor>
        </section>
    </div>
}
