export default class Field {

    constructor(point, mass) {
        this.position = point;
        this.setMass(mass);
    }

    setMass(mass) {
        this.mass = mass || 100;
        this.className = mass < 0 ? 'minus' : 'plus';
    }
}

