<<<<<<< HEAD
class Chicken extends MovableObject {

    y = 340;
    height = 77;
    width = 70;
    speed = 0.8;
=======
/**
 * Normal chicken enemy.
 * Walks toward player once activated.
 * Can be killed by stomp or bottle hit.
 */
class Chicken extends MovableObject {

    /**
     * Collision offset.
     * Tuned for fair bottle hits.
     *
     * @type {{
     * top:number,
     * left:number,
     * right:number,
     * bottom:number
     * }}
     */
    offset = {
        top: 5,
        left: 10,
        right: 10,
        bottom: 5
    };
>>>>>>> aa281ad (Update)

    /** @type {number} */
    y = 340;

    /** @type {number} */
    height = 90;

    /** @type {number} */
    width = 85;

    /** @type {number} */
    speed = 1.0;

    /** @type {boolean} */
    dead = false;
<<<<<<< HEAD
=======

    /** @type {boolean} */
    removeFromWorld = false;

    /** @type {boolean} */
    activated = false;

    /** @type {number} */
    activationX = 700;

    /** @type {number} */
    movementInterval;

    /** @type {number} */
    animationInterval;
>>>>>>> aa281ad (Update)

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Creates a chicken enemy.
     */
    constructor() {
        super();

        this.loadImage(this.IMAGES_WALKING[0]);

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 400 + Math.random() * 1200;

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

<<<<<<< HEAD
            if (!this.dead) {
=======
            if (this.dead || !this.world?.character) return;

            let dist = Math.abs(
                this.world.character.x - this.x
            );

            if (dist < this.activationX) {
                this.activated = true;
            }

            if (this.activated) {
>>>>>>> aa281ad (Update)
                this.moveLeft();
            }

        }, 1000 / 60);

        this.animationInterval = setInterval(() => {

            if (this.dead) {
<<<<<<< HEAD
                this.loadImage(this.IMAGES_DEAD[0]);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
=======

                this.loadImage(this.IMAGES_DEAD[0]);

                return;
>>>>>>> aa281ad (Update)
            }

            this.playAnimation(this.IMAGES_WALKING);

        }, 180);
    }

<<<<<<< HEAD
=======
    /**
     * Kills the chicken.
     *
     * @returns {void}
     */
>>>>>>> aa281ad (Update)
    die() {

    this.dead = true;

<<<<<<< HEAD
    this.speed = 0;
=======
        this.dead = true;

        this.speed = 0;
>>>>>>> aa281ad (Update)

    this.img = new Image();
    this.img.src =
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
}

<<<<<<< HEAD
   
=======
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);

        setTimeout(() => {

            this.removeFromWorld = true;

        }, 400);
    }

    /**
     * Stops all active intervals.
     *
     * @returns {void}
     */
    stopIntervals() {

        clearInterval(this.movementInterval);

        clearInterval(this.animationInterval);
    }
>>>>>>> aa281ad (Update)
}