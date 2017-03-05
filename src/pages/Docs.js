import Component from 'inferno-component'
import Inferno from 'inferno'
import { Link } from 'inferno-router'

export default class Docs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            markdown: null,
            prevURL: null
        }
    }

    componentWillReceiveProps({ params }) {
        this.loadDocument(params.path)
    }

    componentDidMount() {
        const { params } = this.props
		this.loadDocument(params.path || '/guides/installation')
    }

	loadDocument = (to, changeRoute) => {
        const { router } = this.context
        const path = '/' + to.replace('/docs/', '')

        if (changeRoute) {
            return router.push(to)
        }

        fetch(`/api/markdown?file=${path}`)
        .then(response => response.json())
        .then(response => {
            this.setState({ markdown: response })
        })
	}

    render() {
        const MenuLink = ({ to, children }) => {
            if (to.indexOf('http') === 0) {
                return <li><a target="_blank" rel="noopener" href={to}>{children}</a></li>
            }
            return <li>
                <Link activeClassName="selected" to={to}>
                    {children}
                </Link>
            </li>
        }

        return <section className="container docs row">
			<aside className="docs-menu">
				<h3>Guides</h3>
                <ul>
                    <MenuLink to={'/docs/guides/installation'}>Installation</MenuLink>
                    <MenuLink to={'/docs/guides/getting-started'}>Getting Started</MenuLink>
                    <MenuLink to={'/docs/guides/components'}>Components</MenuLink>
                    <MenuLink to={'/docs/guides/event-handling'}>Event Handling</MenuLink>
                    {/*<MenuLink to={'/docs/guides/project-layout'}>Project Layout</MenuLink>*/}
                    <MenuLink to={'/docs/guides/forms'}>Forms</MenuLink>
                    <MenuLink to={'/docs/guides/brunch'}>Brunch Builder</MenuLink>
                    <MenuLink to={'/docs/guides/switching-to-inferno'}>Switching to Inferno</MenuLink>
                </ul>
                <h3>API</h3>
                <ul>
                    <MenuLink to={'/docs/api/inferno'}>Inferno</MenuLink>
                    <MenuLink to={'/docs/api/inferno-server'}>Inferno-server</MenuLink>
                    <MenuLink to={'/docs/api/inferno-mobx'}>Inferno-mobx</MenuLink>
                    <MenuLink to={'/docs/api/inferno-redux'}>Inferno-redux</MenuLink>
                    <MenuLink to={'/docs/api/inferno-router'}>Inferno-router</MenuLink>
                    <MenuLink to={'/docs/api/inferno-test-utils'}>Inferno-test-utils</MenuLink>
                    <MenuLink to={'/docs/api/inferno-vnode-flags'}>Inferno-vnode-flags</MenuLink>
                </ul>
                <h3>Advanced</h3>
                <ul>
                    {/*<MenuLink to={'/docs/guides/what-is-virtual-dom'}>What is Virtual DOM?</MenuLink>*/}
                    <MenuLink to={'/docs/guides/what-is-jsx'}>What is JSX?</MenuLink>
                    <MenuLink to={'/docs/guides/alternatives-to-jsx'}>Alternatives to JSX</MenuLink>
                    <MenuLink to={'/docs/guides/devtools'}>Dev Tools</MenuLink>
                    {/*<MenuLink to={'/docs/guides/state'}>State</MenuLink>*/}
                    <MenuLink to={'/docs/guides/routing'}>Routing</MenuLink>
                    <MenuLink to={'/docs/guides/server-side-rendering'}>Server-side rendering</MenuLink>
                    {/*<MenuLink to={'/docs/guides/testing'}>Testing</MenuLink>*/}
                    <MenuLink to={'/docs/guides/typescript-support'}>TypeScript Support</MenuLink>
                    <MenuLink to={'/docs/guides/optimisations'}>Optimisations</MenuLink>
                    <MenuLink to={'/docs/guides/benefits/list-rendering'}>Lists & keys</MenuLink>
                </ul>
                <h3>Meta</h3>
                <ul>
                    {/*<MenuLink to={'/docs/guides/comparisons-with-other-frameworks'}>Comparisons with Other Frameworks</MenuLink>*/}
                    <MenuLink to={'https://inferno-slack.herokuapp.com/'}>Join the Inferno Community</MenuLink>
                </ul>
			</aside>
			<aside className="docs-content" id="markdown-root">
				{ this.state.markdown }
			</aside>
		</section>
    }
}
