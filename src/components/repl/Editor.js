// import {Component} from 'inferno';
// import Scripts from './Scripts';
// import Loading from './Loading';
//
// const options = {
//   plugins: [
//     "transform-es2015-arrow-functions",
//     "transform-es2015-block-scoped-functions",
//     "transform-es2015-block-scoping",
//     "transform-es2015-classes",
//     "transform-es2015-computed-properties",
//     "transform-es2015-literals",
//     "transform-es2015-parameters",
//     "transform-es2015-shorthand-properties",
//     "transform-es2015-spread",
//     "transform-es2015-template-literals",
//     "transform-class-properties",
//     "transform-es2015-modules-commonjs",
//     "transform-es2015-destructuring",
//     "transform-object-rest-spread",
//     "babel-plugin-inferno"
//   ]
// };
//
// export default class Editor extends Component {
//   constructor(props, context) {
//     super(props, context);
//
//     this.state = {
//       loaded: false
//     };
//   }
//
//   componentDidMount() {
//     // Execute code when CodeMirror is available
//     let intval = setInterval(() => {
//       if (window.CodeMirror && window.compiler) {
//         this.setState({ loaded: true });
//         this.initEditor();
//         setTimeout(() => {
//           this.executeCode();
//         }, 100);
//         clearInterval(intval);
//       }
//     }, 50);
//   }
//
//   initEditor = () => {
//     const textArea = document.getElementById('repl-editor');
//     window.editor = new CodeMirror.fromTextArea(textArea, {
//       theme: "neo",
//       lineNumbers: true,
//       styleActiveLine: true
//     });
//     window.editor.on('changes', debounce(() => {
//       this.executeCode();
//     }, 500));
//   };
//
//   executeCode = () => {
//     const vNodes = compile(window.editor.doc.getValue());
//     this.setState({ vNodes });
//   };
//
//   handleChange = (e) => {
//     if (e) e.preventDefault();
//     console.warn('eee');
//     console.warn('eee');
//   };
//
//   render({ children, loaded }) {
//     if (!loaded) {
//       return null;
//     }
//
//     return <div className="repl">
//       <Scripts loaded={this.state.loaded}/>
//       <div className="row">
//         <div className="xs12 sm7 p-0 repl-editor">
//           {this.state.loaded || <Loading/>}
//           <textarea id="repl-editor"
//                     className={this.state.loaded ? '' : 'hidden'}
//                     onInput={this.handleChange}
//                     value={children}/>
//         </div>
//         <div className="xs12 sm5 p-0 repl-output">
//           {this.state.vNodes}
//         </div>
//       </div>
//       <button className="button not-pad lg3 sm xs10" onClick={this.executeCode}>Run Example Code</button>
//     </div>;
//   }
// }
//
// function compile(jsxCode) {
//   try {
//     const { code } = window.compiler.transform(jsxCode, options);
//     const ExportedComponent = eval(code); //.replace(/"use strict";/g, '')
//     if (typeof ExportedComponent !== 'function') {
//       console.error('You must export at least one component');
//     }
//     const infernoResult = <ExportedComponent/>;
//     return infernoResult;
//   } catch(ex) {
//     return <p>Compiler Error: {ex.message}</p>;
//   }
// }
//
// function debounce(callback, timeout, aggressive) {
//   let timer = null;
//   let latestParameter;
//   let latestThis;
//
//   function later() {
//     timer = null;
//     callback.call(latestThis, latestParameter);
//   }
//
//   return function debounced(parameter) {
//     latestParameter = parameter;
//     latestThis = this;
//     if (!aggressive || timer === null) {
//       clearTimeout(timer);
//       timer = setTimeout(later, timeout);
//     }
//   };
// }
