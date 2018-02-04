import {Component} from 'inferno';
import Editor from './repl/Editor';

const codeSample = `
export default class MyInfernoTimer extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      time: null
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: (new Date()).toLocaleString()
      })
    }, 200)
  }
  render() {
    return (
      <h2>
        Current time: <span>{this.state.time}</span>
      </h2>
    )
  }
}
`;

export default class REPL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    this.setState({ loaded: true });
  }

  render() {
    return <Editor loaded={this.state.loaded}>
      {codeSample}
    </Editor>;
  }
}
