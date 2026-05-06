class Chicken extends MovableObject {

    y = 340;
    height = 77;
    width = 70;
    speed = 0.8;

    dead = false;
    removeFromWorld = false;

    activated = false;   // 
    activationX = 900;   //etwas später als small chicken

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
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

            if (this.dead) return;

            //Aktivierung erst bei Nähe
            if (!this.activated && this.world?.character) {
                let distance = Math.abs(this.world.character.x - this.x);

                if (distance < this.activationX) {
                    this.activated = true;
                }
            }

            if (this.activated) {
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