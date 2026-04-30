class Endboss extends MovableObject {

    height = 300;
    width = 250;
    y = 50;

    energy = 100;
    dead = false;

    speed = 1.5;

    lastAttack = 0;
    attackCooldown = 1500;

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

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png'
    ];

    constructor() {
        super();

        this.loadImage(this.IMAGES_ALERT[0]);

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 1600;

        this.animate();
    }

    animate() {

        // 👉 BEWEGUNG
        setInterval(() => {

            if (this.dead) return;
            if (!this.world) return;

            let player = this.world.character;

            let distance = Math.abs(player.x - this.x);

            // 👀 Erst reagieren wenn Spieler nah ist
            if (distance < 600) {

                if (player.x < this.x) {
                    this.x -= this.speed;
                    this.otherDirection = true;
                } else {
                    this.x += this.speed;
                    this.otherDirection = false;
                }
            }

        }, 1000 / 60);

        // 🎬 ANIMATION
        setInterval(() => {

            if (this.dead) {
                this.loadImage(this.IMAGES_DEAD[0]);
                return;
            }

            let player = this.world?.character;

            if (!player) return;

            let distance = Math.abs(player.x - this.x);

            if (distance < 200) {
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }

        }, 200);
    }

    hit() {
        if (this.dead) return;

        this.energy -= 20;

        if (this.energy <= 0) {
            this.energy = 0;
            this.dead = true;
            this.speed = 0;
        }
    }

    isDead() {
        return this.dead;
    }
}