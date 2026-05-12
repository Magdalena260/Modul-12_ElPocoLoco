class Endboss extends MovableObject {

    height = 320;
    width = 270;
    y = 120;

    energy = 100;
    dead = false;

    speed = 1.5;
    activated = false;

    state = 'alert';
    stateLock = false;

    world = null;

    roarSound = null;

    offset = {
        top: 80,
        left: 50,
        right: 50,
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

        if (this.energy <= 0) {
            this.energy = 0;
            this.die();
            return;
        }

        this.state = 'hurt';
        this.stateLock = true;

        setTimeout(() => this.stateLock = false, 500);
    }

    die() {
        if (this.dead) return;

        this.dead = true;
        this.speed = 0;
        this.state = 'dead';

        if (this.roarSound) {
            this.roarSound.pause();
            this.roarSound.currentTime = 0;
        }
    }

    animate() {

        setInterval(() => {

            if (!this.world || this.world.state !== "running") return;
            if (this.dead) return;

            let player = this.world.character;
            let dist = Math.abs(player.x - this.x);

            if (dist < 600 && !this.activated) {
                this.activated = true;

                this.roarSound = AudioHub.BOSS_HIT.cloneNode();
                this.roarSound.volume = 0.5;
                this.roarSound.loop = true;
                this.roarSound.play();
            }

            if (!this.activated) return;

            if (this.stateLock) return;

            if (dist < 120) {
                this.state = 'attack';
            } else {
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

        setInterval(() => {

            if (!this.world || this.world.state !== "running") return;

            if (this.dead) this.playAnimation(this.IMAGES_DEAD);
            else if (this.state === 'hurt') this.playAnimation(this.IMAGES_HURT);
            else if (this.state === 'attack') this.playAnimation(this.IMAGES_ATTACK);
            else if (this.state === 'walk') this.playAnimation(this.IMAGES_WALKING);
            else this.playAnimation(this.IMAGES_ALERT);

        }, 140);
    }
}