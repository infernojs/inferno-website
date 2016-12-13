import Inferno from 'inferno'
import Component from 'inferno-component'
import babelPluginInferno from 'babel-plugin-inferno'
import Loading from '../components/repl/Loading'

if (process.env.BROWSER) {
    window.Inferno = Inferno;
}

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
        const ExportedComponent = eval(code) //.replace(/"use strict";/g, '')
        if (typeof ExportedComponent !== 'function') {
            console.error('You must export at least one component')
        }
        const infernoResult = <ExportedComponent/>
        return infernoResult
    } catch(ex) {
        return <p>Compiler Error: {ex}</p>
    }
}

const codeSample = `
export default function MainComponent() {
    return <MyInfernoTest/>;
}

const MyInfernoTest = () => {
    return <h2>It works!</h2>;
}`;

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
        }
    }

    handleCompile = (e) => {
        e.preventDefault()
        const vNodes = compile(window.editor.doc.getValue())
        this.setState({ vNodes })
    }

    render() {
        return <div>
            <ScriptLoader condition={!window.compiler}
                          src="//cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.19.0/babel.min.js"/>
            <ScriptLoader condition={!window.editor}
                          src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/codemirror.min.js"/>
            <ScriptLoader condition={!window.editor && this.state.loaded}
                          onload={() => window.editor.setOption('mode', 'javascript')}
                          src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/mode/javascript/javascript.min.js"/>
            <link href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/codemirror.min.css" rel="stylesheet"/>
            <link href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/theme/neo.min.css" rel="stylesheet"/>

            <div className="repl">
                <h1>REPL</h1>

                <div className="row">
                    <div className="sm6 repl-editor">
                        {this.state.loaded || <Loading/>}
                        <textarea id="repl-editor"
                                  className={this.state.loaded ? '' : 'hidden'}
                                  value={codeSample}/>
                    </div>
                    <div className="sm6 repl-output">
                        {this.state.vNodes}
                    </div>
                </div>
                <button onClick={this.handleCompile}>Test</button>
            </div>
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
