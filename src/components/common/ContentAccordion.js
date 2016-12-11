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
          name: 'Compatibility',
          description: ' Etiam elit velit, malesuada sed mauris ut, suscipit vestibulum ante. Vestibulum pharetra orci a leo varius, nec luctus tellus consectetur. Donec eget consequat leo.'
        },
        {
          name: 'Custom Namespaces',
          description: 'Praesent nibh mauris, accumsan vel quam quis, luctus mattis ex. Integer eu diam ultrices, ultrices lacus quis, volutpat lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          name: 'Stateful Components',
          description: 'Nulla eget sagittis ligula. Donec ornare consequat faucibus. Proin et sem facilisis, tincidunt quam nec, pellentesque lorem. Nulla facilisi. Suspendisse imperdiet purus ac sem fringilla pulvinar.'
        }
      ]
    };
  }
  render() {
    return (
      <div className="content-accordion">
        <div className="row">
            <div className="sm3">
            <ul className="options">
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
            </div>
            <div className="copy sm8">
                { this.state.list[this.state.current].description }
            </div>
        </div>
      </div>
    )
  }
}
