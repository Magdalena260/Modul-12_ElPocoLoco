class Chicken extends MovableObject {

    y = 340;
    height = 77;
    width = 70;
    speed = 0.8;

    dead = false;
    removeFromWorld = false;

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

        this.x = 400 + Math.random() * 800;

        this.animate();
    }

    animate() {

        setInterval(() => {

            if (!this.dead) {
                this.moveLeft();
            }

        }, 1000 / 60);

        setInterval(() => {

            if (this.dead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }

        }, 200);
    }

    die() {

        if (this.dead) return;

        this.dead = true;
        this.speed = 0;

        this.loadImage(this.IMAGES_DEAD[0]);

        setTimeout(() => {
            this.removeFromWorld = true;
        }, 400);
    }
}