import Inferno from 'inferno'
import Component from 'inferno-component'
import babelPluginInferno from 'babel-plugin-inferno'
import Loading from '../components/repl/Loading'

window.Inferno = Inferno;

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

function compile(jsxCode) {
    try {
        const { code } = window.compiler.transform(jsxCode, options)
        const ExportedComponent = eval(code)
        const infernoResult = <ExportedComponent/>
        return infernoResult
    } catch(ex) {
        console.error('Compiler Error:', ex)
    }
}

const codeSample2 = `
export default function test() {
    return <div>it works! {JSON.stringify(process.env)}</div>;
}
`;
const codeSample = `
function findSequence(goal) {
  function find(start, history) {
    if (start == goal)
      return history;
    else if (start > goal)
      return null;
    else
      return find(start + 5, "(" + history + " + 5)") ||
             find(start * 3, "(" + history + " * 3)");
  }
  return find(1, "1");
}
`;

export default class REPL extends Component {

    componentWillMount() {
        const self = this

        // Execute code when Babel is available
        if (!window.compiler) {
            Object.defineProperty(window, 'Babel', {
                writeable: true,
                set(val) {
                    window.compiler = val
                    window.compiler.registerPlugin('babel-plugin-inferno', babelPluginInferno)
                }
            })
        }

        // Execute code when CodeMirror is available
        let intval = setInterval(() => {
            if (window.CodeMirror) {
                console.debug('Loaded')
                self.setState({ loaded: true })
                clearInterval(intval)
            }
        }, 50)
    }

    componentDidUpdate() {
        if (!window.editor && window.CodeMirror) {
            const textArea = document.getElementById('repl-editor')
            window.editor = new CodeMirror.fromTextArea(textArea, {
                theme: "neo",
                lineNumbers: true,
                styleActiveLine: true
            })
            console.debug('Initialized')
        }
    }

    compile = (e) => {
        e.preventDefault()
        this.setState({ vNodes: compile(codeSample) })
    }

    render() {
        return <div className="repl">
            <ScriptLoader condition={!window.compiler}
                          src="https://unpkg.com/babel-standalone@6/babel.min.js"/>
            <ScriptLoader condition={!window.editor}
                          src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/codemirror.min.js"/>
            <ScriptLoader condition={!window.editor && this.state.loaded}
                          onload={() => window.editor.setOption('mode', 'javascript')}
                          src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/mode/javascript/javascript.min.js"/>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/codemirror.min.css" rel="stylesheet"/>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/theme/neo.min.css" rel="stylesheet"/>

            <h1>REPL</h1>
            <div className="repl-editor">
                {this.state.loaded || <Loading/>}
                <textarea id="repl-editor" className={this.state.loaded ? '' : 'hidden'} value={codeSample}/>
            </div>
            <button onClick={this.compile}>Test</button>
            <div>{this.state.vNodes}</div>
        </div>
    }
}

function ScriptLoader({ condition, src, onload }) {
    const noop = () => {}
    if (condition) {
        return <script src={src} onLoad={onload || noop}/>
    }
    return null
}

function fetchPOST(code) {
    const data = new FormData();
    data.append('code', code)

    return fetch('/api/repl', {
        body: data,
        method: 'POST'
    }).then(response => response.json())
}
