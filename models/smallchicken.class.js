<<<<<<< HEAD
class SmallChicken extends MovableObject {

    y = 370;
    height = 50;
    width = 45;

    speed = 1.6;

    dead = false;
    activated = false;

    offset = {
        top: 10,
        bottom: 5,
        left: 8,
        right: 8
    };

<<<<<<< HEAD
        offset = {
        top: 10,
        bottom: 5,
        left: 8,
        right: 8
    };


    /** @type {string[]} walking animation frames */
=======
>>>>>>> a27fffe5520d1e3eed5eb2ac0b812048325cdce3
=======
/**
 * Small fast chicken enemy.
 * Uses smaller hitbox for fair gameplay.
 */
class SmallChicken extends MovableObject {

    /**
     * Collision offset.
     * Tuned for accurate bottle hits.
     *
     * @type {{
     * top:number,
     * left:number,
     * right:number,
     * bottom:number
     * }}
     */
    offset = {
        top: 2,
        left: 8,
        right: 8,
        bottom: 4
    };

    /** @type {number} */
    y = 370;

    /** @type {number} */
    width = 70;

    /** @type {number} */
    height = 75;

    /** @type {number} */
    speed = 0.9;

    /** @type {boolean} */
    dead = false;

    /** @type {boolean} */
    removeFromWorld = false;

    /** @type {number} */
    activationX = 600;

    /** @type {boolean} */
    activated = false;

    /** @type {number} */
    movementInterval;

    /** @type {number} */
    animationInterval;

>>>>>>> aa281ad (Update)
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

<<<<<<< HEAD
    constructor() {
        super();

=======
    /**
     * Creates a small chicken enemy.
     */
    constructor() {
        super();

        this.loadImage(this.IMAGES_WALKING[0]);

>>>>>>> aa281ad (Update)
        this.loadImages(this.IMAGES_WALKING);

        this.loadImages(this.IMAGES_DEAD);

        this.x = 500 + Math.random() * 1400;

        this.animate();
    }

<<<<<<< HEAD
=======
    /**
     * Starts movement and animation loops.
     *
     * @returns {void}
     */
>>>>>>> aa281ad (Update)
    animate() {

        this.movementInterval = setInterval(() => {

            if (this.dead || !this.world?.character) return;

<<<<<<< HEAD
            if (!this.activated && this.world?.character) {
                let dist = Math.abs(this.world.character.x - this.x);
                if (dist < 800) this.activated = true;
=======
            let dist = Math.abs(
                this.world.character.x - this.x
            );

            if (dist < this.activationX) {
                this.activated = true;
>>>>>>> aa281ad (Update)
            }

            if (this.activated) this.moveLeft();

        }, 1000 / 60);

        this.animationInterval = setInterval(() => {

            if (this.dead) {

                this.loadImage(this.IMAGES_DEAD[0]);

            } else {

                this.playAnimation(this.IMAGES_WALKING);
            }

        }, 180);
    }

<<<<<<< HEAD
=======
    /**
     * Kills the small chicken.
     *
     * @returns {void}
     */
>>>>>>> aa281ad (Update)
    die() {

        if (this.dead) return;

        this.dead = true;

        this.speed = 0;
        this.remove = true;

<<<<<<< HEAD
        AudioHub.play(AudioHub.CHICKEN_DEATH, 0.1);
=======
        this.loadImage(this.IMAGES_DEAD[0]);

        clearInterval(this.movementInterval);

        clearInterval(this.animationInterval);

        setTimeout(() => {

            this.removeFromWorld = true;

        }, 300);
    }

    /**
     * Stops all active intervals.
     *
     * @returns {void}
     */
    stopIntervals() {

        clearInterval(this.movementInterval);

        clearInterval(this.animationInterval);
>>>>>>> aa281ad (Update)
    }
}