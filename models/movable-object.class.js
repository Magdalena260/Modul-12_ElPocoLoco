class MovableObject extends DrawableObject {

    speed = 0.15;
    speedY = 0;
    acceleration = 2.5;

    energy = 100;
    lastHit = 0;

    applyGravity() {

        setInterval(() => {

            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 25);
    }

    // ✔ FIX: stabile Ground-Logik
    isAboveGround() {
        return this.y < 180;
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

    isColliding(mo) {
        return this.x + this.width > mo.x &&
               this.y + this.height > mo.y &&
               this.x < mo.x + mo.width &&
               this.y < mo.y + mo.height;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) this.energy = 0;
        this.lastHit = new Date().getTime();
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        let img = this.imageCache[path];
        if (img) this.img = img;
        this.currentImage++;
    }
}