class Chicken extends MovableObject {

    y = 340;
    height = 77;
    width = 70;
    speed = 0.8; // 🔥 wichtig: eigene Geschwindigkeit

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super();

        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 500;

        this.animate();
    }

    animate() {

        setInterval(() => {
            this.moveLeft(); // 🔥 DAS war oft das Problem
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}