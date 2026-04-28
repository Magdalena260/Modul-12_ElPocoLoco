class Character extends MovableObject {

    height = 300;
    y = 220; // 👈 WICHTIG: gleiche Linie wie Hühner-Basis
    speed = 5;

    world;
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

            // ➡️
            if (this.world.keyboard.RIGHT) {
                this.moveRight();
            }

            // ⬅️
            if (this.world.keyboard.LEFT) {
                this.moveLeft();
            }

            // 🦘
            if (this.world.keyboard.SPACE) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;

        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 120);
    }
}