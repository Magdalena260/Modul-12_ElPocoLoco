class Character extends MovableObject {

    height = 280;
    width = 150;

    y = 150;
    speed = 6;

    world;
    lastMove = new Date().getTime();

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png'
    ];

    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png'
    ];

    constructor() {
        super();

        this.loadImage(this.IMAGES_WALKING[0]);

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_SLEEP);

        this.applyGravity();
        this.animate();
    }

    animate() {

        // ================= MOVEMENT =================
        setInterval(() => {

            if (!this.world) return;

            let moving = false;

            // ➡️ RIGHT (mit Level-Limit)
            if (
                this.world.keyboard.RIGHT &&
                this.x < this.world.level.level_end_x
            ) {
                this.x += this.speed;
                this.otherDirection = false;
                moving = true;
            }

            // ⬅️ LEFT (nicht raus aus Map)
            if (
                this.world.keyboard.LEFT &&
                this.x > 0
            ) {
                this.x -= this.speed;
                this.otherDirection = true;
                moving = true;
            }

            // 🦘 JUMP
            if (
                this.world.keyboard.SPACE &&
                !this.isAboveGround()
            ) {
                this.jump();
                moving = true;
            }

            // 📷 CAMERA
            this.world.camera_x = -this.x + 100;

            // ⏱ last move tracking
            if (moving) {
                this.lastMove = new Date().getTime();
            }

        }, 1000 / 60);


        // ================= ANIMATION =================
        setInterval(() => {

            let time = new Date().getTime() - this.lastMove;

            // 🦘 Jump
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                return;
            }

            // 🚶 Walk
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                return;
            }

            // 😴 ZZZ
            if (time > 4000) {
                this.playAnimation(this.IMAGES_SLEEP);
                return;
            }

            // 🙂 idle fallback
            this.loadImage(this.IMAGES_WALKING[0]);

        }, 120);
    }
}