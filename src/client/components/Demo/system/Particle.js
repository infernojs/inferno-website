export default class Particle  {

    static add(vector1, vector2) {
        vector1[0] += vector2[0]
        vector1[1] += vector2[1]
    }

    static update(p) {
        // Add our current acceleration to our current velocity
        Particle.add(p.velocity, p.gravity)

        // Add our current velocity to our position
        Particle.add(p.position, p.velocity)
    }

    static submitToFields(p, fields) {
        // our starting acceleration this frame
        let accelerationX = 0
        let accelerationY = 0

        // for each passed field
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i]

            // find the distance between the particle and the field
            const vectorX = field.position[0] - p.position[0]
            const vectorY = field.position[1] - p.position[1]

            // calculate the force via MAGIC and HIGH SCHOOL SCIENCE!
            const force = field.mass / Math.pow(vectorX * vectorX + vectorY * vectorY, 1.5)

            // Randomly move left or right
            const noise = (Math.random() * 2 - 1) / 10

            // add to the total acceleration the force adjusted by distance
            accelerationX += vectorX * force
            accelerationY += vectorY * force

            //Simplex noise
            accelerationX += noise
        }

        // update our particle's acceleration
        p.gravity = [accelerationX, accelerationY]
    }
}
