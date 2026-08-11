/**
 * Represents the endboss enemy.
 * The endboss follows Pepe and attacks him at close range.
 */
class Endboss extends MovableObject {

    height = 320;
    width = 270;
    y = 120;

    energy = 100;
    dead = false;

    speed = 4.2;

    activated = false;
    state = 'alert';
    stateLock = false;

    movementInterval;
    animationInterval;

    attackDistance = 110;
    activationDistance = 700;

    offset = {
        top: 80,
        left: 40,
        right: 40,
        bottom: 20
    };

    IMAGES_WALKING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Creates the endboss and starts its behaviour.
     */
    constructor() {
        super();

        this.loadImage(this.IMAGES_ALERT[0]);

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 2200;

        this.animate();
    }

    /**
     * Applies damage to the endboss.
     *
     * @returns {void}
     */
    hit() {
        if (this.dead) return;

        this.energy = Math.max(0, this.energy - 20);

        this.state = 'hurt';
        this.stateLock = true;

        this.unlockStateAfterHit();

        if (this.energy === 0) {
            this.die();
        }
    }

    /**
     * Unlocks the boss after the hurt animation.
     *
     * @returns {void}
     */
    unlockStateAfterHit() {
        setTimeout(() => {
            if (this.dead) return;

            this.stateLock = false;
            this.state = 'alert';
        }, 400);
    }

    /**
     * Stops movement and allows the death animation to finish.
     *
     * @returns {void}
     */
    die() {
        if (this.dead) return;

        this.dead = true;
        this.speed = 0;
        this.state = 'dead';
        this.currentImage = 0;

        clearInterval(this.movementInterval);

        setTimeout(() => {
            clearInterval(this.animationInterval);
        }, 900);
    }

    /**
     * Starts movement and animation loops.
     *
     * @returns {void}
     */
    animate() {
        this.startMovement();
        this.startAnimation();
    }

    /**
     * Starts the boss movement loop.
     *
     * @returns {void}
     */
    startMovement() {
        this.movementInterval = setSafeInterval(() => {
            if (!this.canAct()) return;

            this.updateActivation();

            if (!this.activated || this.stateLock) return;

            this.updateMovement();
        }, 1000 / 60);
    }

    /**
     * Checks whether the boss can currently act.
     *
     * @returns {boolean}
     */
    canAct() {
        return (
            this.world &&
            !this.dead &&
            this.world.state === 'running'
        );
    }

    /**
     * Activates the boss when Pepe gets close enough.
     *
     * @returns {void}
     */
    updateActivation() {
        const distance = this.getDistanceToPlayer();

        if (distance < this.activationDistance) {
            this.activated = true;
        }
    }

    /**
     * Updates movement and animation state.
     *
     * The boss keeps moving even while attacking.
     *
     * @returns {void}
     */
    updateMovement() {
        const distance = this.getDistanceToPlayer();

        this.followPlayer();

        if (distance <= this.attackDistance) {
            this.state = 'attack';
        } else {
            this.state = 'walk';
        }
    }

    /**
     * Moves the boss towards Pepe.
     *
     * @returns {void}
     */
    followPlayer() {
        const playerCenter =
            this.world.character.x +
            this.world.character.width / 2;

        const bossCenter =
            this.x +
            this.width / 2;

        if (playerCenter < bossCenter) {
            this.moveTowardsLeft();
        } else {
            this.moveTowardsRight();
        }
    }

    /**
     * Moves the boss to the left.
     *
     * @returns {void}
     */
    moveTowardsLeft() {
        this.otherDirection = false;
        this.moveLeft();
    }

    /**
     * Moves the boss to the right.
     *
     * @returns {void}
     */
    moveTowardsRight() {
        this.otherDirection = true;
        this.moveRight();
    }

    /**
     * Returns the horizontal distance to Pepe.
     *
     * @returns {number}
     */
    getDistanceToPlayer() {
        return Math.abs(
            this.world.character.x - this.x
        );
    }

    /**
     * Starts the boss animation loop.
     *
     * @returns {void}
     */
    startAnimation() {
        this.animationInterval = setSafeInterval(() => {
            this.playCurrentStateAnimation();
        }, 150);
    }

    /**
     * Plays the animation for the current boss state.
     *
     * @returns {void}
     */
    playCurrentStateAnimation() {
        if (this.dead) {
            this.playAnimation(this.IMAGES_DEAD);
            return;
        }

        if (this.state === 'hurt') {
            this.playAnimation(this.IMAGES_HURT);
            return;
        }

        if (this.state === 'attack') {
            this.playAnimation(this.IMAGES_ATTACK);
            return;
        }

        if (this.state === 'walk') {
            this.playAnimation(this.IMAGES_WALKING);
            return;
        }

        this.playAnimation(this.IMAGES_ALERT);
    }

    /**
     * Stops all active boss intervals.
     *
     * @returns {void}
     */
    stopIntervals() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }
}