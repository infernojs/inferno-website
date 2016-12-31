import Inferno from 'inferno'
import IconTwitter from '../icons/IconTwitter'
import IconSlack from '../icons/IconSlack'
import IconContributors from '../icons/IconContributors'
import LogoDO from '../logos/LogoDO'
import LogoSauceLabs from '../logos/LogoSauceLabs'
import LogoBrowserstack from '../logos/LogoBrowserstack'
import LogoTheGrid from '../logos/LogoTheGrid'

export default function Footer() {
    return (
    <footer>
        <div className="foot container">
            <div className="row">
                <div className="social-network">
                    <a target="_blank" rel="noopener" href="https://twitter.com/inferno_js"><IconTwitter/></a>
                    <a target="_blank" rel="noopener" href="https://inferno-slack.herokuapp.com/"><IconSlack/></a>
                </div>
                <div className="mit">
                    <a target="_blank" rel="noopener" href="https://opensource.org/licenses/MIT">Project licensed under MIT.</a>
                    <div className="built">
                        Website built with Inferno using <a target="_blank" rel="noopener" href="https://github.com/infernojs/create-inferno-app">create-inferno-app</a>
                    </div>
                </div>
        <div className="contributors">
                <a target="_blank" rel="noopener" href="https://github.com/trueadm/inferno/graphs/contributors" className="contributors">
                    <IconContributors/> Contributors
                </a>
            </div>
        </div>
        </div>
        <div className="supporters">
            <div className="container">
                <div className="row">
                    <a target="_blank" rel="noopener" href="https://www.digitalocean.com/" className="lg3 xs6 fill">
                        <LogoDO/>
                    </a>
                    <a target="_blank" rel="noopener" href="http://info.saucelabs.com/" className="lg3 xs6">
                        <LogoSauceLabs/>
                    </a>
                    <a target="_blank" rel="noopener" href="browserstack.com" className="lg3 xs6 fill">
                        <LogoBrowserstack/>
                    </a>
                    <a target="_blank" rel="noopener" href="http://thegrid.io" className="lg3 xs6">
                        <LogoTheGrid/>
                    </a>
                </div>
            </div>
        </div>
    </footer>
    )
}
