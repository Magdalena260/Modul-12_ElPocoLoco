/**
 * Represents a throwable salsa bottle.
 * Handles movement, gravity, collision detection,
 * splash animation and cleanup.
 */
class ThrowableObject extends MovableObject {

    /** @type {number} Horizontal movement speed. */
    speedX = 8;

    /** @type {number|null} ID of the movement interval. */
    interval = null;

    /** @type {number|null} ID of the splash animation interval. */
    splashInterval = null;

    /** @type {boolean} Marks the bottle for removal from the game world. */
    removeFromWorld = false;

    /** @type {boolean} Indicates whether the splash animation is running. */
    isSplashing = false;

IMAGES_SPLASH = [
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
];

    /**
     * Creates a throwable bottle.
     *
     * @param {number} x - Spawn position on the x-axis.
     * @param {number} y - Spawn position on the y-axis.
     * @param {"left"|"right"} direction - Direction of the throw.
     */
    constructor(x, y, direction) {
        super();

        this.x = x;
        this.y = y;

        this.width = 80;
        this.height = 80;

        this.speedX = direction === "left" ? -8 : 8;

        this.loadImage(
            'assets/img/6_salsa_bottle/salsa_bottle.png'
        );

        this.loadImages(this.IMAGES_SPLASH);

        this.speedY = 18;

        this.applyGravity();
        this.throw();
    }

    /**
     * Starts the horizontal movement of the bottle
     * and starts the splash animation when it hits the ground.
     *
     * @returns {void}
     */
    throw() {
        this.interval = setInterval(() => {

            if (!this.isAboveGround() && this.speedY <= 0) {
                this.startSplash();
                return;
            }

            this.x += this.speedX;

            if (this.x < -200 || this.x > 5000) {
                this.destroy();
            }

        }, 1000 / 60);
    }

    /**
     * Starts the splash animation.
     *
     * @returns {void}
     */
    startSplash() {
        if (this.isSplashing) return;

        this.isSplashing = true;

        clearInterval(this.interval);
        this.interval = null;

        this.stopGravity();
        this.currentImage = 0;

        this.playSplashAnimation();
    }

    /**
     * Plays the splash animation once
     * and removes the bottle afterwards.
     *
     * @returns {void}
     */
    playSplashAnimation() {
        this.splashInterval = setInterval(() => {

            if (this.currentImage >= this.IMAGES_SPLASH.length) {
                this.destroy();
                return;
            }

            this.setAnimationImage(
                this.IMAGES_SPLASH[this.currentImage]
            );

            this.currentImage++;

        }, 80);
    }

    /**
     * Returns the collision hitbox of the bottle.
     *
     * @returns {{x: number, y: number, width: number, height: number}}
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
     * Stops all bottle processes and marks it for removal.
     *
     * @returns {void}
     */
    destroy() {
        clearInterval(this.interval);
        clearInterval(this.splashInterval);

        this.interval = null;
        this.splashInterval = null;

        this.stopGravity();

        this.removeFromWorld = true;
    }

    /**
     * Stops all active intervals of the bottle.
     *
     * @returns {void}
     */
    stopIntervals() {
        this.destroy();
    }
}