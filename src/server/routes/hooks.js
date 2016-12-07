import Inferno from 'inferno'
import fs from 'fs'
import sys from 'sys'
import path from 'path'
import { exec } from 'child_process'
import crypto from 'crypto'
import router from 'koa-router'

export default router()
.post('/api/hooks', async(ctx, next) => {
    const { fields, headers } = ctx.request
    console.log('sha1', headers['x-hub-signature'].substr(5))

    if (getSecret(JSON.stringify(fields)) === headers['x-hub-signature'].substr(5)) {
        pullAndUpdate()
    }

    ctx.body = {
        success: true
    }
})

function getSecret(body) {

    const INFERNOJS_SECRET = fs.readFileSync(path.join(__dirname, 'INFERNOJS_SECRET'))
    const secret = process.env.INFERNOJS_SECRET || INFERNOJS_SECRET
    const hash = crypto.createHmac('sha1', secret).update(body).digest('hex')

    console.log('SECRET', secret)
    console.log('HASH', hash)
    return hash
}

function pullAndUpdate() {
    const cmd = 'cd /www/infernojs; git pull'
    exec(cmd, function puts(error, stdout, stderr) {
        fs.writeFileSync(path.join(__dirname, process.env.INFERNOJS_SECRET), 'OK')
        sys.puts(stdout)
    });
}
