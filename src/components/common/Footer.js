import Inferno from 'inferno'
import IconTwitter from '../icons/IconTwitter'
import IconSlack from '../icons/IconSlack'
import IconContributors from '../icons/IconContributors'

export default function Footer() {
    return (
    <footer>
        <div className="container">
            <div className="row">
                <div className="social-network">
                    <a target="_blank" href="https://twitter.com/infernojs"><IconTwitter/></a>
                    <a target="_blank" href="https://inferno-slack.herokuapp.com/"><IconSlack/></a>
                </div>
                <div className="mit">
                    <a target="_blank" href="https://opensource.org/licenses/MIT">Project licensed under MIT</a>
                </div>
                <a className="contributors" target="_blank" href="https://github.com/trueadm/inferno/graphs/contributors"><IconContributors/> Contributors </a>
            </div>
        </div>
    </footer>
    )
}
