/**
 * Represents a small chicken enemy in the game.
 * Extends MovableObject and handles movement, activation range,
 * animation states, and death behavior.
 */
class SmallChicken extends MovableObject {

    /** @type {number} vertical position */
    y = 370;

    /** @type {number} height of the chicken */
    height = 40;

    /** @type {number} width of the chicken */
    width = 35;

    /** @type {number} movement speed */
    speed = 1.6;

    /** @type {boolean} indicates whether chicken is dead */
    dead = false;

    /** @type {boolean} flag for removal from world */
    removeFromWorld = false;

    /** @type {boolean} becomes true when player is close enough */
    activated = false;

    /** @type {number} activation distance for player detection */
    activationX = 800;

    /** @type {string[]} walking animation frames */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    /** @type {string[]} death animation frames */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Creates a SmallChicken instance and initializes animations.
     */
    constructor() {
        super();

        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 400 + Math.random() * 800;

        this.animate();
    }

    /**
     * Handles movement and animation loops.
     * - Activates when player is close enough
     * - Moves left when activated
     * - Switches between walking and dead animation
     */
    animate() {

        setInterval(() => {

            if (this.dead) return;

            if (!this.activated && this.world?.character) {
                let distance = Math.abs(this.world.character.x - this.x);

                if (distance < this.activationX) {
                    this.activated = true;
                }
            }

            if (this.activated) {
                this.moveLeft();
            }

        }, 1000 / 60);

        setInterval(() => {

            if (this.dead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }

        }, 200);
    }

    /**
     * Kills the chicken and triggers removal after a delay.
     */
    die() {

        if (this.dead) return;

        this.dead = true;
        this.speed = 0;

        this.loadImage(this.IMAGES_DEAD[0]);

        setTimeout(() => {
            this.removeFromWorld = true;
        }, 400);
    }
}