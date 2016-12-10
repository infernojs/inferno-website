import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import BasicChart from './BasicChart'

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
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac risus orci. enean faucibus mi erat, vitae fringilla metus egestas eget. Morbi at congue ligula, nec interdum est.',
          data: [
          ]
        },
        {
          id: 'vdom',
          name: 'Virtual DOM',
          description: ' Etiam elit velit, malesuada sed mauris ut, suscipit vestibulum ante. Vestibulum pharetra orci a leo varius, nec luctus tellus consectetur. Donec eget consequat leo.',
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
          <div className="lg4 copy">
              { this.state.list[this.state.current].description }
          </div>
          <div className="lg8 visual">
              <BasicChart data={ this.state.list[this.state.current].data } />
          </div>
        </div>
        <a className="button lg5 sm5 xs9" href="#">Learn more about how Inferno performs</a>
      </div>
    )
  }
}
