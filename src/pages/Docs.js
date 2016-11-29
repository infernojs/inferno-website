import Inferno from 'inferno'
import { Link } from 'inferno-router'
import CommonMark from 'commonmark'
import InfernoRenderer from '../components/markdown/InfernoRenderer'

export default function({ params }) {
    console.log(params)

    let MarkdownResult = ''
    if (process.env.BROWSER) {
        const file = params.file || 'overview.md'
        console.warn(`../docs/${file}`)
        const page = require('../docs/guides/overview.md')
        const parser = new CommonMark.Parser();
        const renderer = new InfernoRenderer();

        const input = '# This is a header\n\nAnd this is a paragraph';
        const ast = parser.parse(page);
        MarkdownResult = renderer.render(ast);
    }

    return <div className="container padding markdown">
        <aside>
            <Link to="/docs/guides/overview.md">Overview</Link>
            <Link to="/docs/guides/installation.md">Installation</Link>
        </aside>
        <aside>
            {MarkdownResult}
        </aside>
    </div>
}
