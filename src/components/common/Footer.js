import {createTextVNode, version} from 'inferno';
import LogoDO from '../logos/LogoDO';
import LogoSauceLabs from '../logos/LogoSauceLabs';
import LogoTheGrid from '../logos/LogoTheGrid';

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
          <FooterItem href="http://thegrid.io" className="thegrid" LogoComponent={LogoTheGrid}/>
        </div>
      </div>
      <div className="container text-center license">
        <a target="_blank" rel="noopener noreferrer" href="https://opensource.org/licenses/MIT">
          Project licensed under MIT.
        </a>
        <div className="built" $HasNonKeyedChildren>{
          [
            createTextVNode(`Website built with Inferno ${version} using `),
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/infernojs/create-inferno-app">create-inferno-app</a>
          ]
        }</div>
      </div>
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
