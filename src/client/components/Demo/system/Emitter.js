import { Vector, } from './utils'

if (process.env.BROWSER) {
    window.pool = []
}

function randomPosition(x, y) {
    return [x + Math.random() * 5, y]
}

function createParticle(position, velocity, lifetimeMax) {
    return {
        active : true,
        lifetime: 0,
        lifetimeMax: lifetimeMax + Math.random() * 10|0,
        origin: position,
        position,
        velocity: velocity || [0, 0],
        gravity: [0, -0.01]
    }
}

export default class Emitter {
    static emitParticles(lifetimeMax) {

        const position = randomPosition(200, 300);
        const spread = 0.4

        let velocity = Vector.fromAngle(-1.2, 2.4)

        // Use an angle randomized over the spread so we have more of a "spray"
        const angle = Vector.getAngle(velocity) + spread - (Math.random() * spread * 2);

        // The magnitude of the emitter's velocity
        const magnitude = Vector.getMagnitude(velocity);

        // New velocity based off of the calculated angle and magnitude
        velocity = Vector.fromAngle(angle, magnitude);

        /*if (window.pool.length) {
            const newParticle = window.pool.pop()
            Particle.assign(newParticle, position, velocity, minLifetime)
            return newParticle
        }*/

        // return our new Particle!
        return createParticle(position, velocity, lifetimeMax);
    }
}
