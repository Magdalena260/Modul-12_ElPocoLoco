/**
 * Throwable object with real arc physics + rotation
 */
class ThrowableObject extends MovableObject {

    speedX;
    speedY = 18;
    gravity = 1.2;

    rotation = 0;
    rotationSpeed = 10;

    direction;

    constructor(x, y, direction) {
        super();

        this.x = x;
        this.y = y;

        this.width = 50;
        this.height = 50;

        this.direction = direction;

        this.speedX = direction === "left" ? -12 : 12;

        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');

        this.start();
    }

    /**
     * Physics loop
     */
    start() {

        this.interval = setInterval(() => {

            // movement
            this.x += this.speedX;

            this.y -= this.speedY;
            this.speedY -= this.gravity;

            // rotation
            this.rotation += this.rotationSpeed;

            // cleanup (out of screen)
            if (this.y > 500 || this.x < -2000 || this.x > 4000) {
                clearInterval(this.interval);
                this.remove = true;
            }

        }, 1000 / 60);
    }

    /**
     * draw override (if your engine supports rotation rendering)
     */
    draw(ctx) {

        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}