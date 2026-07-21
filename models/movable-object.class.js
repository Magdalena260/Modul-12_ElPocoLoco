/**
 * Base class for all movable game objects.
 * Adds movement, gravity, collision detection,
 * health system and animation support.
 */
class MovableObject extends DrawableObject {

    /** @type {number} */
    speed = 0.15;

    /** @type {number} vertical speed */
    speedY = 0;

    /** @type {number} gravity acceleration */
    acceleration = 2.5;

    /** @type {number} energy (health) */
    energy = 100;

    /** @type {number} last time object was hit */
    lastHit = 0;

    /** @type {number} animation frame index */
    currentImage = 0;

    /**
     * Collision offset.
     * Important for fair and accurate collisions.
     */
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    };

    /** @type {number|null} gravity interval id */
    gravityInterval;

    /**
     * Applies gravity physics.
     * Prevents unstable falling and jump jitter.
     *
     * @returns {void}
     */
    applyGravity() {

        if (this.gravityInterval) {
            clearInterval(this.gravityInterval);
        }

        this.gravityInterval = setInterval(() => {

            if (this.isAboveGround() || this.speedY > 0) {

                this.y -= this.speedY;

                this.speedY -= this.acceleration;

                /**
                 * Prevents sinking below ground.
                 */
                if (!this.isAboveGround() && this.speedY < 0) {

                    this.speedY = 0;
                }
            }

        }, 1000 / 25);
    }

    /**
     * Checks whether object is above ground.
     * Throwable objects use different ground level.
     *
     * @returns {boolean}
     */
    isAboveGround() {

        /**
         * Throwable bottles should fall
         * much lower than Pepe.
         */
        if (this instanceof ThrowableObject) {

            return this.y < 360;
        }

        return this.y < 140;
    }

    /**
     * Moves object right.
     *
     * @returns {void}
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves object left.
     *
     * @returns {void}
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes object jump.
     *
     * @returns {void}
     */
    jump() {

        if (!this.isAboveGround()) {

            this.speedY = 32;
        }
    }

    /**
     * Returns collision hitbox.
     * Uses offset system for fair collisions.
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
            x: this.x + this.offset.left,
            y: this.y + this.offset.top,
            width:
                this.width -
                this.offset.left -
                this.offset.right,

            height:
                this.height -
                this.offset.top -
                this.offset.bottom
        };
    }

    /**
     * Checks collision with another object.
     *
     * @param {MovableObject} obj
     * @returns {boolean}
     */
    isColliding(obj) {

        if (!obj) return false;

        let a = this.getHitbox();
        let b = obj.getHitbox();

        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    /**
     * Applies damage to object.
     *
     * @returns {void}
     */
    hit() {

        if (this.energy <= 0) return;

        this.energy -= 5;

        if (this.energy < 0) {

            this.energy = 0;
        }

        this.lastHit = Date.now();
    }

    /**
     * Returns if object is hurt.
     *
     * @returns {boolean}
     */
    isHurt() {

        return (
            Date.now() - this.lastHit
        ) < 600;
    }

    /**
     * Returns if object is dead.
     *
     * @returns {boolean}
     */
    isDead() {

        return this.energy <= 0;
    }

    /**
     * Plays looping animation safely.
     * Uses image caching system.
     *
     * @param {string[]} images
     * @returns {void}
     */
    playAnimation(images) {

        let i = this.currentImage % images.length;

        let path = images[i];

        this.img = this.imageCache[path];

        if (!this.img) {

            this.img = new Image();

            this.img.src = path;

            this.imageCache[path] = this.img;
        }

        this.currentImage++;
    }

    /**
     * Plays animation only once.
     * Prevents jump animation glitches.
     *
     * @param {string[]} images
     * @returns {void}
     */
    playAnimationOnce(images) {

        if (this.currentImage >= images.length) return;

        let path = images[this.currentImage];

        this.img = this.imageCache[path];

        if (!this.img) {

            this.img = new Image();

            this.img.src = path;

            this.imageCache[path] = this.img;
        }

        this.currentImage++;
    }

    /**
     * Stops gravity loop safely.
     *
     * @returns {void}
     */
    stopGravity() {

        if (this.gravityInterval) {

            clearInterval(this.gravityInterval);

            this.gravityInterval = null;
        }
    }
}