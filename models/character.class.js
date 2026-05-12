class Character extends MovableObject {

    height = 300;
    width = 150;

    y = 150;
    x = 0;

    speed = 8;

    world;
    otherDirection = false;

    lastMove = new Date().getTime();

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png'
    ];

    constructor() {
        super();

        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.applyGravity();
        this.animate();
    }

    animate() {

        setInterval(() => {

            if (!this.world) return;

            if (this.world.keyboard.RIGHT) {
                this.moveRight();
                this.otherDirection = false;
                this.lastMove = new Date().getTime();
            }

            if (this.world.keyboard.LEFT) {
                this.moveLeft();
                this.otherDirection = true;
                this.lastMove = new Date().getTime();
            }

            if (this.world.keyboard.SPACE) {
                this.jump();
                this.lastMove = new Date().getTime();
            }

        }, 1000 / 60);
    }
}