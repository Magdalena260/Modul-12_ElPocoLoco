class Endboss extends MovableObject {

    height = 320;
    width = 270;
    y = 120;

    energy = 100;
    dead = false;

    speed = 2.6;

    activated = false;
    state = 'alert';
    stateLock = false;

    movementInterval;
    animationInterval;

    minX = 1500; // FIX: linke Weltgrenze
    maxX = 2400; // FIX: rechte Weltgrenze

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
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png'
    ];

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

    hit() {

        if (this.dead) return;

        this.energy -= 20;
        if (this.energy < 0) this.energy = 0;

        this.state = 'hurt';
        this.stateLock = true;

        setTimeout(() => {
            if (!this.dead) {
                this.state = 'walk';
                this.stateLock = false;
            }
        }, 400);

        if (this.energy === 0) this.die();
    }

    die() {

        if (this.dead) return;

        this.dead = true;
        this.speed = 0;
        this.state = 'dead';

        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }

    animate() {

        this.movementInterval = setSafeInterval(() => {

            if (!this.world || this.dead || this.world.state !== "running") return;

            let player = this.world.character;
            let distance = Math.abs(player.x - this.x);

            if (distance < 650) this.activated = true;
            if (!this.activated) return;

            // FIX 1: kein Hard-Knockback mehr (war dein biggest bug)
            if (distance < 110) {
                this.state = 'attack';
            }

            if (distance >= 110 && !this.stateLock) {
                this.state = 'walk';
                this.moveLeft();
            }

            // FIX 2: Endboss bleibt IM Level
            if (this.x < this.minX) {
                this.x = this.minX;
            }

        }, 1000 / 60);

        this.animationInterval = setSafeInterval(() => {

            if (this.dead) {
                this.playAnimation(this.IMAGES_DEAD);
                return;
            }

            if (this.state === 'hurt') {
                this.playAnimation(this.IMAGES_HURT);
            }
            else if (this.state === 'attack') {
                this.playAnimation(this.IMAGES_ATTACK);
            }
            else if (this.state === 'walk') {
                this.playAnimation(this.IMAGES_WALKING);
            }
            else {
                this.playAnimation(this.IMAGES_ALERT);
            }

        }, 150);
    }

    stopIntervals() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }
}