class SmallChicken extends MovableObject {

    offset = { top: 2, left: 8, right: 8, bottom: 4 };

    y = 370;
    width = 70;
    height = 75;
    speed = 1.4;

    dead = false;
    removeFromWorld = false;

    activationX = 600;
    activated = false;

    movementInterval;
    animationInterval;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super();

        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 500 + Math.random() * 1400;
        this.animate();
    }

    animate() {

        this.movementInterval = setSafeInterval(() => {

            if (!this.world || this.dead) return;
            if (this.world.state !== "running") return;

            let dist = Math.abs(this.world.character.x - this.x);

            if (dist < this.activationX) this.activated = true;

            if (this.activated) this.moveLeft();

        }, 1000 / 60);

        this.animationInterval = setSafeInterval(() => {

            if (!this.world || this.world.state !== "running") return;

            if (this.dead) {
                this.loadImage(this.IMAGES_DEAD[0]);
                return;
            }

            this.playAnimation(this.IMAGES_WALKING);

        }, 180);
    }

    die() {

        if (this.dead) return;

        this.dead = true;
        this.speed = 0;

        this.loadImage(this.IMAGES_DEAD[0]);

        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);

        setTimeout(() => {
            this.removeFromWorld = true;
        }, 300);
    }

    stopIntervals() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }
}