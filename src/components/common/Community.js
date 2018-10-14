const SPONSORS_COUNT = 3;

export function Community() {
  const infernoOpenCollective = 'https://opencollective.com/inferno';

  const content = [
    <h3>Community</h3>,
    <p>There is an <a rel="nofollow" href="https://infernojs.slack.com">Inferno Slack</a> group where you can ask questions and find out the latest news about Inferno development. You can join via <a rel="nofollow" href="https://inferno-slack.herokuapp.com">inferno-slack.herokuapp.com.</a></p>,
    <h4>Contributors</h4>,
    <a href="https://github.com/infernojs/inferno/graphs/contributors"><img src={infernoOpenCollective + "/contributors.svg?width=890"} /></a>,
    <h4>Backers</h4>,
    <p>Thank you to all our backers! <a href={infernoOpenCollective}>[Become a backer]</a></p>,
    <a href={infernoOpenCollective} rel="noopener noreferrer" target="_blank"><img src={ infernoOpenCollective + "/backers.svg?width=890"}/></a>,
    <h4>Sponsors</h4>,
    <p>Support this project by becoming a sponsor. Your logo will show up here with a link to your website. <a href={infernoOpenCollective}>[Become a sponsor]</a></p>
  ];

  for (let i = 0; i < SPONSORS_COUNT; i++) {
    content.push(<a href={`${infernoOpenCollective}/sponsor/${i}/website`} rel="noopener noreferrer" target="_blank"><img alt="" src={`${infernoOpenCollective}/sponsor/${i}/avatar.svg`}/></a>);
  }

  return (
    <section className="col-mr-auto text-center" $HasNonKeyedChildren>
      {content}
    </section>
  );
}
