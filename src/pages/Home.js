import Inferno from 'inferno'
import InfernoLogo from '../components/common/Logo'
import Benchmarks from '../components/common/Benchmarks'
import IconArchitecture from '../components/icons/IconArchitecture'
import IconBenchmark from '../components/icons/IconBenchmark'
import IconCompatible from '../components/icons/IconCompatible'
import IconIsomorphic from '../components/icons/IconIsomorphic'
import IconModular from '../components/icons/IconModular'
import IconSize from '../components/icons/IconSize'
import IconSpeed from '../components/icons/IconSpeed'

export default function() {
    return <div className="home">
    <div className="hero-banner row">
        <div className="logo xs12 sm3">
            <InfernoLogo showName={false}/> </div>
        <div className="logo-text sm9">
            <h1>Inferno</h1>
            <h2>An extremely fast React-like javascript library for building modern user interfaces</h2>
                    <a className="button">Get Started</a>
                    <a className="button second" href="https://github.com/trueadm/inferno">Examples</a>
        </div>
    </div>
    <section className="features">
        <div className="container">
            <div className="row">
                <div className="xs sm lg4">
                    <IconSize/>
                    <h2>Tiny Size</h2>
                    <p>Inferno is much smaller in size, 7kb vs 45kb gzip. This means inferno is faster to transfer over the network and much faster to parse.</p>
                </div>
                <div className="xs sm lg4">
                    <IconCompatible/>
                    <h2>React Compatible</h2>
                    <p>React-like API, concepts and component lifecycle events. Switch over easily with inferno-compact.</p>
                </div>
                <div className="xs sm lg4">
                    <IconSpeed/>
                    <h2>Fastest</h2>
                    <p>One the fastest front-end frameworks for rendering UI in the DOM.</p>
                </div>
                <div className="xs sm lg4">
                    <IconArchitecture/>
                    <h2>One-way Architecture</h2>
                    <p>Component driven + One-way data flow architecture. Coupling with Redux, MobX or Ceberal supported.</p>
                </div>
                <div className="xs sm lg4">
                    <IconIsomorphic/>
                    <h2>Isomorphic</h2>
                    <p>Isomorphic rendering on both client and server with the inferno-server package.</p>
                </div>
                <div className="xs sm lg4">
                    <IconModular/>
                    <h2>Modular</h2>
                    <p>Highly modular with very little opinion of how things should be done.</p>
                </div>
            </div>
        </div>
    </section>
    <section className="benchmarks container">
        <h3>
            <IconBenchmark/>
            Our Benchmarks
        </h3>
        <Benchmarks/>
        <ul className="options">
            <li className="active">JS Frameworks</li>
            <li>Virtual DOM</li>
            <li>UI Bench</li>
            <li>DBMonster</li>
            <li>Parse + Load Time</li>
        </ul>
        <div className="row charts">
            <div className="sm4 copy">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac risus orci.
                enean faucibus mi erat, vitae fringilla metus egestas eget.
                Morbi at congue ligula, nec interdum est.
            </div>
            <div className="sm8 visual">
                <svg className="graph" viewBox="0 0 391 270" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Option-E" transform="translate(-546.000000, -1346.000000)">
                            <g id="Group-6" transform="translate(546.000000, 1346.000000)">
                                <text id="VueJS" font-family="OpenSans, Open Sans" font-size="13" font-weight="normal" fill="#444444">
                                    <tspan x="26" y="215">VueJS</tspan>
                                </text>
                                <rect id="Rectangle-4-Copy-13" fill="#7C7C7C"
                                      transform="translate(236.593750, 208.827084) scale(-1, 1) rotate(-90.000000) translate(-236.593750, -208.827084) "
                                      x="221.229167" y="65.625" width="30.7291667" height="286.404167"></rect>
                                <text id="Ember-Copy" font-family="OpenSans, Open Sans" font-size="13" font-weight="normal" fill="#444444">
                                    <tspan x="20" y="128">Ember</tspan>
                                </text>
                                <rect id="Rectangle-4-Copy-14" fill="#7C7C7C"
                                      transform="translate(197.343750, 125.693218) scale(-1, 1) rotate(-90.000000) translate(-197.343750, -125.693218) "
                                      x="181.979167" y="22.5476617" width="30.7291667" height="206.291113"></rect>
                                <text id="React-Copy" font-family="OpenSans, Open Sans" font-size="13" font-weight="normal" fill="#444444">
                                    <tspan x="25" y="171">React</tspan>
                                </text>
                                <rect id="Rectangle-4-Copy-15" fill="#7C7C7C"
                                      transform="translate(206.177083, 167.260151) scale(-1, 1) rotate(-90.000000) translate(-206.177083, -167.260151) "
                                      x="190.8125" y="55.1018757" width="30.7291667" height="224.316551"></rect>
                                <text id="Angular-2" font-family="OpenSans, Open Sans" font-size="13" font-weight="normal" fill="#444444">
                                    <tspan x="0" y="85">Angular 2</tspan>
                                </text>
                                <rect id="Rectangle-4-Copy-16" fill="#7C7C7C"
                                      transform="translate(176.989583, 82.126286) scale(-1, 1) rotate(-90.000000) translate(-176.989583, -82.126286) "
                                      x="161.625" y="0.0104057139" width="30.7291667" height="164.23176"></rect>
                                <text id="Inferno" font-family="OpenSans, Open Sans" font-size="13" font-weight="normal" fill="#444444">
                                    <tspan x="16" y="41">Inferno</tspan>
                                </text>
                                <rect id="Rectangle-4-Copy-17" fill="#F23F3F"
                                      transform="translate(136.968750, 39.559353) scale(-1, 1) rotate(-90.000000) translate(-136.968750, -39.559353) "
                                      x="121.604167" y="-2.5" width="30.7291667" height="84.1187064"></rect>
                                <text id="Time" transform="translate(237.593750, 257.000000) rotate(-360.000000) translate(-237.593750, -257.000000) "
                                      font-family="OpenSans, Open Sans" font-size="12" font-weight="normal" letter-spacing="3" fill="#F40026">
                                    <tspan x="214.854167" y="261.5">Tim</tspan>
                                    <tspan x="244.690104" y="261.5">e</tspan>
                                </text>
                                <path d="M79.5833333,0.557205011 L79.5833333,269.460897" id="Path-3" stroke="#F40026"></path>
                                <path d="M204.960362,55.3111767 L204.960362,424.386805" id="Path-3" stroke="#F40026"
                                      transform="translate(205.574945, 239.812500) rotate(-270.000000) translate(-205.574945, -239.812500) "></path>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
        <a className="button lg5 sm6" href="#">Learn more about how Inferno performs</a>
    </section>
    <section className="compare-react container">
        <h3>React-like but, different.</h3>
        <div className="row">
            <ul className="options sm3 lg3">
                <li className="active">Compatability</li>
                <li>Custom Namespaces</li>
                <li>Stateful Components</li>
            </ul>
            <div className="copy sm8 lg8">
                Inferno strives to be compatible with much of React’s basic API. However, in some places, alternative implementations have been used. Non-performant features have been removed or replaced where an alternative solution is easy to adopt without too many changes. Inferno doesn’t have React’s synthetic events, which means DOM elements have their events triggered in the same manner as you’d expect from the browser you’re running.
            </div>
        </div>
    </section>
    <section className="try">
        <h3>Try Our Example</h3>
        <div className="container">
            <div className="row">
                <div className="lg7">
                    <h4>Todo List Component</h4>
                    <div className="code">CODE GOES HERE</div>
                </div>
                <div className="lg5">
                    <h4>Imports</h4>
                    <div className="code">CODE GOES HERE</div>
                </div>
            </div>
        </div>
    </section>
</div>
}
