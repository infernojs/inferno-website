import fs from 'fs';
import path from 'path';
import {spawn} from 'child_process';
import crypto from 'crypto';
import router from 'koa-router';

export default router()
  .post('/api/hooks', async(ctx, next) => {
    await new Promise((resolve) => {
      const { fields, headers } = ctx.request;
      const signature = getSecret(JSON.stringify(fields));

      if (signature === headers['x-hub-signature'].substr(5)) {
        console.info('Signature matched, restarting server...');
        pullAndUpdate().then(() => {
          ctx.body = {
            success: true
          };
          resolve();
        });
      } else {
        console.warn('Signature mismatch');
        ctx.body = {
          success: false
        };
        resolve();
      }
    });
  });

// Checks if we're authorized to restart the server
function getSecret(body) {
  const INFERNOJS_SECRET = fs.readFileSync(path.join(__dirname, 'INFERNOJS_SECRET'));
  const secret = process.env.INFERNOJS_SECRET || INFERNOJS_SECRET;
  const hash = crypto.createHmac('sha1', secret).update(body).digest('hex');
  return hash;
}

// Pulls master from github while our watcher automatically rebuilds the bundle
function pullAndUpdate() {
  return execute('cd', ['/www/inferno-website'])
    .then(() => execute('git', ['pull']))
    .then(() => execute('pm2', [
      'restart',
      'infernojs'
    ]));
}

// Run commands
function execute(cmd, args) {
  return new Promise((resolve) => {
    console.log('Command:', cmd, args.join(' '));

    const child = spawn(cmd, args);
    let output = '';

    child.stdout.on('data', function(buffer) {
      output += buffer.toString();
    });
    child.stdout.on('end', function() {
      console.log('Output:', output);
      resolve(output);
    });
  });
}
