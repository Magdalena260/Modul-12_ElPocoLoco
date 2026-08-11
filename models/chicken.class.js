/**
 * Represents a normal chicken enemy.
 * The chicken starts moving before entering
 * the visible game area.
 */
class Chicken extends MovableObject {

    offset = {
        top: 5,
        left: 10,
        right: 10,
        bottom: 5
    };

    y = 340;
    height = 90;
    width = 85;
    speed = 0.8;

    dead = false;
    removeFromWorld = false;

    activated = false;
    activationX = 900;

    minX = 100;
    maxX = 2200;

    movementInterval;
    animationInterval;

    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Creates a normal chicken enemy.
     */
    constructor() {
        super();

        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 400 + Math.random() * 1200;

        this.animate();
    }

    /**
     * Starts movement and walking animation.
     *
     * @returns {void}
     */
    animate() {
        this.startMovement();
        this.startAnimation();
    }

    /**
     * Starts chicken movement.
     *
     * @returns {void}
     */
    startMovement() {
        this.movementInterval = setSafeInterval(() => {
            if (!this.canMove()) return;

            const distance = Math.abs(
                this.world.character.x - this.x
            );

            if (distance < this.activationX) {
                this.activated = true;
            }

            if (!this.activated) return;

            this.moveInsideLevel();
        }, 1000 / 60);
    }

    /**
     * Moves the chicken inside its allowed area.
     *
     * @returns {void}
     */
    moveInsideLevel() {
        if (this.x <= this.minX) {
            this.otherDirection = true;
        }

        if (this.x >= this.maxX) {
            this.otherDirection = false;
        }

        if (this.otherDirection) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
    }

    /**
     * Checks whether the chicken may move.
     *
     * @returns {boolean}
     */
    canMove() {
        return (
            this.world &&
            this.world.character &&
            this.world.state === 'running' &&
            !this.dead
        );
    }

    /**
     * Starts the walking animation.
     *
     * @returns {void}
     */
    startAnimation() {
        this.animationInterval = setSafeInterval(() => {
            if (!this.world || this.world.state !== 'running') {
                return;
            }

            if (this.dead) {
                this.loadImage(this.IMAGES_DEAD[0]);
                return;
            }

            this.playAnimation(this.IMAGES_WALKING);
        }, 180);
    }

    /**
     * Kills the chicken and removes it shortly afterwards.
     *
     * @returns {void}
     */
    die() {
        if (this.dead) return;

        this.dead = true;
        this.speed = 0;

        this.loadImage(this.IMAGES_DEAD[0]);

        this.stopIntervals();

        setTimeout(() => {
            this.removeFromWorld = true;
        }, 400);
    }

    /**
     * Stops active chicken intervals.
     *
     * @returns {void}
     */
    stopIntervals() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }
}