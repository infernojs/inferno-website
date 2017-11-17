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
    })
  }

  toggleSidebar = (e) => {
    this.setState({ active: !this.state.active })
  }

  openDropdown = (activeDropdown) => (e) => {
    e.preventDefault()
    this.setState({ activeDropdown })
  }

  render() {
    const { router } = this.context
    const locationURL = router.location ? router.location.pathname : router.url

    const MenuLink = (props) => {
      const className = getMenuClassName(props, router.url)
      if (props.to.startsWith('http')) {
        return (
          <a href={props.to} target="_blank" rel="noopener noreferrer" className={className}>
            {props.children}
          </a>
        )
      }
      return (
        <Link to={props.to} className={className}>
          {props.children}
        </Link>
      )
    }

    return (
      <header className="header">
        <div className="navbar">
          <section className="navbar-brand">
            <Link to="/" className={classnames("branding", { show: locationURL.length > 1 })}>
              <InfernoLogo/>
              <span className="hide-sm">
                Inferno
                <small className="hide-md">v{Inferno.version}</small>
              </span>
            </Link>
          </section>
          <section className="navbar-section">
            <MenuLink to="/">Home</MenuLink>
            <MenuLink to="/docs/guides/installation">Quick Start</MenuLink>
            <MenuLink to="/docs/api/inferno">API</MenuLink>
            <MenuLink to="https://github.com/infernojs">Github</MenuLink>
            <MenuLink to="https://inferno-slack.herokuapp.com">Slack</MenuLink>
            {/*<MenuLink to="/repl">REPL</MenuLink>*/}
          </section>
        </div>
      </header>
    )
  }
}

function getMenuClassName(props, url) {
  // Hacky solution to highlight the correct menu item
  const classNames = props.className ? props.className.split(' ') : ['menu-item']

  if (url && props.to.split('/').length > 2) {
    if (url.includes('/docs/guides') && props.to.includes('/docs/guides') ||
      (url.includes('/docs/api') && props.to.includes('/docs/api'))) {
      classNames.push('selected')
      return classNames.join(' ')
    }
  }

  if (url && (url === props.to)) {
    classNames.push('selected')
  }
  if (classNames.indexOf('branding') !== -1 && url !== '/') {
    classNames.push('show')
  }
  return classNames.join(' ')
}
