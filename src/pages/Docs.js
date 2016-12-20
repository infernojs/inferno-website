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
                    <MenuLink to={'/docs/guides/get-started.md'}>Get Started</MenuLink>
                    <MenuLink to={'/docs/guides/installation.md'}>Installation</MenuLink>
                    <MenuLink to={'/docs/guides/react-comparison.md'}>Comparison with React</MenuLink>
                </ul>
                <h3>API</h3>
                <ul>
                    <MenuLink to={'/docs/api/inferno.md'}>Inferno</MenuLink>
                    <MenuLink to={'/docs/api/inferno-compat.md'}>Inferno-compat</MenuLink>
                    <MenuLink to={'/docs/api/inferno-component.md'}>Inferno-component</MenuLink>
                    <MenuLink to={'/docs/api/inferno-create-class.md'}>Inferno-create-class</MenuLink>
                    <MenuLink to={'/docs/api/inferno-create-element.md'}>Inferno-create-element</MenuLink>
                    {/*<MenuLink to={'/docs/api/inferno-hyperscript.md'}>Inferno-hyperscript</MenuLink>*/}
                    <MenuLink to={'/docs/api/inferno-mobx.md'}>Inferno-mobx</MenuLink>
                    <MenuLink to={'/docs/api/inferno-redux.md'}>Inferno-redux</MenuLink>
                    <MenuLink to={'/docs/api/inferno-router.md'}>Inferno-router</MenuLink>
                    <MenuLink to={'/docs/api/inferno-server.md'}>Inferno-server</MenuLink>
                    {/*<MenuLink to={'/docs/api/inferno-test-utils.md'}>Inferno-test-utils</MenuLink>*/}
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
