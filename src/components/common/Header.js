import Inferno from 'inferno'
import Component from 'inferno-component'
import { Link } from 'inferno-router'
import classnames from 'classnames'
import IconMenu from '../icons/IconMenu'
import InfernoLogo from '../icons/IconInferno'
import isPassive from '../utils/isPassive'

export default class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active: false,
      activeDropdown: null,
    }
  }

  componentDidMount() {
    const main = document.querySelector('main')
    main.addEventListener('click', this.closeSidebar, isPassive)
  }

  componentWillUnmount() {
    const main = document.querySelector('main')
    main.removeEventListener('click', this.closeSidebar, isPassive)
  }

  closeSidebar = (e) => {
    this.setState({
      active: false,
      activeDropdown: false
    });
  }

  toggleSidebar = (e) => {
    this.setState({ active: !this.state.active });
  }

  openDropdown = (activeDropdown) => (e) => {
    e.preventDefault()
    this.setState({ activeDropdown });
  }

  render() {
    const { activeDropdown } = this.state
    const { router } = this.context
    const locationURL = router.location ? router.location.pathname : router.url

    const MenuLink = (props) => {
      const className = getMenuClassName(props, router)
      return <li>
        <Link to={props.to} className={className} onClick={this.closeSidebar}>
          {props.children}
        </Link>
      </li>
    }

    return (
    <div className="menu">
      <div className="container">
        <div className="row">
          <nav className={this.state.active ? 'open' : 'closed'}>

            <Link to="/" className={classnames("branding", { show: locationURL.length > 1 })}><InfernoLogo/> Inferno
              <small>v{Inferno.version}</small>
            </Link>

            <ul className="dropdown">
              <MenuLink to="/">Home</MenuLink>
              <MenuLink to="/docs/guides/installation">Docs</MenuLink>

              <li className="button-dropdown">
                <a className="dropdown-toggle" onClick={this.openDropdown('api')}>
                  API
                </a>
                <li className={classnames("dropdown-menu", { active: activeDropdown === 'api' })}>
                  <Link to={'/docs/api/inferno'}>Inferno</Link>
                  <Link to={'/docs/api/inferno-server'}>Inferno-server</Link>
                  <Link to={'/docs/api/inferno-mobx'}>Inferno-mobx</Link>
                  <Link to={'/docs/api/inferno-redux'}>Inferno-redux</Link>
                  <Link to={'/docs/api/inferno-router'}>Inferno-router</Link>
                  <Link to={'/docs/api/inferno-test-utils'}>Inferno-test-utils</Link>
                  <Link to={'/docs/api/inferno-vnode-flags'}>Inferno-vnode-flags</Link>
                </li>
              </li>

              <li className="button-dropdown">
                <a className="dropdown-toggle" onClick={this.openDropdown('about')}>
                  About
                </a>
                <li className={classnames("dropdown-menu", { active: activeDropdown === 'about' })}>
                  <MenuLink to="/about">Inferno</MenuLink>
                  <a target="_blank" rel="noopener" href="https://github.com/infernojs/inferno/issues" onClick={this.closeSidebar}>Contribute</a>
                  <a target="_blank" rel="noopener" href="https://github.com/infernojs" onClick={this.closeSidebar}>Github</a>
                  <a target="_blank" rel="noopener" href="https://inferno-slack.herokuapp.com" onClick={this.closeSidebar}>Slack</a>
                  <a target="_blank" rel="noopener" href="https://twitter.com/inferno_js" onClick={this.closeSidebar}>Twitter</a>
                </li>
              </li>
              <MenuLink to="/repl">REPL</MenuLink>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    )
  }
}

function getMenuClassName(props, router) {
  // Hacky solution to highlight the correct menu item
  const classNames = props.className ? props.className.split(' ') : ['menu-item']
  const isDocs = router.url && router.url.includes('/docs/') && props.to.includes('/docs/')

  if (router.url && (router.url === props.to || isDocs)) {
    classNames.push('selected')
  }
  if (classNames.indexOf('branding') !== -1 && router.url !== '/') {
    classNames.push('show')
  }
  return classNames.join(' ')
}
