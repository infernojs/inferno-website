import Inferno from 'inferno'
import CommonMark from 'commonmark'
import InfernoRenderer from '../components/markdown/InfernoRenderer'

export default function() {
    let MarkdownResult = ''
    if (process.env.BROWSER) {
        const page = require('../docs/guides/installation.md')
        const parser = new CommonMark.Parser();
        const renderer = new InfernoRenderer();

        const input = '# This is a header\n\nAnd this is a paragraph';
        const ast = parser.parse(page);
        MarkdownResult = renderer.render(ast);
    }

    return <div className="container padding markdown">
        {MarkdownResult}
    </div>
}
