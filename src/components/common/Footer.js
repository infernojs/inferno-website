import Inferno from 'inferno'
import IconTwitter from '../icons/IconTwitter'
import IconSlack from '../icons/IconSlack'
import IconContributors from '../icons/IconContributors'
import LogoDO from '../logos/LogoDO'
import LogoSauceLabs from '../logos/LogoSauceLabs'
import LogoBrowserstack from '../logos/LogoBrowserstack'
import LogoTheGrid from '../logos/LogoTheGrid'

const GACode = () => {
  return {
    __html: `
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-89701958-1', 'auto');
    ga('send', 'pageview');`
  }
};

export default function Footer(props, { router }) {

  console.warn(router.location.pathname)
  const hideFooter = (router.url === '/repl')
  if (hideFooter) {
    return null
  }

  return (
  <footer>
    <div className="foot container">
      <div className="row">
        <div className="social-network">
          <a target="_blank" rel="noopener" href="https://twitter.com/inferno_js"><IconTwitter/></a>
          <a target="_blank" rel="noopener" href="https://inferno-slack.herokuapp.com/"><IconSlack/></a>
        </div>
        <div className="contributors">
          <a target="_blank" rel="noopener" href="https://github.com/infernojs/inferno/graphs/contributors" className="contributors">
            <IconContributors/> Contributors
          </a>
        </div>
      </div>
    </div>
    <div className="supporters">
      <div className="container">
        <div className="row">
          <a target="_blank" rel="noopener" href="https://www.digitalocean.com/" className="lg3 xs6 sm3 fill">
            <LogoDO/>
          </a>
          <a target="_blank" rel="noopener" href="http://info.saucelabs.com/" className="lg3 xs6 sm3">
            <LogoSauceLabs/>
          </a>
          <a target="_blank" rel="noopener" href="https://www.browserstack.com/" className="lg3 xs6 sm3 fill">
            <LogoBrowserstack/>
          </a>
          <a target="_blank" rel="noopener" href="http://thegrid.io" className="lg3 xs6 sm3">
            <LogoTheGrid/>
          </a>
        </div>
      </div>
    </div>
    <div className="container text-center license">
      <a target="_blank" rel="noopener" href="https://opensource.org/licenses/MIT">Project licensed under MIT.</a>
      <div className="built">
        Website built with Inferno {Inferno.version} using <a target="_blank" rel="noopener" href="https://github.com/infernojs/create-inferno-app">create-inferno-app</a>
      </div>
    </div>
    <script dangerouslySetInnerHTML={GACode()} defer/>
  </footer>
  )
}
