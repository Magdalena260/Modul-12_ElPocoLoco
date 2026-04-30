class ThrowableObject extends MovableObject {

    constructor(x, y, direction) {
        super();

        this.x = x;
        this.y = y;

        this.width = 50;
        this.height = 50;

        this.direction = direction;

        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');

        this.speedY = 25;
        this.applyGravity();

        setInterval(() => {
            if (this.direction === 'left') this.x -= 10;
            else this.x += 10;
        }, 25);
    }
}