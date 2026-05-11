/**
 * Represents the Endboss enemy in the game.
 * Handles AI behavior, movement, animations, attacks, and death logic.
 * Extends MovableObject.
 * change needed: stop porking after you win or you lost
 */
class Endboss extends MovableObject {

    /** @type {number} height of the boss */
    height = 320;

    /** @type {number} width of the boss */
    width = 270;

    /** @type {number} vertical position */
    y = 120;

    /** @type {number} current energy (health) */
    energy = 100;

    /** @type {boolean} whether the boss is dead */
    dead = false;

    /** @type {boolean} flag for removal from world */
    removeFromWorld = false;

    /** @type {number} movement speed */
    speed = 1.5;

    /** @type {number} timestamp of last attack */
    lastAttack = 0;

    /** @type {number} cooldown time between attacks (ms) */
    attackCooldown = 1500;

    /** @type {boolean} whether boss has been activated by player proximity */
    activated = false;

    /** @type {string} current animation state (alert, walk, attack, hurt) */
    state = 'alert';

    /** @type {boolean} locks state transitions */
    stateLock = false;

    /** @type {number} current animation frame index */
    currentImage = 0;

    /** @type {number|null} movement interval reference */
    movementInterval;

    /** @type {number|null} animation interval reference */
    animationInterval;

    /** @type {string[]} walking animation frames */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /** @type {string[]} alert animation frames */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png'
    ];

    /** @type {string[]} attack animation frames */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /** @type {string[]} hurt animation frames */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /** @type {string[]} death animation frames */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Creates the Endboss and initializes animations and images.
     */
    constructor() {
        super();

        this.loadImage(this.IMAGES_ALERT[0]);

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 1600;

        this.animate();
    }

    /**
     * Applies damage to the boss and changes state to "hurt".
     * Triggers death if energy reaches zero.
     */
    hit() {
        if (this.dead) return;

        this.energy -= 20;

        this.state = 'hurt';
        this.stateLock = true;

        setTimeout(() => {
            if (!this.dead) {
                this.stateLock = false;
                this.state = 'walk';
            }
        }, 500);

        if (this.energy <= 0) {
            this.energy = 0;
            this.die();
        }
    }

    /**
     * Marks the boss as dead and stops movement.
     */
    die() {
        if (this.dead) return;

        this.dead = true;
        this.speed = 0;
        this.stateLock = true;
        this.currentImage = 0;
    }

    /**
     * Checks whether the boss is dead.
     * @returns {boolean}
     */
    isDead() {
        return this.dead;
    }

    /**
     * Handles AI movement and animation logic.
     * Includes player detection, chasing, attacking, and state switching.
     */
    animate() {

        this.movementInterval = setInterval(() => {

            if (!this.world || this.world.state !== "running") return;
            if (this.dead) return;

            let player = this.world.character;
            let distance = Math.abs(player.x - this.x);

            if (distance < 500) this.activated = true;
            if (!this.activated) return;

            if (distance < 80 && !this.stateLock) {

                this.state = 'attack';
                this.stateLock = true;

                setTimeout(() => {
                    if (!this.dead) {
                        this.stateLock = false;
                        this.state = 'walk';
                    }
                }, 700);

            } else if (!this.stateLock) {
                this.state = 'walk';
            }

            if (player.x < this.x) {
                this.x -= this.speed;
                this.otherDirection = true;
            } else {
                this.x += this.speed;
                this.otherDirection = false;
            }

        }, 1000 / 60);

        this.animationInterval = setInterval(() => {

            if (!this.world || this.world.state !== "running") return;

            if (this.dead) {

                let i = this.currentImage % this.IMAGES_DEAD.length;
                let path = this.IMAGES_DEAD[i];

                this.img = this.imageCache[path] || new Image();

                if (!this.imageCache[path]) {
                    this.imageCache[path].src = path;
                }

                this.currentImage++;
                return;
            }

            if (this.state === 'hurt') this.playAnimation(this.IMAGES_HURT);
            else if (this.state === 'attack') this.playAnimation(this.IMAGES_ATTACK);
            else if (this.state === 'walk') this.playAnimation(this.IMAGES_WALKING);
            else this.playAnimation(this.IMAGES_ALERT);

        }, 150);
    }
}