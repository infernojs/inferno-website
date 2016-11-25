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
        return <main>
            <h1>Inferno</h1>
            <div className="home">
                {common.description}
            </div>
        </main>
    }
}

export default Home
