import {Component, newTextVNode} from 'inferno';

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
        <h4 $HasVNodeChildren>{newTextVNode(release.name)}</h4>
        <span className="release" $HasVNodeChildren>{newTextVNode(new Date(release.published_at).toLocaleString())}</span>

      </section>
    );
  }
}
