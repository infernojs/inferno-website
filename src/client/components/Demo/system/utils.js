export function easeOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

export function remove(arr, value) {
    if (arr.indexOf(value)!==-1) {
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
}

export class Field {
    constructor(point, mass) {
        this.position = point;
        this.mass = mass || 100;
        this.className = mass < 0 ? 'minus' : 'plus';
    }
}
