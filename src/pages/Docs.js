import Inferno from 'inferno'
import Component from 'inferno-component'
import createElement from 'inferno-create-element'
import { Link } from 'inferno-router'

export default class Docs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            markdown: null
        }
    }

    componentDidMount() {
		this.loadDocument('guides/installation.md')()
    }

	loadDocument = (path) => () => {
		fetch(`/api/markdown?file=${path}`)
		.then(response => response.json())
		.then(response => {
			this.setState({ markdown: response })
			this.forceUpdate()
		})
	}

    render() {
        return <section className="docs row">
			<aside className="docs-menu">
				<h3>Guides</h3>
				<a onClick={this.loadDocument('guides/installation.md')}>Installation</a>
				<a onClick={this.loadDocument('guides/react-comparison.md')}>Comparison with React</a>
			</aside>
			<aside className="docs-content xs12 sm9" id="markdown-root">
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
