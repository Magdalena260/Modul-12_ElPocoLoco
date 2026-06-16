<<<<<<< HEAD
class Character extends MovableObject {

    height = 300;
    width = 150;

    y = 150;
    x = 0;

    speed = 8;
=======
/**
 * Represents the main player character (Pepe).
 * Handles movement, animation states, physics,
 * sounds and idle/snoring behavior.
 */
class Character extends MovableObject {

    /** @type {number} character height */
    height = 280;

    /** @type {number} character width */
    width = 150;

    /** @type {number} vertical position */
    y = 120;

    /** @type {number} movement speed */
    speed = 6;
>>>>>>> aa281ad (Update)

    /** @type {World} reference to game world */
    world;
<<<<<<< HEAD
    otherDirection = false;

    lastMove = new Date().getTime();
=======

    /** @type {number} timestamp of last movement */
    lastMove = Date.now();

    /** @type {number} movement interval ID */
    movementInterval;

    /** @type {number} animation interval ID */
    animationInterval;

    /** @type {Audio|null} snoring sound instance */
    snoringSound = null;

    /** @type {boolean} whether snoring is active */
    snoringActive = false;

    /** @type {number} idle delay before snoring */
    SNORE_DELAY = 15000;

    /** @type {boolean} jump animation state */
    isJumping = false;

    /** @type {boolean} prevents jump animation replay */
    jumpAnimationPlayed = false;

    /**
     * Collision offsets.
     * Important for fair collisions.
     */
    offset = {
        top: 110,
        left: 35,
        right: 35,
        bottom: 15
    };
>>>>>>> aa281ad (Update)

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
<<<<<<< HEAD
        'img/2_character_pepe/2_walk/W-23.png'
    ];

    constructor() {
        super();

        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
=======
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    constructor() {
        super();

        this.loadImage(this.IMAGES_IDLE[0]);

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
>>>>>>> aa281ad (Update)

        this.applyGravity();

        this.animate();
    }

    animate() {

<<<<<<< HEAD
        setInterval(() => {

            if (!this.world) return;

            if (this.world.keyboard.RIGHT) {
                this.moveRight();
=======
        this.movementInterval = setSafeInterval(() => {

            if (!this.world || this.world.state !== "running") {
                return;
            }

            if (this.isDead()) {
                return;
            }

            let moving = false;

            // RIGHT (FIX: LEVEL END BOUNDARY)
            if (this.world.keyboard.RIGHT) {

                if (this.x < this.world.level.level_end_x - this.width) {
                    this.x += this.speed;
                }

>>>>>>> aa281ad (Update)
                this.otherDirection = false;
                this.lastMove = new Date().getTime();
            }

<<<<<<< HEAD
            if (this.world.keyboard.LEFT) {
                this.moveLeft();
=======
            // LEFT
            if (this.world.keyboard.LEFT) {

                if (this.x > 0) {
                    this.x -= this.speed;
                }

>>>>>>> aa281ad (Update)
                this.otherDirection = true;
                this.lastMove = new Date().getTime();
            }

<<<<<<< HEAD
            if (this.world.keyboard.SPACE) {
                this.jump();
                this.lastMove = new Date().getTime();
            }

        }, 1000 / 60);
=======
            // JUMP
            if (
                (this.world.keyboard.SPACE ||
                    this.world.keyboard.UP) &&
                !this.isAboveGround()
            ) {

                this.jump();

                AudioHub.play(AudioHub.JUMP, 0.3);

                this.isJumping = true;
                this.jumpAnimationPlayed = false;
                this.currentImage = 0;

                moving = true;
            }

            // LANDING RESET
            if (
                !this.isAboveGround() &&
                this.isJumping
            ) {
                this.isJumping = false;
                this.jumpAnimationPlayed = false;
                this.currentImage = 0;
            }

            if (moving) {
                this.lastMove = Date.now();
                this.stopSnoring();
            }

            this.world.camera_x = -this.x + 100;

        }, 1000 / 60);

        this.animationInterval = setSafeInterval(() => {

            if (!this.world || this.world.state !== "running") {
                return;
            }

            if (this.isDead()) {
                this.stopSnoring();
                this.playAnimation(this.IMAGES_DEAD);
                return;
            }

            if (this.isHurt()) {
                this.stopSnoring();
                this.playAnimation(this.IMAGES_HURT);
                return;
            }

            if (this.isAboveGround() || this.isJumping) {

                this.stopSnoring();

                if (!this.jumpAnimationPlayed) {
                    this.playAnimationOnce(this.IMAGES_JUMPING);

                    if (this.currentImage >= this.IMAGES_JUMPING.length) {
                        this.jumpAnimationPlayed = true;
                    }
                }

                return;
            }

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.stopSnoring();
                this.playAnimation(this.IMAGES_WALKING);
                return;
            }

            let idleTime = Date.now() - this.lastMove;

            if (idleTime > this.SNORE_DELAY) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
                this.startSnoring();
            } else {
                this.playAnimation(this.IMAGES_IDLE);
                this.stopSnoring();
            }

        }, 120);
>>>>>>> aa281ad (Update)
    }

    startSnoring() {

        if (this.snoringActive) return;
        if (AudioHub.isMuted) return;
        if (this.world?.state !== "running") return;

        this.snoringActive = true;

        this.snoringSound = new Audio('./assets/snoring.mp3');
        this.snoringSound.loop = true;
        this.snoringSound.volume = 0.05;
        this.snoringSound.muted = AudioHub.isMuted;

        this.snoringSound.play().catch(() => {});
    }

    stopSnoring() {

        this.snoringActive = false;

        if (this.snoringSound) {
            this.snoringSound.pause();
            this.snoringSound.currentTime = 0;
            this.snoringSound = null;
        }
    }

    stopIntervals() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
        this.stopSnoring();
    }
}