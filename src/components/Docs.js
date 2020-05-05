import {Component} from 'inferno';
import {Link} from 'inferno-router';

export default class Docs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: null,
      prevURL: null
    };
  }

  componentWillReceiveProps({ match }) {
    this.loadDocument(match.params.path);
  }

  componentDidMount() {
    const { match } = this.props;
    this.loadDocument(match.params.path || 'guides/installation');
  }

  loadDocument = (to, changeRoute) => {
    const { router } = this.context;
    const path = '/' + to.replace('/docs/', '');

    if (changeRoute) {
      return router.history.push(to);
    }

    fetch(`/api/markdown?file=${path}`)
      .then(response => response.json())
      .then(response => {
        this.setState({ markdown: response });
      });
  };

  render() {
    const { match } = this.props;

    const navigationAPI = (
      <ul className="nav">
        <li className="nav-item active">
          <h4>API</h4>
          <ul className="nav">
            <MenuLink match={match} to={'/docs/api/inferno'}>Inferno</MenuLink>
            <MenuLink match={match} to={'/docs/api/inferno-server'}>Inferno-server</MenuLink>
            <MenuLink match={match} to={'/docs/api/inferno-mobx'}>Inferno-mobx</MenuLink>
            <MenuLink match={match} to={'/docs/api/inferno-redux'}>Inferno-redux</MenuLink>
            <MenuLink match={match} to={'/docs/api/inferno-router'}>Inferno-router</MenuLink>
            <MenuLink match={match} to={'/docs/api/inferno-test-utils'}>Inferno-test-utils</MenuLink>
            <MenuLink match={match} to={'/docs/api/inferno-vnode-flags'}>Inferno-vnode-flags</MenuLink>
          </ul>
        </li>
      </ul>
    );

    const navigationGuides = (
      <ul className="nav">
        <li className="nav-item active">
          <h4>Guides</h4>
          <ul className="nav">
            <MenuLink match={match} to={'/docs/guides/installation'}>Installation</MenuLink>
            <MenuLink match={match} to={'/docs/guides/using-cdn'}>Using CDN</MenuLink>
            <MenuLink match={match} to={'https://jsfiddle.net/rq5L9fgs/'}>JS Fiddle</MenuLink>
            <MenuLink match={match} to={'/docs/guides/getting-started'}>Getting Started</MenuLink>
            <MenuLink match={match} to={'/docs/guides/components'}>Components</MenuLink>
            <MenuLink match={match} to={'/docs/guides/libraries'}>Community Libraries</MenuLink>
            <MenuLink match={match} to={'/docs/guides/event-handling'}>Event Handling</MenuLink>
            <MenuLink match={match} to={'/docs/guides/forms'}>Forms</MenuLink>
            <MenuLink match={match} to={'/docs/guides/brunch'}>Brunch Builder</MenuLink>
            <MenuLink match={match} to={'/docs/guides/switching-to-inferno'}>Switching to Inferno</MenuLink>
          </ul>
        </li>
        <li className="nav-item active">
          <h4>Advanced</h4>
          <ul className="nav">
            {/*<MenuLink match={match} to={'/docs/guides/what-is-virtual-dom'}>What is Virtual DOM?</MenuLink>*/}
            <MenuLink match={match} to={'/docs/guides/what-is-jsx'}>What is JSX?</MenuLink>
            <MenuLink match={match} to={'/docs/guides/alternatives-to-jsx'}>Alternatives to JSX</MenuLink>
            <MenuLink match={match} to={'/docs/guides/devtools'}>Dev Tools</MenuLink>
            {/*<MenuLink match={match} to={'/docs/guides/state'}>State</MenuLink>*/}
            <MenuLink match={match} to={'/docs/guides/routing'}>Routing</MenuLink>
            <MenuLink match={match} to={'/docs/guides/server-side-rendering'}>Server-side rendering</MenuLink>
            <MenuLink match={match} to={'/docs/guides/isomorphic'}>Isomorphic</MenuLink>
            {/*<MenuLink match={match} to={'/docs/guides/testing'}>Testing</MenuLink>*/}
            <MenuLink match={match} to={'/docs/guides/typescript-support'}>TypeScript Support</MenuLink>
            <MenuLink match={match} to={'/docs/guides/optimizations'}>Optimizations</MenuLink>
            <MenuLink match={match} to={'/docs/guides/benefits/list-rendering'}>Lists & keys</MenuLink>
          </ul>
        </li>
      </ul>
    );

    return (
      <section className="columns docs row">
        <aside className="docs-menu">
          {
            match && match.url.includes('api/')
            ? navigationAPI
            : navigationGuides
          }
        </aside>
        <aside className="column docs-content" id="markdown-root">
          {this.state.markdown}
        </aside>
      </section>
    );
  }
}

const MenuLink = ({ match, to, children }) => {
  if (to.indexOf('http') === 0) {
    return <li><a target="_blank" rel="noopener noreferrer" href={to}>{children}</a></li>;
  }

  const className = match.url === to ? "nav-item selected" : "nav-item";
  return <li>
    <Link className={className} to={to}>
      {children}
    </Link>
  </li>;
};
