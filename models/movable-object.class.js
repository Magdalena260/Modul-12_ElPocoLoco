/**
 * Base class for all movable game objects.
 * Provides physics (gravity), movement, collision detection,
 * health system, animation handling and HITBOX (OFFSET) system.
 */
class MovableObject extends DrawableObject {

    speed = 0.15;
    speedY = 0;
    acceleration = 2.5;

    energy = 100;
    lastHit = 0;

    /**
     * Default hitbox offsets (can be overwritten in child classes)
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Gravity system
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
     * Checks if object is above ground
     */
    isAboveGround() {
        return this.y < 140;
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

    /**
     * 🔥 COLLISION FIX USING HITBOXES
     */
    isColliding(mo) {

        let a = this.getHitbox();
        let b = mo.getHitbox();

        return (
            a.x + a.width > b.x &&
            a.y + a.height > b.y &&
            a.x < b.x + b.width &&
            a.y < b.y + b.height
        );
    }

    /**
     * 🔥 HITBOX SYSTEM (OFFSET FIX)
     * This is what fixes "collecting from far away"
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
     * Animation system
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