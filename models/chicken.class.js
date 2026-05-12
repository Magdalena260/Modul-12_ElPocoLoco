class Chicken extends MovableObject {

    height = 60;
    width = 60;
    y = 360;

    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    };

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
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    die() {
        this.loadImage(this.IMAGES_DEAD[0]);
        this.speed = 0;
        this.remove = true;
    }
}