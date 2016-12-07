import Inferno from 'inferno'
import fs from 'fs'
import path from 'path'
import router from 'koa-router'

export default router()
.post('/api/hooks', async(ctx, next) => {
    const { fields } = ctx.request

    console.log(fields)
    fs.writeFileSync(path.join(__dirname, 'test----post.json'), JSON.stringify(fields))

    ctx.body = {
        success: true
    }
})
.put('/api/hooks', async(ctx, next) => {
    const { fields } = ctx.request

    console.log(fields)
    fs.writeFileSync(path.join(__dirname, 'test----put.json'), JSON.stringify(fields))

    ctx.body = {
        success: true
    }
})
.get('/api/hooks', async(ctx, next) => {
    // test
    console.log(ctx.query)
    fs.writeFileSync(path.join(__dirname, 'test----get.json'), JSON.stringify(ctx.query))

    ctx.body = {
        success: true
    }
})

// FasterThanHell
async function pullAndUpdate(location) {

}
