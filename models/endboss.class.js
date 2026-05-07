class Endboss extends MovableObject {

    height = 300;
    width = 250;
    y = 50;

    energy = 100;
    dead = false;
    removeFromWorld = false;

    speed = 1.5;

    lastAttack = 0;
    attackCooldown = 1500;

    activated = false;

    state = 'alert';
    stateLock = false;

    currentImage = 0;

    movementInterval;
    animationInterval;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png'
    ];

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

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

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

    die() {
        if (this.dead) return;

        this.dead = true;
        this.speed = 0;
        this.stateLock = true;
        this.currentImage = 0;
    }

    isDead() {
        return this.dead;
    }

    animate() {

        this.movementInterval = setInterval(() => {

            // ✅ FIX: STOP wenn Spiel vorbei ist
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

            // ✅ FIX: STOP wenn Spiel vorbei ist
            if (!this.world || this.world.state !== "running") return;

            if (this.dead) {

                let i = this.currentImage % this.IMAGES_DEAD.length;
                let path = this.IMAGES_DEAD[i];

                this.img = this.imageCache[path] || new Image();

                if (!this.imageCache[path]) {
                    this.img.src = path;
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