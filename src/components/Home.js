import {Component, createTextVNode, version} from 'inferno';
import ContentAccordion from './common/ContentAccordion';
import AnimateMovePromo from './demo/AnimateMovePromo';
import Features from './home/Features';
import InfernoLogo from './icons/IconInferno';
import {Community} from './common/Community';
import {Link} from 'inferno-router';

export default class Home extends Component {
  render() {
    return (
      <div className="home page container grid-lg">
        <div className="hide-sm" style={{ 'margin-bottom': '4rem' }}/>
        <div className="center">
          <div className="columns hero-banner">
            <div className="column col-4 col-sm-12 col-ml-auto">
              <div className="logo">
                <InfernoLogo globalAnimationKey="main-logo" animation="AnimateLogo" />
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

        <section className="demo">
          <h2>Inferno has native animation support <small>NEW in 8.0!</small></h2>
          <AnimateMovePromo/>
        </section>

        <section className="features">
          <Features/>
        </section>

        <div className="hide-xs" style={{ 'margin-bottom': '6rem' }}/>
        <div className="show-xs" style={{ 'margin-bottom': '3rem' }}/>

        <section>
          <h3 className="text-center" style={{ color: '#b9b9b9', marginBottom: '2rem' }}>
            Inferno is different, yet familiar...
          </h3>
          <BlockAnimOnMount>
            <ContentAccordion/>
          </BlockAnimOnMount>
        </section>

        <div className="hide-xs" style={{ 'margin-bottom': '6rem' }}/>
        <div className="show-xs" style={{ 'margin-bottom': '3rem' }}/>

        <Community/>
      </div>
    );
  }
}

function BlockAnimOnMount({ className, children }) {
  return <section className={className}>{children}</section>;
}
// These hooks will block child animations on mount/unmount
BlockAnimOnMount.defaultHooks = {
  onComponentDidAppear: () => {},
  onComponentWillDisappear: (dom, props, callback) => { callback(); }
};
