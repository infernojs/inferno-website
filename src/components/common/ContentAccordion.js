import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';

const setCurrent = ({ instance, index }, e) => {
  e.stopPropagation();
  instance.setState({ current: index });
  ga('send', 'event', 'Differences', instance.state.list[instance.state.current].name);
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
            "Inferno is much smaller in size, 9kb vs 45kb gzip. This makes a big impact on mobile.",
            "Inferno is considerably faster than React. This doesn't apply to only benchmarks, but real-world applications that companies have converted to Inferno from React.",
            "Inferno doesn't have a fully synthetic event system like React does, instead opting to only delegate certain events (such as onClick).",
            "Inferno doesn't support React Native. Inferno was only designed for the browser/server with the DOM in mind.",
            "Inferno doesn't support string refs – although this can be enabled using inferno-compat. We don't recommend using them, they are the source of many memory leaks and performance issues in real-world apps.",
            "Inferno provides lifecycle events on stateless components. This is a major win for people who prefer lightweight components rather than ES2015 classes.",
            "Inferno is able to use the React Dev Tools extensions for Chrome/Firefox/etc to provide the same level of debugging experience to users of Inferno via `inferno-devtools`"
          ]
        },
        {
          name: 'Differences from Preact',
          description: [
            "Inferno is larger in size, 9kb vs 3kb gzip. This means that Preact should parse faster than Inferno – if only slightly.",
            "Inferno has a partial synthetic event system, resulting in better performance via delegation of certain events.",
            "Inferno is much faster than Preact in rendering, updating and removing elements from the DOM.",
            "Inferno fully supports controlled components for input/select/textarea elements. This prevents lots of edgecases where the virtual DOM is not the source of truth (it should always be). Preact pushes the source of truth to the DOM itself.",
            "Inferno provides lifecycle events on stateless components. This is a major win for people who prefer lightweight components rather than ES2015 classes.",
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
