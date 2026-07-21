/**
 * Throwable bottle object.
 * Handles gravity, movement,
 * collision hitbox and cleanup.
 */
class ThrowableObject extends MovableObject {

    /** @type {number} horizontal speed */
    speedX = 8;

    /** @type {number} movement interval id */
    interval;

    /**
     * Creates a throwable bottle.
     *
     * @param {number} x spawn x position
     * @param {number} y spawn y position
     * @param {"left"|"right"} direction throw direction
     */
    constructor(x, y, direction) {
        super();

        this.x = x;
        this.y = y;

        /**
         * Bigger size improves
         * collision fairness.
         */
        this.width = 80;
        this.height = 80;

        this.speedX = direction === "left"
            ? -8
            : 8;

        this.loadImage(
            'img/6_salsa_bottle/salsa_bottle.png'
        );

        /**
         * Lower throw arc.
         * Better chicken collision.
         */
        this.speedY = 18;

        this.applyGravity();

        this.throw();
    }

    /**
     * Starts bottle movement.
     * Gravity handles vertical motion.
     *
     * @returns {void}
     */
    throw() {

        this.interval = setInterval(() => {

            this.x += this.speedX;

            /**
             * Cleanup when outside map.
             */
            if (this.x < -200 || this.x > 5000) {

                this.destroy();
            }

        }, 1000 / 60);
    }

    /**
     * Returns accurate collision hitbox.
     * Smaller than sprite for fair hits.
     *
     * @returns {{
     * x:number,
     * y:number,
     * width:number,
     * height:number
     * }}
     */
    getHitbox() {

        return {
            x: this.x + 10,
            y: this.y + 10,
            width: this.width - 20,
            height: this.height - 20
        };
    }

    /**
     * Stops all bottle intervals safely.
     *
     * @returns {void}
     */
    destroy() {

        clearInterval(this.interval);

        this.stopGravity?.();
    }

    /**
     * Global cleanup helper.
     *
     * @returns {void}
     */
    stopIntervals() {

        this.destroy();
    }
}