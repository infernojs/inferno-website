import DemoInferno from './Demo.Inferno'
import { Field } from './system/utils'

if (process.env.BROWSER) {
    window.lifetime = 100
    window.demo = {
        width: 400,
        height: 400
    }
    window.pool = []
    window.particles = []

    // Add one field located at `{ x : 400, y : 230}` (to the right of our emitter)
    // that has a mass of `-140`
    window.fields = [
        new Field([0, 0], -50)
        //new Field(new Vector(center - 80, 200), -30),
        //new Field(new Vector(center, 60), 20),
        //new Field(new Vector(center + 80, 200), -30),
    ]
}

export default DemoInferno
