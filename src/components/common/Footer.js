import {createTextVNode, version} from 'inferno';
import LogoSauceLabs from '../logos/LogoSauceLabs';
import AutoExplore from '../logos/AutoExplore';
import Vercel from '../logos/Vercel';

export default function Footer(props, { router }) {

  const hideFooter = (router.url === '/repl');
  if (hideFooter) {
    return null;
  }

  return (
    <footer className="container grid-lg">
      <div className="sponsors col-mr-auto">
        <div className="columns">
          <FooterItem
            href="https://vercel.com/"
            className="saucelabs"
            title="Vercel is used to host InfernoJS website"
            LogoComponent={Vercel}
          />
          <div className="divider-vert hide-sm" />
          <FooterItem
            href="https://saucelabs.com/"
            className="saucelabs"
            title="InfernoJS uses Sauce Labs for Cross Browser Testing"
            LogoComponent={LogoSauceLabs}
          />
          <div className="divider-vert hide-sm" />
          <FooterItem
            href="https://www.autoexplore.ai/"
            className="thegrid"
            title="AutoExplore is committed to supporting the maintenance and development of InfernoJS"
            LogoComponent={AutoExplore}
          />
        </div>
      </div>
      <div className="container text-center license">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://opensource.org/licenses/MIT"
        >
          Project licensed under MIT.
        </a>
        <div className="built" $HasNonKeyedChildren>
          {[
            createTextVNode(`Website built with Inferno ${version} using `),
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/infernojs/create-inferno-app"
            >
              create-inferno-app
            </a>,
          ]}
        </div>
      </div>
    </footer>
  );
}

const FooterItem = ({ href, className, LogoComponent, title }) => (
  <div className="column col-xs-10 text-center">
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className={className}
      title={title}
    >
      <LogoComponent />
    </a>
  </div>
);
