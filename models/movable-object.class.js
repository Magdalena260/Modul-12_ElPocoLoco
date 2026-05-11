/**
 * Base class for all movable game objects.
 * Provides physics (gravity), movement, collision detection,
 * health system, and animation handling.
 */
class MovableObject extends DrawableObject {

    /** @type {number} horizontal movement speed */
    speed = 0.15;

    /** @type {number} vertical speed (used for jumping/falling) */
    speedY = 0;

    /** @type {number} gravity acceleration applied each frame */
    acceleration = 2.5;

    /** @type {number} current energy (health) */
    energy = 100;

    /** @type {number} timestamp of last hit */
    lastHit = 0;

    /**
     * Applies gravity to the object.
     * Continuously updates vertical position and speed.
     */
    applyGravity() {

        setInterval(() => {

            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 25);
    }

    /**
     * Checks if the object is above ground level.
     * @returns {boolean}
     */
    isAboveGround() {
        return this.y < 140;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump if it is on the ground.
     */
    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 32;
        }
    }

    /**
     * Checks collision with another movable object.
     * @param {MovableObject} mo - other object
     * @returns {boolean} true if colliding
     */
    isColliding(mo) {
        return (
            this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height
        );
    }

    /**
     * Reduces energy when hit.
     * Sets timestamp of last hit.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) this.energy = 0;
        this.lastHit = new Date().getTime();
    }

    /**
     * Plays animation from an array of image paths.
     * Ensures image is always set even if not cached yet.
     * @param {string[]} images - animation frames
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];

        this.img = this.imageCache[path] || new Image();

        if (!this.imageCache[path]) {
            this.img.src = path;
        }

        this.currentImage++;
    }
}