import { Component } from "inferno";
import { componentWillMove } from "inferno-animation";

const NUMBER_OF_ITEMS = 256; // 16 x 16

export default class AnimateMovePromo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    let logo = new Image(16, 16);
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    logo.src = "/favicon.ico";
    logo.onload = () => {
      console.log("Image was loaded");
      context.drawImage(logo, 0, 0, 16, 16);
      // Let's extract each pixel of Inferno logo
      let imageData = context.getImageData(0, 0, 16, 16);
      const pixelsRGBA = Array.from(imageData.data);
      // ^ It's [r0, g0, b0, a0, r1, g1, ...]
      const pixelLength = 4; // It's RGBA. right?
      // Let's group RGBA numbers into arrays of length `pixelLength`
      const groupedPixels = pixelsRGBA.map((_, index) => {
        if (index % pixelLength == 0) return pixelsRGBA.slice(index, index+4);
      }).filter(p => Boolean(p));
      this.setState({
        items: Array.from(
          groupedPixels.map((numbers) => {
            return "#" + numbers.map((number) => {
              let s = number.toString(16);
              return s.length == 1? "0" + s : s;
            }).join("") + "-" + generateRandomId();
          })
        )
      });

    };
  }

  doShuffle = (e) => {
    e.preventDefault();
    this.setState({
      items: shuffle(this.state.items)
    });
  }

  render() {
    const { items } = this.state;

    return (
      <div className="animate-move-promo">
        <div className="button-wrapper" $HasVNodeChildren>
          <button
            className="button second small"
            onClick={this.doShuffle}
            $HasTextChildren
          >
            Shuffle
          </button>
        </div>
        <div className="animate-grid" $HasKeyedChildren>
          {items.map(item => <GridItem
            key={item.split("-")[1]}
            color={item.split("-")[0]}
            animation="AnimateMove"
            onComponentWillMove={componentWillMove} />)}
        </div>
      </div>
    );
  }
}

function GridItem({children, color, ...props}) {
  return (
    <div
      className="grid-item"
      style={{ "background-color": color }}
    >
      {children}
    </div>
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

// This function generates a random 8 character string
// to be used as key for component
function generateRandomId() {
  const validChars = "hg587yhfg32847rf93hg4fr738294grf781grf18734rgf17837824rg127";
  // ^ This string was generated by almost randomly walking on the Keyboard xD
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += validChars[parseInt(Math.random() * validChars.length)];
  }
  return result;
}
