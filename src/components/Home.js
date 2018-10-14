import {Component, createTextVNode, version} from 'inferno';
import ContentAccordion from './common/ContentAccordion';
import Features from './home/Features';
import IconInferno from './icons/IconInferno';
import {Community} from './common/Community';
import {Link} from 'inferno-router';

export default class Home extends Component {
  render() {
    return (
      <div className="home container grid-lg">
        <div className="hide-sm" style={{ 'margin-bottom': '4rem' }}/>
        <div className="center">
          <div className="columns hero-banner">
            <div className="column col-4 col-sm-12 col-ml-auto">
              <div className="logo">
                <IconInferno/>
              </div>
            </div>
            <div className="column col-8 col-sm-12 col-mr-auto">
              <div className="logo-text">
                <h1>
                  Inferno
                  <small $HasVNodeChildren>{createTextVNode(`v${version}`)}</small>
                </h1>
                <h2>Inferno is an insanely fast, React-like library for building high-performance user interfaces on both the client and server.</h2>
                <div className="buttons">
                  <Link className="button" to="/docs/guides/installation">Get Started</Link>
                  <a className="button second"
                     target="_blank"
                     href="https://github.com/infernojs/inferno"
                     rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hide-xs" style={{ 'margin-bottom': '6rem' }}/>
        <div className="show-xs" style={{ 'margin-bottom': '3rem' }}/>

        <section className="features">
          <Features/>
        </section>

        <div className="hide-xs" style={{ 'margin-bottom': '6rem' }}/>
        <div className="show-xs" style={{ 'margin-bottom': '3rem' }}/>

        <section>
          <h3 className="text-center" style={{ color: '#b9b9b9', marginBottom: '2rem' }}>
            Inferno is different, yet familiar...
          </h3>
          <ContentAccordion/>
        </section>

        <div className="hide-xs" style={{ 'margin-bottom': '6rem' }}/>
        <div className="show-xs" style={{ 'margin-bottom': '3rem' }}/>

        <Community/>
      </div>
    );
  }
}
