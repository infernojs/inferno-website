import Inferno from 'inferno'
import Component from 'inferno-component'
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
		this.loadDocument(params.path || '/docs/guides/get-started.md')
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
                    <MenuLink to={'/docs/guides/installation.md'}>Installation</MenuLink>
                    <MenuLink to={'/docs/guides/getting-started.md'}>Getting Started</MenuLink>
                    <MenuLink to={'/docs/guides/what-is-jsx.md'}>What is JSX?</MenuLink>
                    <MenuLink to={'/docs/guides/project-layout.md'}>Project Layout</MenuLink>
                    <MenuLink to={'/docs/guides/event-handling.md'}>Event Handling</MenuLink>
                    <MenuLink to={'/docs/guides/form-input.md'}>Form Input</MenuLink>
                    <MenuLink to={'/docs/guides/creating-components.md'}>Components</MenuLink>
                </ul>
                <h3>Advanced</h3>
                <ul>
                    <MenuLink to={'/docs/guides/what-is-virtual-dom.md'}>What is Virtual DOM?</MenuLink>
                    <MenuLink to={'/docs/guides/alternatives-to-jsx.md'}>Alternatives to JSX</MenuLink>
                    <MenuLink to={'/docs/guides/devtools.md'}>Dev Tools</MenuLink>
                    <MenuLink to={'/docs/guides/state.md'}>State</MenuLink>
                    <MenuLink to={'/docs/guides/routing.md'}>Routing</MenuLink>
                    <MenuLink to={'/docs/guides/server-side-rendering.md'}>Server-side rendering</MenuLink>
                    <MenuLink to={'/docs/guides/testing.md'}>Testing</MenuLink>
                    <MenuLink to={'/docs/guides/typescriot-support.md'}>TypeScript Support</MenuLink>
                </ul>
                <h3>Meta</h3>
                <ul>
                    <MenuLink to={'/docs/guides/comparisons-with-other-frameworks.md'}>Comparisons with Other Frameworks</MenuLink>
                    <MenuLink to={'https://inferno-slack.herokuapp.com/'}>Join the Inferno Community</MenuLink>
                </ul>
                <h3>API</h3>
                <ul>
                    <MenuLink to={'/docs/api/inferno.md'}>Inferno</MenuLink>
                    <MenuLink to={'/docs/api/inferno-compat.md'}>Inferno-compat</MenuLink>
                    <MenuLink to={'/docs/api/inferno-component.md'}>Inferno-component</MenuLink>
                    <MenuLink to={'/docs/api/inferno-create-class.md'}>Inferno-create-class</MenuLink>
                    <MenuLink to={'/docs/api/inferno-create-element.md'}>Inferno-create-element</MenuLink>
                    <MenuLink to={'/docs/api/inferno-hyperscript.md'}>Inferno-hyperscript</MenuLink>
                    <MenuLink to={'/docs/api/inferno-component.md'}>Inferno-devtools</MenuLink>
                    <MenuLink to={'/docs/api/inferno-mobx.md'}>Inferno-mobx</MenuLink>
                    <MenuLink to={'/docs/api/inferno-redux.md'}>Inferno-redux</MenuLink>
                    <MenuLink to={'/docs/api/inferno-router.md'}>Inferno-router</MenuLink>
                    <MenuLink to={'/docs/api/inferno-server.md'}>Inferno-server</MenuLink>
                    <MenuLink to={'/docs/api/inferno-test-utils.md'}>Inferno-test-utils</MenuLink>
                    <MenuLink to={'/docs/api/inferno-test-utils.md'}>Inferno-vnode-flags</MenuLink>
                </ul>
			</aside>
			<aside className="docs-content" id="markdown-root">
				{this.state.markdown}
			</aside>
		</section>
    }
}

/*
let markdown = ''

function onComponentDidMount() {
	fetch('/api/markdown?file=guides/installation.md')
	.then(response => response.json())
	.then(response => {
		markdown = response
	})
}

function DocsContent() {
	if (process.env.BROWSER) {
		document.title = 'About'
	}
	return <aside id="markdown-root">
		<DocsContent onComponentDidMount={onComponentDidMount}/>
	</aside>
}

export default function Docs() {
	if (process.env.BROWSER) {
		document.title = 'About'
	}
	return <aside id="markdown-root">
		<DocsContent/>
	</aside>
}*/

function toArray(arr) {
    return Array.isArray(arr) ? arr : [arr]
}

/*
    render() {
        return <div className="container padding markdown">
            <aside>
                <Link to="/docs/guides/overview.md">Overview</Link>
                <Link to="/docs/guides/installation.md">Installation</Link>
            </aside>
            <aside id="markdown-root"/>
        </div>
    }
* */
