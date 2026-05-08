/**
 * Represents the main player character.
 * Handles movement, animation, jumping, energy system and input control.
 * Extends MovableObject.
 */
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

    /**
     * Creates the player character and initializes animations and gravity.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.animate();
    }

    /**
     * Applies damage to the character with cooldown protection.
     */
    hit() {
        let now = new Date().getTime();

        if (now - this.lastHit < this.hitCooldown) return;

        this.lastHit = now;
        this.energy -= 20;

        if (this.energy < 0) this.energy = 0;
    }

    /**
     * Checks if the character is dead.
     * @returns {boolean}
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Handles movement input, camera movement and jumping.
     */
    animate() {

        setInterval(() => {

            if (!this.world || this.world.state !== "running") return;

            let moving = false;

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                moving = true;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                moving = true;
            }

            if (
                (this.world.keyboard.SPACE || this.world.keyboard.UP) &&
                !this.isAboveGround()
            ) {
                this.jump();
                AudioHub.play(AudioHub.JUMP, 0.3);
            }

            this.world.camera_x = -this.x + 100;

            if (moving) {
                this.lastMove = new Date().getTime();
            }

        }, 1000 / 60);

        /**
         * Handles animation state (walk, jump, idle/sleep).
         */
        setInterval(() => {

            if (!this.world || this.world.state !== "running") return;

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