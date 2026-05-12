class Bottle extends MovableObject {

    constructor(x, y) {
        super();

        this.x = x;
        this.y = y;

        this.width = 100;
        this.height = 100;

        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    }
}