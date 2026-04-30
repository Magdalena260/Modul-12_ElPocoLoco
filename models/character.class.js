class Character extends MovableObject {

    height = 280;
    width = 150;

    y = 150;
    speed = 6;

    world;

    energy = 100;

    lastHit = 0;
    hitCooldown = 1000;

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

    // ================= DAMAGE SYSTEM =================
    hit() {

        let now = new Date().getTime();

        // 🔥 Schutz gegen Instant-Damage
        if (now - this.lastHit < this.hitCooldown) {
            return;
        }

        this.lastHit = now;

        this.energy -= 20;

        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    isDead() {
        return this.energy <= 0;
    }

    // ================= MOVEMENT + ANIMATION =================
    animate() {

        // ================= MOVEMENT =================
        setInterval(() => {

            if (!this.world) return;

            let moving = false;

            // ➡️ RIGHT
            if (
                this.world.keyboard.RIGHT &&
                this.x < this.world.level.level_end_x
            ) {
                this.x += this.speed;
                this.otherDirection = false;
                moving = true;
            }

            // ⬅️ LEFT
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

            if (moving) {
                this.lastMove = new Date().getTime();
            }

        }, 1000 / 60);

        // ================= ANIMATION =================
        setInterval(() => {

            let time = new Date().getTime() - this.lastMove;

            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                return;
            }

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                return;
            }

            if (time > 4000) {
                this.playAnimation(this.IMAGES_SLEEP);
                return;
            }

            this.loadImage(this.IMAGES_WALKING[0]);

        }, 120);
    }
}