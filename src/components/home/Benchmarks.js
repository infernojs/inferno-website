import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import BasicChart from '../common/BasicChart'

const setCurrent = ({ instance, index }, e) => {
  e.stopPropagation();
  instance.setState({ current: index });
  ga('send', 'event', 'Benchmark', instance.state.list[instance.state.current].name);
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
            { label: 'Vanilla JS', score: 1.0 },
            { label: 'Inferno 1.0', bg: '#e41f1c', score: 1.04 },
            { label: 'Angular 2', score: 1.42 },
            { label: 'Ember 2', score: 1.64 },
            { label: 'React 15.4', score: 1.39 },
            { label: 'Vue 2', score: 1.37 }
          ]
        },
        {
          id: 'vdom',
          name: 'Virtual DOM',
          description: 'The Virtual DOM Benchmark focuses on testing the children reconciliation algorithm used in various libraries. It is used by virtual DOM library authors to help optimize their algorithms. While not a perfect gauge of overall performance, it tests a key ingredient of popular Virtual DOM libraries.',
          link: 'https://vdom-benchmark.github.io/vdom-benchmark/',
          data: [
            { label: 'Inferno JS', bg: '#e41f1c', score: 1 },
            { label: 'React 15.4', score: 4.06 },
            { label: 'Mithril', score: 6.00 },
            { label: 'virtual-dom', score: 3.20 },
            { label: 'snabbdom', score: 1.94 }
          ]
        },
        {
          id: 'uibench',
          name: 'UI Bench',
          description: 'UI Benchmark is considered a more accurate test of overall UI performance in a library. The tests were run with Full Render Time enabled and 5 Iterations. Read UI Benchmark\'s notes for caveats and stipulations before drawing further conclusions.',
          link: 'https://localvoid.github.io/uibench/',
          data: [
            { label: 'Inferno JS', bg: '#e41f1c', score: 1 },
            { label: 'Vanilla JS', score: 2.13 },
            { label: 'React 15.4', score: 2.10 },
            { label: 'Preact', score: 3.04 },
            { label: 'DIO', score: 1.64 },
            { label: 'ivi', score: 1.10 }
          ]
        }
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
                  {
                    this.state.list[this.state.current].link ?
                      <a target="_blank"
                        rel="noopener"
                        className="button not-pad lg5 sm xs10"
                        href={ this.state.list[this.state.current].link }>View the benchmark</a> : ''
                  }
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
