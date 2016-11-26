import Vector from './Vector'
import Particle from './Particle'

export default class Emitter {
    constructor(point, velocity, spread) {
        this.position = point; // Vector
        this.velocity = velocity; // Vector
        this.spread = spread || Math.PI / 32; // possible angles = velocity +/- spread
        this.drawColor = "#999"; // So we can tell them apart from Fields later
    }

    emitParticles(minLifetime) {
        // Use an angle randomized over the spread so we have more of a "spray"
        const angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);

        // The magnitude of the emitter's velocity
        const magnitude = this.velocity.getMagnitude();

        // The emitter's position
        const position = new Vector(this.position.x, this.position.y);

        // New velocity based off of the calculated angle and magnitude
        const velocity = Vector.fromAngle(angle, magnitude);

        if (window.pool.length) {
            const newParticle = window.pool.pop()
            Particle.assign(newParticle, position, velocity, minLifetime)
            return newParticle
        }

        // return our new Particle!
        return new Particle(position, velocity, minLifetime);
    }
}
