import Inferno, { linkEvent } from 'inferno'
import { Link } from 'inferno-router'
import InfernoLogo from '../components/icons/IconInferno'
import ContentAccordion from '../components/common/ContentAccordion'
import IconBenchmark from '../components/icons/IconBenchmark'
import Benchmarks from '../components/home/Benchmarks'
import Features from '../components/home/Features'
import Editor from '../components/repl/Editor'

const codeSample = `
// Our default export
export default () => {
    return <MyInfernoTest onComponentDidMount={onComponentDidMount}/>;
}

let time = (new Date()).toLocaleString()

function onComponentDidMount(domNode) {
    setInterval(function() {
        domNode.querySelector('span').innerHTML = (new Date()).toLocaleString()
    }, 1000)
}

const MyInfernoTest = () => {
    return <h2>Current time: <span>{time.toString()}</span></h2>;
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
                <h2>An extremely fast React-like JavaScript library for building modern user interfaces.</h2>
                <div className="buttons">
                    <Link className="button xs8" to="/docs/guides/getting-started.md">Get Started</Link>
                    <a className="button second xs8" target="_blank" href="https://github.com/infernojs/inferno/tree/master/examples" rel="noopener">Examples</a>
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
            <h3>Inferno is different, yet familiar</h3>
            <ContentAccordion/>
        </section>
        <section className="try">
            <h3>Try Our Example</h3>
            <Editor>{codeSample}</Editor>
        </section>
    </div>
}
