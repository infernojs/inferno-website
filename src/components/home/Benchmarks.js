import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import BasicChart from '../common/BasicChart'

const setCurrent = ({ instance, index }) => {
  instance.setState({ current: index });
};

export default class Benchmarks extends Component {
  constructor() {
    super();
    this.state = {
      current: 0,
      list: [
        {
          id: 'frameworks',
          name: 'JS Frameworks',
          description: 'The JS web frameworks benchmark is a simple benchmark, comparing various typical app operations for several JavaScript frameworks. The benchmarks creates a large table with randomized entries and measures the time for various operations.',
          link: 'http://stefankrause.net/js-frameworks-benchmark4/webdriver-ts/table.html',
          data: [
            { label: 'Vanilla JS', value: 0.1, score: 1.0 },
            { label: 'Inferno 1.0', value: 0.14, bg: 'rgb(242, 63, 63)', score: 1.04 },
            { label: 'Angular 2', value: 0.52, score: 1.42 },
            { label: 'Ember 2', value: 0.74, score: 1.64 },
            { label: 'React 15.4', value: 0.49, score: 1.39 },
            { label: 'Vue 2', value: 0.47, score: 1.37 }
          ]
        },
        {
          id: 'vdom',
          name: 'Virtual DOM',
          description: ' Etiam elit velit, malesuada sed mauris ut, suscipit vestibulum ante. Vestibulum pharetra orci a leo varius, nec luctus tellus consectetur. Donec eget consequat leo.',
          link: '',
          data: [
            { label: 'Inferno', value: 0.25, bg: 'rgb(242, 63, 63)' },
            { label: 'Angular 2', value: 0.35 },
            { label: 'Ember', value: 0.5 },
            { label: 'React', value: 0.75 },
            { label: 'VueJS', value: 0.85 }
          ]
        },
        {
          id: 'uibench',
          name: 'UI Bench',
          description: 'Praesent nibh mauris, accumsan vel quam quis, luctus mattis ex. Integer eu diam ultrices, ultrices lacus quis, volutpat lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: '',
          data: [
            { label: 'Inferno', value: 0.15, bg: 'rgb(242, 63, 63)' },
            { label: 'Angular 2', value: 0.6 },
            { label: 'Ember', value: 0.45 },
            { label: 'React', value: 0.7 },
            { label: 'VueJS', value: 0.85 }
          ]
        },
        {
          id: 'dbmonster',
          name: 'DBMonster',
          description: 'Nulla eget sagittis ligula. Donec ornare consequat faucibus. Proin et sem facilisis, tincidunt quam nec, pellentesque lorem. Nulla facilisi. Suspendisse imperdiet purus ac sem fringilla pulvinar.',
          link: '',
          data: [
            { label: 'Inferno', value: 0.1, bg: 'rgb(242, 63, 63)' },
            { label: 'Angular 2', value: 0.3 },
            { label: 'Ember', value: 0.65 },
            { label: 'React', value: 0.75 },
            { label: 'VueJS', value: 0.85 }
          ]
        },
        {
          id: 'loadtime',
          name: 'Parse + Load Time',
          description: 'Nullam non felis ut neque consectetur commodo. Nullam rhoncus tincidunt ligula, nec feugiat erat laoreet pharetra. Nulla eget sagittis ligula. Donec ornare consequat faucibus.',
          link: '',
          data: [
            { label: 'Inferno', value: 0.13, bg: 'rgb(242, 63, 63)' },
            { label: 'Angular 2', value: 0.9 },
            { label: 'Ember', value: 0.35 },
            { label: 'React', value: 0.58 },
            { label: 'VueJS', value: 0.85 }
          ]
        },
      ]
    };
  }
  render() {
    return (
      <div>
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
        <div className="row charts">
          <div className="lg5 copy">
              <div className="center">
                  <p>{ this.state.list[this.state.current].description }</p>
                  <a target="_blank"
                    rel="noopener"
                    className="button not-pad lg5 sm xs10"
                    href={ this.state.list[this.state.current].link }>View the benchmark</a>
              </div>
          </div>
          <div className="lg7 visual">
              <BasicChart data={ this.state.list[this.state.current].data } />
          </div>
        </div>
      </div>
    )
  }
}
