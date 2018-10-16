import {Component, linkEvent} from 'inferno';

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
            "Inferno doesn't have a fully synthetic event system like React does. Inferno has a partially synthetic event system, instead opting to only delegate certain events (such as `onClick`).",
            "Inferno doesn't support React Native. Inferno was only designed for the browser/server with the DOM in mind.",
            "Inferno doesn't support legacy string refs, use `createRef` or callback `ref` API",
            "Inferno provides lifecycle events on functional components. This is a major win for people who prefer lightweight components rather than ES2015 classes.",
            "Inferno is able to use the React Dev Tools extensions for Chrome/Firefox/etc to provide the same level of debugging experience to the Inferno user via `inferno-devtools`.",
            "Inferno styles are set using CSS property names [background-color: blue] rather than [backgroundColor: blue]. camelCase styles are supported through inferno-compat package."
          ]
        },
        {
          name: 'Differences from Preact',
          description: [
            "Inferno has a partial synthetic event system, resulting in better performance via delegation of certain events.",
            "Inferno is much faster than Preact in rendering, updating and removing elements from the DOM.",
            "Inferno fully supports controlled components for `input`/`select`/`textarea` elements. This prevents lots of edgecases where the virtual DOM is not the source of truth (it should always be). Preact pushes the source of truth to the DOM itself",
            "Inferno provides lifecycle events on functional components. This is a major win for people who prefer lightweight components rather than ES2015 classes.",
          ]
        }
      ]
    };
  }

  render() {
    return (
      <div className="differences col-9 col-md-11 col-sm-12 col-xs-12 centered">
        <ul className="tab tab-block">
          {this.state.list.map((item, index) => {
            return <li className={this.state.current === index ? 'tab-item active' : 'tab-item'}>
              <a onClick={linkEvent({
                instance: this,
                index: index
              }, setCurrent)}>
                {item.name}
              </a>
            </li>;
          })}
        </ul>
        <ul>
          {this.state.list[this.state.current].description.map((item) => {
            return <li className="differences-item">{item}</li>;
          })}
        </ul>
      </div>
    );
  }
}
