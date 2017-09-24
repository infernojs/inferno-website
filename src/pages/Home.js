import Benchmarks from '../components/home/Benchmarks'
import Component from 'inferno-component'
import ContentAccordion from '../components/common/ContentAccordion'
import Features from '../components/home/Features'
import IconBenchmark from '../components/icons/IconBenchmark'
import Inferno from 'inferno'
import InfernoLogo from '../components/icons/IconInferno'
import { Link } from 'inferno-router'

export default class Home extends Component {
  render() {
    return <div className="home">
      <div className="hero-banner row">
        <div className="logo xs12 sm3">
          <InfernoLogo/>
        </div>
        <div className="logo-text sm9">
          <h1>Inferno
            <small>v{Inferno.version}</small>
          </h1>
          <h2>An extremely fast React-like JavaScript library for building modern user interfaces in only 9 kb gzip.</h2>
          <div className="buttons">
            <Link className="button xs8" to="/docs/guides/installation">Get Started</Link>
            <a className="button second xs8" target="_blank" href="https://github.com/infernojs/inferno" rel="noopener">GitHub</a>
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
    </div>
  }
}
