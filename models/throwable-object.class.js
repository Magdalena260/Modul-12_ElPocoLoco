class ThrowableObject extends MovableObject {

    constructor(x, y, direction) {
        super();

        this.x = x;
        this.y = y;

        this.width = 50;
        this.height = 50;

        this.direction = direction;

        this.speedX = direction === 'left' ? -12 : 12;
        this.speedY = 12;

        this.gravity = 0.5;

        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');

        this.throw();
    }

    throw() {

        setInterval(() => {

            this.x += this.speedX;

            this.y -= this.speedY;
            this.speedY -= this.gravity;

        }, 1000 / 60);
    }
}