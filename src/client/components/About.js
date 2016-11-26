import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'

@connect
class About extends Component {

    // When route is loaded (isomorphic)
    static onEnter({ common }) {
        common.title = 'About'
    }

    render() {
        return <div>
            <h1>Inferno-website</h1>
            <section>
                <p>Based on</p>
                <p>
                    <a href="https://github.com/nightwolfz/inferno-starter" target="_blank">
                        https://github.com/nightwolfz/inferno-starter
                    </a>
                </p>
            </section>
        </div>
    }
}

export default About
