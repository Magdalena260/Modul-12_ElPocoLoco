class ThrowableObject extends MovableObject {

    interval;

    constructor(x, y) {
        super();

        this.x = x;
        this.y = y;

        this.width = 60;
        this.height = 60;

        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle.png');

        this.throw();
    }

    throw() {

        this.speedY = 25;
        this.applyGravity();

        this.interval = setInterval(() => {
            this.x += 10;
        }, 25);
    }

    clear() {
        clearInterval(this.interval);
    }
}