import {Component, createTextVNode} from 'inferno';
import {ChildFlags} from 'inferno-vnode-flags';

export class LatestRelease extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      release: null
    };
  }

  componentWillMount() {
    fetch(`/api/release/latest`)
      .then(response => response.json())
      .then(response => {
        this.setState({ release: response });
      });
  }

  render(props, state) {
    let release = state.release;

    if (!release) {
      return null;
    }

    return (
      <section className="news">
        <h4 $HasVNodeChildren>{createTextVNode(release.name)}</h4>
        <span className="release" $HasVNodeChildren>{createTextVNode(new Date(release.published_at).toLocaleString())}</span>

      </section>
    );
  }
}
