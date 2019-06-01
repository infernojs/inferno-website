import 'regenerator-runtime/runtime';
import {renderToString} from 'inferno-server';
import {StaticRouter} from 'inferno-router';
import config from '../config';
import Index from '../../components/Index';
import routes from '../../routes';

// Server-side render
export default async(ctx, next) => {
  const context = {};
  const content = renderToString(
    <StaticRouter location={ctx.url} context={context}>
      <Index hostname={ctx.hostname} config={config}>
        {routes}
      </Index>
    </StaticRouter>
  );

  // This will contain the URL to redirect to if <Redirect> was used
  if (context.url) {
    return ctx.redirect(context.url);
  }

  ctx.type = 'text/html';
  ctx.body = '<!DOCTYPE html>\n' + content;
  await next();
};
