import * as Inferno from 'inferno';
import LogoDO from '../logos/LogoDO';
import LogoSauceLabs from '../logos/LogoSauceLabs';
import LogoBrowserstack from '../logos/LogoBrowserstack';
import LogoTheGrid from '../logos/LogoTheGrid';

const GACode = () => {
  return {
    __html: `
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-89701958-1', 'auto');
    ga('send', 'pageview');`
  };
};

export default function Footer(props, { router }) {

  const hideFooter = (router.url === '/repl');
  if (hideFooter) {
    return null;
  }

  return (
    <footer className="container grid-lg">
      <div className="sponsors col-mr-auto">
        <div className="columns">
          <FooterItem href="https://www.digitalocean.com" className="digitalocean" LogoComponent={LogoDO}/>
          <div className="divider-vert hide-sm"/>
          <FooterItem href="http://info.saucelabs.com" className="saucelabs" LogoComponent={LogoSauceLabs}/>
          <div className="divider-vert hide-sm"/>
          <FooterItem href="https://www.browserstack.com" className="browserstack" LogoComponent={LogoBrowserstack}/>
          <div className="divider-vert hide-sm"/>
          <FooterItem href="http://thegrid.io" className="thegrid" LogoComponent={LogoTheGrid}/>
        </div>
      </div>
      <div className="container text-center license">
        <a target="_blank" rel="noopener noreferrer" href="https://opensource.org/licenses/MIT">
          Project licensed under MIT.
        </a>
        <div className="built">
          Website built with Inferno {Inferno.version} using <a target="_blank" rel="noopener noreferrer" href="https://github.com/infernojs/create-inferno-app">create-inferno-app</a>
        </div>
      </div>
      <script dangerouslySetInnerHTML={GACode()} defer/>
    </footer>
  );
}

const FooterItem = ({ href, className, LogoComponent }) => (
  <div className="column col-xs-10 text-center">
    <a target="_blank" rel="noopener noreferrer" href={href} className={className}>
      <LogoComponent/>
    </a>
  </div>
);
