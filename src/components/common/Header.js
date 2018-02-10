import {Component, version, createTextVNode} from 'inferno';
import {Link, withRouter} from 'inferno-router';
import classnames from 'classnames';
import {IconInferno} from '../icons/IconInferno';
import isPassive from '../utils/isPassive';

const MenuLink = (props) => {
  const className = getMenuClassName(props, props.match.url);
  if (props.to.startsWith('http')) {
    return (
      <a href={props.to} target="_blank" rel="noopener noreferrer" className={className}>
        {props.children}
      </a>
    );
  }
  return (
    <Link to={props.to} className={className}>
      {props.children}
    </Link>
  );
};

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      activeDropdown: null,
    };
  }

  componentDidMount() {
    const main = document.querySelector('main');
    main.addEventListener('click', this.closeSidebar, isPassive);
  }

  componentWillUnmount() {
    const main = document.querySelector('main');
    main.removeEventListener('click', this.closeSidebar, isPassive);
  }

  closeSidebar = () => {
    this.setState({
      active: false,
      activeDropdown: false
    });
  };

  toggleSidebar = () => {
    this.setState({ active: !this.state.active });
  };

  openDropdown = (activeDropdown) => (e) => {
    e.preventDefault();
    this.setState({ activeDropdown });
  };

  render() {
    const { location, match } = this.props;
    const locationURL = location.pathname;

    return (
      <header className="header">
        <div className="navbar">
          <section className="navbar-brand">
            <Link to="/" className={classnames("branding", { show: locationURL.length > 1 })}>
              <IconInferno/>
              <span className="hide-sm">
                Inferno
                <small className="hide-md" $HasVNodeChildren>{createTextVNode(`v${version}`)}</small>
              </span>
            </Link>
          </section>
          <section className="navbar-section">
            <MenuLink match={match} to="/">Home</MenuLink>
            <MenuLink match={match} to="/docs/guides/installation">Quick Start</MenuLink>
            <MenuLink match={match} to="/docs/api/inferno">API</MenuLink>
            <MenuLink match={match} to="https://github.com/infernojs">Github</MenuLink>
            <MenuLink match={match} to="https://inferno-slack.herokuapp.com">Slack</MenuLink>
          </section>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);

function getMenuClassName(props, url) {
  // Hacky solution to highlight the correct menu item
  const classNames = props.className ? props.className.split(' ') : ['menu-item'];

  if (url && props.to.split('/').length > 2) {
    if (url.includes('/docs/guides') && props.to.includes('/docs/guides') ||
      (url.includes('/docs/api') && props.to.includes('/docs/api'))) {
      classNames.push('selected');
      return classNames.join(' ');
    }
  }

  if (url && (url === props.to)) {
    classNames.push('selected');
  }
  if (classNames.indexOf('branding') !== -1 && url !== '/') {
    classNames.push('show');
  }
  return classNames.join(' ');
}
