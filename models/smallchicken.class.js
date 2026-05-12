class SmallChicken extends MovableObject {

    y = 370;
    height = 50;
    width = 45;

    speed = 1.6;

    dead = false;
    activated = false;

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

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 400 + Math.random() * 800;

        this.animate();
    }

    animate() {

        setInterval(() => {

            if (this.dead) return;

            if (!this.activated && this.world?.character) {
                let dist = Math.abs(this.world.character.x - this.x);
                if (dist < 800) this.activated = true;
            }

            if (this.activated) this.moveLeft();

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

        this.height = 20;

        setTimeout(() => {
            this.remove = true;
        }, 800);
    }
}