/**
 * Base class for all movable game objects
 * Handles physics, gravity, collision, animation, and health system
 */
class MovableObject extends DrawableObject {

    speed = 0.15;
    speedY = 0;
    acceleration = 2.5;

    energy = 100;
    lastHit = 0;

    groundLevel = 140;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    gravityInterval;

    /**
     * Gravity system (stable version)
     * Applies falling physics with ground clamp
     */
    applyGravity() {

        this.gravityInterval = setInterval(() => {

            // Falling / jumping physics
            if (this.isAboveGround() || this.speedY > 0) {

                this.y -= this.speedY;
                this.speedY -= this.acceleration;

            } else {

                // Hard clamp to ground (prevents sinking/floating bugs)
                this.y = this.groundLevel;
                this.speedY = 0;
            }

        }, 1000 / 25);
    }

    /**
     * Checks if object is above ground level
     */
    isAboveGround() {
        return this.y < this.groundLevel;
    }

    /**
     * Move right
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Move left
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Jump impulse
     */
    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 32;
        }
    }

    /**
     * Returns hitbox with safe offset handling
     */
    getHitbox() {

        let o = this.offset || {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        };

        return {
            x: this.x + o.left,
            y: this.y + o.top,
            width: this.width - o.left - o.right,
            height: this.height - o.top - o.bottom
        };
    }

    /**
     * Collision detection using AABB + offset system
     */
    isColliding(mo) {

        if (!mo) return false;

        let a = this.getHitbox();
        let b = mo.getHitbox();

        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    /**
     * Damage system
     */
    hit() {

        this.energy -= 5;

        if (this.energy < 0) {
            this.energy = 0;
        }

        this.lastHit = new Date().getTime();
    }

    /**
     * Animation helper
     */
    playAnimation(images) {

        if (!images || images.length === 0) return;

        let i = this.currentImage % images.length;
        let path = images[i];

        this.img = this.imageCache[path];

        if (!this.img) {
            this.img = new Image();
            this.img.src = path;
        }

        this.currentImage++;
    }
}