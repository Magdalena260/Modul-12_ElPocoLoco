class Chicken extends MovableObject {

    height = 60;
    width = 60;
    y = 360;

    dead = false;

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

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 300 + Math.random() * 1200;
        this.speed = 0.5 + Math.random() * 0.5;

        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.dead) return;
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.dead) return;
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    die() {

        if (this.dead) return;

        this.dead = true;
        this.speed = 0;

        this.loadImage(this.IMAGES_DEAD[0]);

        this.height = 20;
        this.y += 40;

        setTimeout(() => {
            this.remove = true;
        }, 800);
    }
}