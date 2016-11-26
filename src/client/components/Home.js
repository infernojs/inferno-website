import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'

@connect(['common'])
class Home extends Component {

    // Update title
    static onEnter({ common }) {
        common.title = 'Home'
    }

    render({ common }) {
        return <div className="home">
            <div className="hero-banner">
                <h1>
                    An extremely fast React-like javascript library for building modern user interfaces
                </h1>
                <div className="row">
                    <button>Get Started</button>
                    <button>Github</button>
                </div>
            </div>
            <section>
                {common.description}
            </section>
        </div>
    }
}

export default Home
