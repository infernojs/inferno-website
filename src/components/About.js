import {Component} from 'inferno';

export default class About extends Component {
  render() {
    return <section className="container page row">
      <div className="inner">
        <h1>About Inferno</h1>
        <blockquote>
          Inferno 1.0 is really well written. It's how I would've written React. I'd recommend reading its source to learn.
          <small>&mdash; member of the React core team at Facebook</small>
        </blockquote>
        <h2>Objective</h2>
        <p>
          Inferno is designed to be a light-weight and blazing fast React-like
          Javascript library for building modern interfaces. It was also designed
          to be React compatible, modular and isomorphic. The community supporting
          its development is tasked with continuously improving performance and
          exploring new and efficient methods.
        </p>
        <h2>What's React?</h2>
        <p>
          For those not familiar with React, Inferno is a JavaScript library for
          building user interfaces in a declarative manner. Rather than working
          with MVC/MVVM style patterns, Inferno uses a component-based approach
          where data flows in one direction, making coding predictable, re-usable
          and highly testable. Based on the concept of learn once, write anywhere,
          Inferno doesn't impose any restrictions on how you create components. You
          literally write JavaScript to state how you'd like your UI to look –
          Inferno does all the rest. Inferno also renders content on the server
          via inferno-server and NodeJS, so you can write awesome UIs that get
          rendered full-stack.
        </p>
        <h2>History</h2>
        <p>
          Inferno started as an idea two years ago, to see if a UI library could really
          improve the experience, battery, memory usage and performance on mobile devices.
          At the time we really struggled to get good performance on any UI library/framework
          at the time – it simply wasn't happening, we spent a huge amount of time writing
          lots of vanilla JavaScript code and it did the job – but it was a mess.
        </p>
        <p>
          Since then, things haven't really improved much in the mobile space. Libraries
          have gotten smaller, but the time to parse a 2mb app can result in 5+ seconds
          time before the user can even see anything. Frameworks and libraries need to
          lose bloat, they need to care about performance. Developing on a MacBook Pro
          and seeing animations, routing, complex UIs instantly appear is not going to
          happen on an average mobile device (especially in emerging countries).
        </p>
        <h2>Who's Using Inferno?</h2>
        <p>
          Inferno 1.0 was officially released in early January 2017, however many projects
          have already started using Inferno either in production or for internal testing.
          In a short period of time Inferno grew from around 150 Github stars at the start
          of the year, to around 7300 by the end of the year, 15 NPM downloads to 15k a
          month and 300k downloads from the CDN. Inferno is actively being vetted or already
          in production by these companies:
          <ul className="list columns">
            <li><a target="_blank" rel="noopener noreferrer" href="http://www.thegrid.io">The Grid</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="http://www.evite.com">Evite.com</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="http://www.globo.com">Globo.com (Brazil)</a></li>
          </ul>
          If your company/project is actively using Inferno, we'd love to know about it!
        </p>
        <h2>Read About Inferno</h2>
        <p>
          As the Inferno community grows and evolves, we hope that other people will
          contribute by writing new articles about the library or the community surrounding it.
          Here's a collection of some articles published to date:
          <ul className="list">
            <li><a target="_blank" rel="noopener noreferrer"
                   href="https://auth0.com/blog/learn-about-inferno-js-build-and-authenticate-an-app/?utm_source=twitter&utm_medium=sc&utm_campaign=inferno">Learn
              About Inferno JS: Build and Authenticate an App</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="https://news.ycombinator.com/item?id=11837082">Hacker News</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="http://survivejs.com/blog/inferno-interview/">Inferno - Blazing fast, React-like UI library - Interview
              with Dominic Gannaway</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="http://www.stefankrause.net/wp/?p=316">JS web frameworks benchmark – Round 4</a></li>
            <li><a target="_blank" rel="noopener noreferrer"
                   href="https://medium.com/javascript-inside/introduction-to-functional-front-ends-with-inferno-a188454c3e19#.dg7uhrnoc">Introduction To
              Functional Front-Ends With Inferno</a></li>
          </ul>
        </p>
        <h2>Mobile</h2>
        <p>
          Inferno proves that it is possible to be fast on mobile. Parse-time, load-time,
          rendering complex UIs and all the normal things you'd expect to just work. How
          Inferno does that is based on many factors, but ultimately Inferno's code is much
          better understood by modern JavaScript engines and can be highly optimised to
          perform far better than other libraries/frameworks.
        </p>
      </div>
    </section>;
  }
}
