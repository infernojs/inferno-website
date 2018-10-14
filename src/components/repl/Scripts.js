// import * as Inferno from 'inferno';
//
// if (process.env.BROWSER) {
//   window.Inferno = Inferno;
//   window.Component = Inferno.Component;
// }
//
// export default class Scripts extends Inferno.Component {
//
//   state = {
//     scripts: []
//   };
//
//   componentDidMount() {
//
//     // Execute code when Babel is available
//     let intval = setInterval(() => {
//       if (window.Babel && !window.compiler) {
//         require.ensure([], function(require) {
//           window.compiler = window.Babel;
//           window.compiler.registerPlugin('babel-plugin-inferno', require('babel-plugin-inferno'));
//         });
//         clearInterval(intval);
//       }
//     }, 50);
//   }
//
//   setLoaded = (name) => {
//     this.setState(state => {
//       return {
//         scripts: state.scripts.concat(name)
//       };
//     });
//   };
//
//   render({ loaded }, { scripts }) {
//
//     return (
//       <div>
//         <link href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.30.0/codemirror.min.css" rel="stylesheet"/>
//
//         <ScriptLoader
//           condition={!window.compiler}
//           src="//cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.19.0/babel.min.js"/>
//
//         <ScriptLoader
//           condition={!window.editor}
//           src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.30.0/codemirror.min.js"/>
//
//         <ScriptLoader
//           condition={window.editor && loaded}
//           onload={() => this.setLoaded('javascript')}
//           src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.30.0/mode/javascript/javascript.min.js"/>
//
//         <ScriptLoader
//           condition={window.editor && loaded}
//           onload={() => this.setLoaded('xml')}
//           src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.30.0/mode/xml/xml.min.js"/>
//
//         <ScriptLoader
//           condition={window.editor && loaded && scripts.includes('javascript') && scripts.includes('xml')}
//           onload={() => onFinishedLoading()}
//           src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.30.0/mode/jsx/jsx.min.js"/>
//       </div>
//     );
//   }
// }
//
// function ScriptLoader({ condition, src, onload }) {
//   const noop = () => {
//   };
//   if (condition) {
//     return <script src={src} onLoad={onload || noop}/>;
//   }
//   return null;
// }
//
// function onFinishedLoading() {
//   window.editor.setOption('mode', 'jsx');
// }
