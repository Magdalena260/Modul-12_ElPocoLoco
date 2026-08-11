/**
 * Represents a small chicken enemy.
 * The chicken starts moving before entering
 * the visible game area.
 */
class SmallChicken extends MovableObject {

    offset = {
        top: 2,
        left: 8,
        right: 8,
        bottom: 4
    };

    y = 370;
    width = 70;
    height = 75;
    speed = 1.4;

    dead = false;
    removeFromWorld = false;

    activated = false;
    activationX = 1000;

    movementInterval;
    animationInterval;

    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Creates a small chicken enemy.
     */
    constructor() {
        super();

        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 500 + Math.random() * 1400;

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

            if (this.activated) {
                this.moveLeft();
            }

        }, 1000 / 60);
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
        }, 300);
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