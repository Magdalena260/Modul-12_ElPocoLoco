/**
 * ThrowableObject
 * Represents a thrown object (e.g. bottle) with physics-like movement.
 * Moves in a parabolic trajectory using speed and gravity.
 */
class ThrowableObject extends MovableObject {

    /**
     * Creates a throwable object
     * @param {number} x - Initial x position
     * @param {number} y - Initial y position
     * @param {string} direction - Direction of throw ("left" or "right")
     */
    constructor(x, y, direction) {
        super();

        /** Position */
        this.x = x;
        this.y = y;

        /** Size */
        this.width = 50;
        this.height = 50;

        /** Throw direction */
        this.direction = direction;

        /** Horizontal speed based on direction */
        this.speedX = direction === 'left' ? -12 : 12;

        /** Initial upward force */
        this.speedY = 12;

        /** Gravity affecting the object */
        this.gravity = 0.5;

        /** Image of the throwable object */
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');

        this.throw();
    }

    /**
     * Starts movement simulation (throw trajectory)
     * Updates position ~60 times per second
     */
    throw() {

        setInterval(() => {

            // horizontal movement
            this.x += this.speedX;

            // vertical movement (parabolic arc)
            this.y -= this.speedY;

            // gravity effect
            this.speedY -= this.gravity;

        }, 1000 / 60);
    }
}