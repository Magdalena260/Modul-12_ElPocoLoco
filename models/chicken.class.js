class Chicken extends MovableObject {

    offset = { top: 5, left: 10, right: 10, bottom: 5 };

    y = 340;
    height = 90;
    width = 85;
    speed = 0.8;

    dead = false;
    removeFromWorld = false;

    activated = false;
    activationX = 450;

    movementInterval;
    animationInterval;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 400 + Math.random() * 1200;
        this.animate();
    }

    animate() {

        this.movementInterval = setInterval(() => {

            if (this.dead || !this.world?.character) return;

            let dist = Math.abs(this.world.character.x - this.x);

            if (dist < this.activationX) this.activated = true;

            if (this.activated) this.moveLeft();

        }, 1000 / 60);

        this.animationInterval = setInterval(() => {

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
        }, 400);
    }

    stopIntervals() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }
}