import Inferno from 'inferno'
import { renderToStaticMarkup } from 'inferno-server'
import router from 'koa-router'
import { transform } from 'babel-core'

export default router()
.post('/api/repl', async(ctx, next) => {
    const { code } = ctx.request.fields

    ctx.body = compile(code)
})

const options = {
    plugins: [
        "transform-es2015-arrow-functions",
        "transform-es2015-block-scoped-functions",
        "transform-es2015-block-scoping",
        "transform-es2015-classes",
        "transform-es2015-computed-properties",
        "transform-es2015-literals",
        "transform-es2015-parameters",
        "transform-es2015-shorthand-properties",
        "transform-es2015-spread",
        "transform-es2015-template-literals",
        "transform-class-properties",
        "transform-es2015-modules-commonjs",
        "transform-es2015-destructuring",
        "transform-object-rest-spread",
        "babel-plugin-inferno"
    ]
}

function compile(code) {
    try {
        const transformedCode = transform(code, options).code
        const ExportedComponent = eval(transformedCode)
        const infernoResult = renderToStaticMarkup(<ExportedComponent/>)
        return infernoResult
    } catch(ex) {
        return 'Please do not use: import, require, console.log'
    }
}
