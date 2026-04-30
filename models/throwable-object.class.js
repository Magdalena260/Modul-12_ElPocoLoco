class ThrowableObject extends MovableObject {

    constructor(x, y, direction) {
        super();

        this.x = x;
        this.y = y;

        this.width = 50;
        this.height = 50;

        this.direction = direction;

        this.speedX = direction === 'left' ? -12 : 12;
        this.speedY = 10;

        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');

        this.applyGravity();

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x += this.speedX;
        }, 20);
    }
}