<<<<<<< HEAD
class MovableObject extends DrawableObject {

    speed = 0.15;
    speedY = 0;
    acceleration = 2.5;

    energy = 100;
    lastHit = 0;

=======
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

>>>>>>> aa281ad (Update)
    applyGravity() {

        if (this.gravityInterval) {
            clearInterval(this.gravityInterval);
        }

        this.gravityInterval = setInterval(() => {

            if (this.isAboveGround() || this.speedY > 0) {

                this.y -= this.speedY;
                this.speedY -= this.acceleration;

                /**
                 * Ensures objects land exactly on ground level.
                 * Prevents different landing heights caused by gravity steps.
                 */
                if (!this.isAboveGround() && this.speedY < 0) {
                    this.y = 140;
                    this.speedY = 0;
                }
            }

        }, 1000 / 25);
    }

<<<<<<< HEAD
    // ✔ FIX: stabile Ground-Logik
    isAboveGround() {
        return this.y < 180;
=======
    isAboveGround() {

        if (this instanceof ThrowableObject) {
            return this.y < 360;
        }

        return this.y < 140;
>>>>>>> aa281ad (Update)
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {

        if (!this.isAboveGround()) {
            this.speedY = 32;
        }
    }

<<<<<<< HEAD
    isColliding(mo) {
        return this.x + this.width > mo.x &&
               this.y + this.height > mo.y &&
               this.x < mo.x + mo.width &&
               this.y < mo.y + mo.height;
=======
    getHitbox() {

        return {
            x: this.x + this.offset.left,
            y: this.y + this.offset.top,
            width: this.width - this.offset.left - this.offset.right,
            height: this.height - this.offset.top - this.offset.bottom
        };
    }

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
>>>>>>> aa281ad (Update)
    }

    hit() {

        if (this.energy <= 0) return;

        /**
         * Applies character damage.
         * Increased from 10 to 20 to improve gameplay difficulty.
         */
        this.energy = Math.max(0, this.energy - 20);

        this.lastHit = Date.now();
    }

    isHurt() {
        return (Date.now() - this.lastHit) < 600;
    }

    isDead() {
        return this.energy <= 0;
    }

    playAnimation(images) {

        let i = this.currentImage % images.length;
        let path = images[i];
<<<<<<< HEAD
        let img = this.imageCache[path];
        if (img) this.img = img;
        this.currentImage++;
    }
=======

        this.img = this.imageCache[path];

        if (!this.img) {
            this.img = new Image();
            this.img.src = path;
            this.imageCache[path] = this.img;
        }

        this.currentImage++;
    }

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

    stopGravity() {

        if (this.gravityInterval) {
            clearInterval(this.gravityInterval);
            this.gravityInterval = null;
        }
    }
>>>>>>> aa281ad (Update)
}