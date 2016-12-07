import Inferno from 'inferno'
import fs from 'fs'
import path from 'path'
import router from 'koa-router'

export default router()
.post('/api/hooks', async(ctx, next) => {
    const { fields, headers } = ctx.request

    fs.writeFileSync(path.join(__dirname, 'test-headers.json'), JSON.stringify(headers, null, 4))
    fs.writeFileSync(path.join(__dirname, 'test-post.json'), JSON.stringify(fields, null, 4))

    ctx.body = {
        success: true
    }
})

async function pullAndUpdate(location) {

}
