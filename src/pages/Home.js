import Benchmarks from '../components/home/Benchmarks'
import Component from 'inferno-component'
import ContentAccordion from '../components/common/ContentAccordion'
import Editor from '../components/repl/Editor'
import Features from '../components/home/Features'
import IconBenchmark from '../components/icons/IconBenchmark'
import Inferno from 'inferno'
import InfernoLogo from '../components/icons/IconInferno'
import { Link } from 'inferno-router'

const codeSample = `// Our default export
export default () => (
    <MyInfernoTest onComponentDidMount={onDidMount}/>
);

let time = (new Date()).toLocaleString()

const MyInfernoTest = () => (
    <h2>Current time: <span>{time.toString()}</span></h2>
);

// Update time
function onDidMount(domNode) {
    setInterval(function() {
        const span = domNode.querySelector('span');
        span.innerHTML = (new Date()).toLocaleString();
    }, 500)
}
`

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        this.setState({ loaded: true })
    }

    render() {
        return <div className="home">
            <div className="hero-banner row">
                <div className="logo xs12 sm3">
                    <InfernoLogo/>
                </div>
                <div className="logo-text sm9">
                    <h1>Inferno</h1>
                    <h2>An extremely fast React-like JavaScript library for building modern user interfaces.</h2>
                    <div className="buttons">
                        <Link className="button xs8" to="/docs/guides/installation">Get Started</Link>
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
                <div className="container">
                    <h3>Try Our Example</h3>
                    <Editor loaded={this.state.loaded}>
                        {codeSample}
                    </Editor>
                </div>
            </section>
        </div>
    }
}
