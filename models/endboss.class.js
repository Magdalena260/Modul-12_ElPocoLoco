<<<<<<< HEAD
class Endboss extends MovableObject {

    height = 300;
    width = 250;
    y = 50;
    energy = 100;

    images_alert = [
=======
/**
 * Represents the final boss enemy of the game.
 * FIXED: no escaping level, stable AI, proper collision blocking
 */
class Endboss extends MovableObject {

    height = 320;
    width = 270;
    y = 120;

    energy = 100;
    dead = false;

    speed = 5.0;

    activated = false;

    state = 'alert';
    stateLock = false;

    movementInterval;
    animationInterval;

    minX = 1600;

    offset = {
        top: 80,
        left: 40,
        right: 40,
        bottom: 20
    };

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
>>>>>>> aa281ad (Update)
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png'
    ];

<<<<<<< HEAD
=======
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png'
    ];

>>>>>>> aa281ad (Update)
    constructor() {
        super();

        this.loadImages(this.images_alert);

<<<<<<< HEAD
        // 🔥 FIX 1: nicht zu weit raus
        this.x = 1600;
=======
        this.x = 2200;
>>>>>>> aa281ad (Update)

        // 🔥 FIX 2: sicher Startbild setzen
        this.img = new Image();
        this.img.src = this.images_alert[0];

        this.animate();
    }

<<<<<<< HEAD
    animate() {
        setInterval(() => {
            this.playAnimation(this.images_alert);
        }, 200);
    }

    playAnimation(images) {

        // 🔥 FIX 3: Safety Check
        if (!this.imageCache || Object.keys(this.imageCache).length === 0) return;

        this.currentImage++;

        if (this.currentImage >= images.length) {
            this.currentImage = 0;
        }

        let path = images[this.currentImage];

        // 🔥 FIX 4: nur setzen wenn existiert
        if (this.imageCache[path]) {
            this.img = this.imageCache[path];
        }
    }
=======
    hit() {

        if (this.dead) return;

        this.energy -= 20;
        if (this.energy < 0) this.energy = 0;

        this.state = 'hurt';
        this.stateLock = true;
        this.currentImage = 0;

        setTimeout(() => {
            if (!this.dead) {
                this.state = 'walk';
                this.stateLock = false;
                this.currentImage = 0;
            }
        }, 500);

        if (this.energy === 0) {
            this.die();
        }
    }

    die() {

        if (this.dead) return;

        this.dead = true;
        this.speed = 0;
        this.state = 'dead';

        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);

        this.currentImage = 0;
    }

    isDead() {
        return this.dead;
    }

    animate() {

        this.movementInterval = setInterval(() => {

            if (!this.world || this.dead) return;
            if (this.world.state !== "running") return;

            let player = this.world.character;
            if (!player) return;

            let distance = Math.abs(player.x - this.x);

            if (distance < 500) {
                this.activated = true;
            }

            if (!this.activated) return;

            // =========================
            // 🔥 FIX 1: Boss darf Spieler NICHT durchlassen
            // =========================
            if (this.isColliding(player)) {

                if (player.x < this.x) {
                    player.x = this.x - player.width - 5;
                } else {
                    player.x = this.x + this.width + 5;
                }
            }

            // =========================
            // FIX 2: Boss movement clamp
            // =========================
            if (this.x > this.minX) {
                this.moveLeft();
            }

            this.otherDirection = player.x > this.x;

            if (distance < 120 && !this.stateLock && !this.dead) {

                this.state = 'attack';
                this.stateLock = true;
                this.currentImage = 0;

                setTimeout(() => {
                    if (!this.dead) {
                        this.state = 'walk';
                        this.stateLock = false;
                        this.currentImage = 0;
                    }
                }, 700);

            } else if (!this.stateLock) {
                this.state = 'walk';
            }

        }, 1000 / 60);

        this.animationInterval = setInterval(() => {

            if (this.dead) {
                this.playAnimation(this.IMAGES_DEAD);
                return;
            }

            if (this.state === 'hurt') {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.state === 'attack') {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.state === 'walk') {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }

        }, 150);
    }

    stopIntervals() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }
>>>>>>> aa281ad (Update)
}