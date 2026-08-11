/**
 * Base class for all movable game objects.
 * Handles movement, gravity, collision detection,
 * health and animation.
 */
class MovableObject extends DrawableObject {

    /** @type {number} Movement speed. */
    speed = 0.15;

    /** @type {number} Vertical movement speed. */
    speedY = 0;

    /** @type {number} Gravity acceleration. */
    acceleration = 2.5;

    /** @type {number} Current health. */
    energy = 100;

    /** @type {number} Timestamp of the last hit. */
    lastHit = 0;

    /**@type {number} Current animation frame index. */
    currentImage = 0;

    /**
     * Collision offsets used to adjust the object's hitbox.
     */
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    };

    /** @type {number|null} ID of the gravity interval. */
    gravityInterval = null;

    /**
     * Applies gravity to the object.
     *
     * @returns {void}
     */
    applyGravity() {
        this.stopGravity();

        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.applyVerticalMovement();
            }
        }, 1000 / 60);
    }

    /**
     * Updates the vertical position and speed.
     *
     * @returns {void}
     */
    applyVerticalMovement() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;

        this.snapToGround();
    }

    /**
     * Places the object on its ground level when landing.
     *
     * @returns {void}
     */
    snapToGround() {
        const groundY = this.getGroundY();

        if (this.y >= groundY && this.speedY <= 0) {
            this.y = groundY;
            this.speedY = 0;
        }
    }

    /**
     * Returns the ground position for the object.
     *
     * @returns {number} Ground position on the y-axis.
     */
    getGroundY() {
        if (this instanceof ThrowableObject) {
            return 360;
        }

        return 140;
    }

    /**
     * Checks whether the object is above its ground level.
     *
     * @returns {boolean} True if the object is above ground.
     */
    isAboveGround() {
        return this.y < this.getGroundY();
    }

    /**
     * Moves the object to the right.
     *
     * @returns {void}
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     *
     * @returns {void}
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump when it is on the ground.
     *
     * @returns {void}
     */
    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 32;
        }
    }

    /**
     * Returns the collision hitbox of the object.
     *
     * @returns {{x: number, y: number, width: number, height: number}}
     */
    getHitbox() {
        return {
            x: this.x + this.offset.left,
            y: this.y + this.offset.top,
            width: this.width - this.offset.left - this.offset.right,
            height: this.height - this.offset.top - this.offset.bottom
        };
    }

    /**
     * Checks whether this object collides with another object.
     *
     * @param {MovableObject} obj - Object to check for collision.
     * @returns {boolean} True if both objects collide.
     */
    isColliding(obj) {
        if (!obj) return false;

        const a = this.getHitbox();
        const b = obj.getHitbox();

        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    /**
     * Reduces the object's health.
     *
     * @returns {void}
     */
    hit() {
        if (this.energy <= 0) return;

        this.energy -= 10;
        this.energy = Math.max(0, this.energy);

        this.lastHit = Date.now();
    }

    /**
     * Checks whether the object was recently hit.
     *
     * @returns {boolean} True if the object was recently hit.
     */
    isHurt() {
        return Date.now() - this.lastHit < 600;
    }

    /**
     * Checks whether the object has no health remaining.
     *
     * @returns {boolean} True if the object is dead.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Plays an animation repeatedly.
     *
     * @param {string[]} images - Paths of the animation images.
     * @returns {void}
     */
    playAnimation(images) {
        const i = this.currentImage % images.length;
        const path = images[i];

        this.setAnimationImage(path);
        this.currentImage++;
    }

    /**
     * Plays an animation once.
     *
     * @param {string[]} images - Paths of the animation images.
     * @returns {void}
     */
    playAnimationOnce(images) {
        if (this.currentImage >= images.length) return;

        const path = images[this.currentImage];

        this.setAnimationImage(path);
        this.currentImage++;
    }

    /**
     * Sets an animation image from the image cache.
     *
     * @param {string} path - Path of the image.
     * @returns {void}
     */
    setAnimationImage(path) {
        this.img = this.imageCache[path];

        if (!this.img) {
            this.img = new Image();
            this.img.src = path;
            this.imageCache[path] = this.img;
        }
    }

    /**
     * Stops the gravity interval.
     *
     * @returns {void}
     */
    stopGravity() {
        if (!this.gravityInterval) return;

        clearInterval(this.gravityInterval);
        this.gravityInterval = null;
    }
}