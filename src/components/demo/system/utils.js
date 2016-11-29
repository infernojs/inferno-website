export function easeOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

export function getColors(t) {
    return [
        easeOutCubic(1 - t) * 255|0,
        easeOutCubic(1 - t * 2) * 255|0,
        easeOutCubic(1 - t * 5) * 255|0
    ]
}

export function remove(arr, value) {
    if (arr.indexOf(value) !== -1) {
        arr.splice(arr.indexOf(value), 1);
    }
}

export class Vector {

    // Gets the length of the vector
    static getMagnitude([x, y]) {
        return Math.sqrt(x * x + y * y);
    }

    // Gets the angle accounting for the quadrant we're in
    static getAngle([x, y]) {
        return Math.atan2(y, x);
    }

    // Allows us to get a new vector from angle and magnitude
    static fromAngle(angle, magnitude) {
        return [
            magnitude * Math.cos(angle),
            magnitude * Math.sin(angle)
        ];
    }

    static add(vector1, vector2) {
        vector1[0] += vector2[0]
        vector1[1] += vector2[1]
    }

    static update(p) {
        // Add our current velocity to our position
        Vector.add(p.position, p.velocity)
    }

    static submitToFields(p, field) {
        // find the distance between the particle and the field
        const vectorX = field.position[0] - p.position[0]
        const vectorY = field.position[1] - p.position[1]

        // calculate the force via MAGIC and HIGH SCHOOL SCIENCE!
        const force = field.mass / Math.pow(vectorX * vectorX + vectorY * vectorY, 1.5)

        // Randomly move left or right
        const noise = (Math.random() * 2 - 1) / 10

        // add to the total acceleration the force adjusted by distance
        let gravityX = vectorX * force + noise
        let gravityY = vectorY * force

        // update our particle's velocity
        Vector.add(p.velocity, [gravityX, gravityY])
    }
}

export class Field {
    constructor(point, mass) {
        this.position = point;
        this.mass = mass || 100;
        this.className = mass < 0 ? 'minus' : 'plus';
    }
}
