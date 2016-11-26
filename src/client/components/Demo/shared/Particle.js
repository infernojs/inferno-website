import Vector from './Vector'

export default class Particle  {
    constructor(point, velocity, minLifetime) {
        Particle.assign(this, point, velocity, minLifetime)
    }

    static assign(self, point, velocity, minLifetime) {
        self.active  = true
        self.lifetime = 0
        self.maxlifetime = minLifetime + Math.random() * 10|0

        self.position = point || new Vector(0, 0)
        self.velocity = velocity || new Vector(0, 0)

        self.origin = new Vector(self.position.x, self.position.y)
        self.origin = new Vector(self.position.x, self.position.y)

        self.acceleration = new Vector(0, 0)
        return self
    }

    get lifetimeLeft() {
        return this.lifetime / this.maxlifetime
    }

    move() {
        // Add our current acceleration to our current velocity
        this.velocity.add(this.acceleration)

        // Add our current velocity to our position
        this.position.add(this.velocity)
    }

    submitToFields(fields) {
        // Debug
        //return null

        // our starting acceleration this frame
        let totalAccelerationX = 0
        let totalAccelerationY = 0

        // for each passed field
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i]

            // find the distance between the particle and the field
            const vectorX = field.position.x - this.position.x
            const vectorY = field.position.y - this.position.y

            // calculate the force via MAGIC and HIGH SCHOOL SCIENCE!
            const force = field.mass / Math.pow(vectorX * vectorX + vectorY * vectorY, 1.5)

            // Math.sign(Math.random()*2-1)
            const noise = (Math.random() * 2 - 1) / 10

            // add to the total acceleration the force adjusted by distance
            totalAccelerationX += vectorX * force
            totalAccelerationY += vectorY * force

            //Simplex noise
            totalAccelerationX += noise
        }

        // update our particle's acceleration
        this.acceleration = new Vector(totalAccelerationX, totalAccelerationY)
    }
}
