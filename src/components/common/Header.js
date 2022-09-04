import {Component, version, createTextVNode} from 'inferno';
import {Link, withRouter} from 'inferno-router';
import IconMenu from '../icons/IconMenu';
import InfernoLogo from '../icons/IconInferno';
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

    this.closeSidebar = this.closeSidebar.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  componentDidMount() {
    const main = document.querySelector('body');
    main.addEventListener('click', this.closeSidebar, isPassive);
  }

  componentWillUnmount() {
    const main = document.querySelector('body');
    main.removeEventListener('click', this.closeSidebar, isPassive);
  }

  closeSidebar() {
    this.setState({
      active: false,
      activeDropdown: false
    });
  }

  toggleSidebar() {
    this.setState({ active: !this.state.active });
  }

  render() {
    const { location, match } = this.props;
    const locationURL = location.pathname;
    const showLogo = locationURL !== '/';

    return (
      <div className="menu">
        <div className="container">
          <div className="row">
            <div className="menu-toggle" onClick={ this.toggleSidebar }>
              <IconMenu/>
            </div>
            <MenuLink match={match} to="/" className="branding lg3 sm3">
              {showLogo && <InfernoLogo globalAnimationKey="main-logo" animation="AnimateLogo" />} Inferno <small>v{version}</small>
            </MenuLink>
            <nav className={ 'lg9 sm9 ' + (this.state.active ? 'open' : 'closed') }>
              <MenuLink match={match} to="/">Home</MenuLink>
              <MenuLink match={match} to="/docs/guides/installation">Quick Start</MenuLink>
              <MenuLink match={match} to="/docs/api/inferno">API</MenuLink>
              <MenuLink match={match} to="https://github.com/infernojs">Github</MenuLink>
              <MenuLink match={match} to="https://github.com/infernojs/inferno/releases">Release notes</MenuLink>
              <MenuLink match={match} to="https://opencollective.com/inferno">Open collective</MenuLink>
              <MenuLink match={match} to="https://discord.gg/SUKuhgaBpF">Discord</MenuLink>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);

function getMenuClassName(props, url) {
  // Hacky solution to highlight the correct menu item
  const classNames = props.className ? props.className.split(' ') : [];

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
