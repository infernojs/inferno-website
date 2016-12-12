import Inferno from 'inferno'
import Component from 'inferno-component'
import { transform } from 'babel-core'

const options = {
    plugins: [
        "transform-es2015-arrow-functions",
        "transform-es2015-block-scoped-functions",
        "transform-es2015-block-scoping",
        "transform-es2015-classes",
        "transform-es2015-computed-properties",
        "transform-es2015-literals",
        "transform-es2015-parameters",
        "transform-es2015-shorthand-properties",
        "transform-es2015-spread",
        "transform-es2015-template-literals",
        "transform-class-properties",
        "transform-es2015-modules-commonjs",
        "transform-es2015-destructuring",
        "transform-object-rest-spread",
        "babel-plugin-inferno"
    ]
}

function compile(code) {
    try {
        const transformedCode = transform(code, options).code
        const ExportedComponent = eval(transformedCode)
        const infernoResult = <ExportedComponent/>
        return infernoResult
    } catch(ex) {
        return 'Please do not use: import, require, console.log'
    }
}

export default class REPL extends Component {

    compile = (e) => {
        e.preventDefault()
        const code = `
        import Inferno from 'inferno';
        
        export default function() {
            return <div>it works! {JSON.stringify(process.env)}</div>;
        }`;

        this.setState({ vNodes: compile(code) })
        this.forceUpdate()
        /*

        const code222 = `
        import Inferno from 'inferno';
        import Component from 'inferno-component';

        export default class Hello extends Component {
            render() {
                return <div>it works!</div>;
            }
        }
        `;

        fetchPOST(code).then(response => {
            this.setState({ vNodes: response })
            this.forceUpdate()
        })*/
        console.log('+++')
    }

    render() {
        return <div className="repl">
            <h2>REPL</h2>
            <button onClick={this.compile}>Test</button>
            <div>{this.state.vNodes}</div>
        </div>
    }
}

function fetchPOST(code) {
    const data = new FormData();
    data.append('code', code)

    return fetch('/api/repl', {
        body: data,
        method: 'POST'
    }).then(response => response.json())
}
