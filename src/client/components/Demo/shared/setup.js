import Emitter from './Emitter'
import Vector from './Vector'
import Field from './Field'

// Add one emitter located at `{ x : 100, y : 230}` from the origin (top left)
// that emits at a velocity of `2` shooting out from the right (angle `0`)
export const width = 400;
export const height = 400;
export const center = (width / 2) | 0;
export const cellsPerRow = 10

export const emitters = [
    new Emitter(new Vector(center - 10, center + 50), Vector.fromAngle(-1.9, 2.2), 0.4),
    new Emitter(new Vector(center, center + 50), Vector.fromAngle(-1.5, 2.8), 0.1),
    new Emitter(new Vector(center + 10, center + 50), Vector.fromAngle(-1.1, 2.2), 0.4)
]

// Add one field located at `{ x : 400, y : 230}` (to the right of our emitter)
// that has a mass of `-140`
export const fields = [
    new Field(new Vector(0, 0), -50)
    //new Field(new Vector(center - 80, 200), -30),
    //new Field(new Vector(center, 60), 20),
    //new Field(new Vector(center + 80, 200), -30),
];
