import {Component, linkEvent} from 'inferno';
import BasicChart from './common/BasicChart';

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
          id: 'marko-color-picker-chrome',
          name: 'Color Picker (Chrome)',
          description: 'This benchmark was created by Marko.js to compare client-side rendering performance of various frameworks – numbers show ops/sec, higher is better.',
          link: 'https://github.com/marko-js/isomorphic-ui-benchmarks',
          data: [
            {
              label: 'Inferno 7.3.2',
              bg: '#dc0030',
              score: 17078
            },
            {
              label: 'Marko.js 4.18.16',
              score: 6008
            },
            {
              label: 'Preact 10.0.1',
              score: 6435
            },
            {
              label: 'React 16.10.2',
              score: 7358
            },
            {
              label: 'Vue 2.6.10',
              score: 4291
            }
          ]
        },
        {
          id: 'marko-color-picker-node',
          name: 'Color Picker (Server)',
          description: 'This benchmark was created by Marko.js to compare server-side rendering performance of various frameworks – numbers show ops/sec, higher is better.',
          link: 'https://github.com/marko-js/isomorphic-ui-benchmarks',
          data: [
            {
              label: 'Inferno 7.3.2',
              bg: '#dc0030',
              score: 21453
            },
            {
              label: 'Marko.js 4.18.16',
              score: 24540
            },
            {
              label: 'Preact 10.0.1',
              score: 4587
            },
            {
              label: 'React 16.10.2',
              score: 4300
            },
            {
              label: 'Vue 2.6.10',
              score: 9120
            }
          ]
        },
        {
          id: 'frameworks',
          name: 'JS Framework',
          description: 'The js-framework-benchmark is a simple benchmark, comparing various typical app operations for several JavaScript frameworks. The benchmarks creates a large table with randomized entries and measures the time for various operations – lower is better.',
          link: 'https://github.com/krausest/js-framework-benchmark',
          data: [
            {
              label: 'Vanilla JS',
              score: 1.0
            },
            {
              label: 'Inferno 5.3.0',
              bg: '#dc0030',
              score: 1.06
            },
            {
              label: 'Preact 8.2.6',
              score: 1.29
            },
            {
              label: 'Vue 2.5.16',
              score: 1.37
            },
            {
              label: 'Svelte 2.9.7',
              score: 1.39
            },

            {
              label: 'React 16.4.1',
              score: 1.50
            },
            {
              label: 'Angular 6.1.0',
              score: 1.50
            },
            {
              label: 'Marko.js 4.12.3',
              score: 1.50
            }
          ]
        },
        {
          id: 'uibench',
          name: 'UI Bench',
          description: 'UI Benchmark is considered a more accurate test of overall UI performance in a library. The tests were run with Full Render Time enabled and 5 Iterations. Read UI Benchmark\'s notes for caveats and stipulations before drawing further conclusions – lower is better.',
          link: 'https://localvoid.github.io/uibench/',
          data: [
            {
              label: 'Inferno JS',
              bg: '#dc0030',
              score: 1
            },
            {
              label: 'Vanilla JS',
              score: 2.13
            },
            {
              label: 'React 15.4',
              score: 2.10
            },
            {
              label: 'Preact',
              score: 3.04
            },
            {
              label: 'DIO',
              score: 1.64
            },
            {
              label: 'ivi',
              score: 1.10
            }
          ]
        }
      ]
    };
  }

  render() {
    return (
      <section className="container page row">
        <div className="benchmarks">
          <ul className="options">
            {this.state.list.map((item, index) => {
              return <li
                onClick={linkEvent({
                  instance: this,
                  index: index
                }, setCurrent)}
                className={this.state.current === index ? 'active' : ''}>
                <span>{item.name}</span>
              </li>;
            })}
          </ul>
          <div className="row charts">
            <div className="lg5 copy">
              <div className="center">
                <p>{this.state.list[this.state.current].description}</p>
                {this.state.list[this.state.current].link ? <a target="_blank"
                                                               rel="noopener noreferrer"
                                                               className="button not-pad lg5 sm xs10"
                                                               href={this.state.list[this.state.current].link}>View the benchmark</a> : ''}
              </div>
            </div>
            <div className="lg7 visual">
              <BasicChart data={this.state.list[this.state.current].data}/>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
