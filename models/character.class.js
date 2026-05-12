class Character extends MovableObject {

    height = 280;
    width = 150;
    y = 120;
    speed = 6;

    world;
    energy = 100;

    lastHit = 0;
    hitCooldown = 1000;

    lastMove = new Date().getTime();

    movementInterval;
    animationInterval;

    offset = {
        top: 110,
        left: 35,
        right: 35,
        bottom: 10
    };

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

    IMAGES_SLEEP = [
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

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
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

    constructor() {
        super();

        this.loadImage(this.IMAGES_IDLE[0]);

        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.applyGravity();
        this.animate();
    }

    hit() {
        let now = new Date().getTime();

        if (now - this.lastHit < this.hitCooldown) return;

        this.lastHit = now;
        this.energy -= 20;

        if (this.energy < 0) this.energy = 0;
    }

    isDead() {
        return this.energy <= 0;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 500;
    }

    stopAll() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }

    animate() {

        this.movementInterval = setInterval(() => {

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

            if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAboveGround()) {
                this.jump();
                AudioHub.play(AudioHub.JUMP, 0.3);
            }

            this.world.camera_x = -this.x + 100;

            if (moving) {
                this.lastMove = new Date().getTime();
            }

        }, 1000 / 60);

        this.animationInterval = setInterval(() => {

            if (!this.world || this.world.state !== "running") return;

            let time = new Date().getTime() - this.lastMove;

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                return;
            }

            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                return;
            }

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

            this.playAnimation(this.IMAGES_IDLE);

        }, 120);
    }
}