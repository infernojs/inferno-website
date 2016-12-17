import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';

const setCurrent = ({ instance, index }) => {
  instance.setState({ current: index });
};

export default class ContentAccordion extends Component {
  constructor() {
    super();
    this.state = {
      current: 0,
      list: [
        {
          name: 'Differences from React',
          description: [
            "Inferno is much smaller in size, 8kb vs 45kb gzip. This means Inferno is faster to transfer over the network but more importantly, is much faster to parse – this makes a big impact on mobile.",
            "Inferno is considerably faster than React. This doesn't apply to only benchmarks, but real-world applications that companies have converted to Inferno from React. Ranging from 40% - 110% performance improvement with Inferno 1.0. No other React-like library gets close to this performance gain over React.",
            "Inferno doesn't have a fully synthetic event system like React does. Inferno has a partially synthetic event system, instead opting to only delegate certain events (such as onClick).",
            "Inferno doesn't support React Native. Inferno was only designed for the browser/server with the DOM in mind.",
            "Inferno doesn't support string refs – although this can be enabled using inferno-compat. We don't recommend using them, they are the source of many memory leaks and performance issues in real-world apps. Stick with function callback refs instead.",
            "Inferno includes render on the main core package, rather than have a InfernoDOM package like React does. We used to do it that way, but we found people simply didn't like it given we don't support native. Furthermore, by not splitting them, we improved performance and bundle sizes.",
            "Inferno provides lifecycle events on stateless components. This is a major win for people who prefer lightweight components rather than bloated ES2015 classes.",
            "Inferno has its own devtools debugger (still in development) that differs from the React implementation. Inferno's debugger is on average, 4x faster – fixing lots of the issues with slow, laggy interfaces when developers are debugging."
          ]
        },
        {
          name: 'Differences from Preact',
          description: [
            "Inferno is larger in size, 8kb vs 3kb gzip. This means that Preact should parse faster than Inferno – if only slightly.",
            "Inferno has a partial synthetic event system, resulting in better performance via delegation of certain events.",
            "Inferno is much faster than Preact in rendering, updating and removing elements from the DOM. Inferno diffs against virtual DOM, rather than the real DOM (except for when loading from server-side rendered content) which means it can make drastic improvements. Unfortunately, diffing against the real DOM has a 30-40% overhead cost in operations.",
            "Inferno fully supports controlled components for input/select/textarea elements. This prevents lots of edgecases where the virtual DOM is not the source of truth (it should always be). Preact pushes the source of truth to the DOM itself.",
            "Inferno provides lifecycle events on stateless components. This is a major win for people who prefer lightweight components rather than bloated ES2015 classes.",
            "Inferno has its own devtools debugger (still in development) that differs from the Preact (React bound) implementation. Inferno's debugger is on average, 4x faster – fixing lots of the issues with slow, laggy interfaces when developers are debugging."
          ]
        },
        {
          name: 'Other Frameworks',
          description: [

          ]
        }
      ]
    };
  }
  render() {
    return (
      <div className="content-accordion">
        <div className="row">
          <ul className="options sm3">
            {
              this.state.list.map((item, index) => {
                return <li
                  onClick={ linkEvent({ instance: this, index: index }, setCurrent ) }
                  className={ this.state.current == index ? 'active' : '' }>
                  <span>{ item.name }</span>
                </li>
              })
            }
          </ul>
          <ul className="copy sm8">
            {
              this.state.list[this.state.current].description.map(
                (item) => {
                  return <li>{ item }</li>
                }
              )
            }
          </ul>
        </div>
      </div>
    )
  }
}
