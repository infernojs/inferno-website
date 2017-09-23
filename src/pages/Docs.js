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
                    <MenuLink to={'/docs/guides/using-cdn'}>Using CDN</MenuLink>
                    <MenuLink to={'/docs/guides/getting-started'}>Getting Started</MenuLink>
                    <MenuLink to={'/docs/guides/components'}>Components</MenuLink>
                    <MenuLink to={'/docs/guides/event-handling'}>Event Handling</MenuLink>
                    {/*<MenuLink to={'/docs/guides/project-layout'}>Project Layout</MenuLink>*/}
                    <MenuLink to={'/docs/guides/forms'}>Forms</MenuLink>
                    <MenuLink to={'/docs/guides/brunch'}>Brunch Builder</MenuLink>
                    <MenuLink to={'/docs/guides/switching-to-inferno'}>Switching to Inferno</MenuLink>
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
			</aside>
			<aside className="docs-content" id="markdown-root">
				{ this.state.markdown }
			</aside>
		</section>
    }
}
