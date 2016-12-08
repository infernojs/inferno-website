import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'
import crypto from 'crypto'
import router from 'koa-router'

export default router()
.post('/api/hooks', async(ctx, next) => {
    const { fields, headers } = ctx.request
    const signature = getSecret(JSON.stringify(fields))

    if (signature === headers['x-hub-signature'].substr(5)) {
        console.info('Signature matched, restarting server...')
        pullAndUpdate()
    } else {
        console.warn('Signature mismatch')
    }

    ctx.body = { success: true }
})

function getSecret(body) {
    const INFERNOJS_SECRET = fs.readFileSync(path.join(__dirname, 'INFERNOJS_SECRET'))
    const secret = process.env.INFERNOJS_SECRET || INFERNOJS_SECRET
    const hash = crypto.createHmac('sha1', secret).update(body).digest('hex')
    return hash
}

function pullAndUpdate() {
    execute('cd /www/infernojs', function() {
        execute('git pull')
    })
}

function execute(cmd, callback) {
    exec(cmd, function(err, stdout) {
        if (err) throw err;

        console.log(stdout)
        console.log('Executed:', cmd)
        callback && callback()
    })
}
