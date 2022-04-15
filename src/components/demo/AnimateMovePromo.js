import { Component } from 'inferno';
import { componentWillMove } from "inferno-animation";

export default class AnimateMovePromo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    for (let i = 0; i < 48; i++) {
      this.state.items.push(`item_${i}`);
    }

    this.doShuffle = this.doShuffle.bind(this);
  }

  doShuffle(e) {
    e.preventDefault();
    this.setState({
      items: shuffle(this.state.items)
    });
  }

  render() {
    const { items } = this.state;

    return (
      <div className="animate-move-promo">
        <div className="button-wrapper">
          <button className="button second small" onClick={this.doShuffle}>Shuffle</button>
        </div>
        <div className="animate-grid">
          {items.map(item => <GridItem
            key={item}
            className="animate-grid-item"
            animation="AnimateMove"
            onComponentWillMove={componentWillMove} />)}
        </div>

      </div>
    );
  }
}

function GridItem(props) {
  return (
    <div className="grid-item">{props.children}</div>
  );
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
