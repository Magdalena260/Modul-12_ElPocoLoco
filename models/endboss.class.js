class Endboss extends MovableObject {

    height = 300;
    width = 250;
    y = 50;
    energy = 100;

    images_alert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png'
    ];

    constructor() {
        super();
        this.loadImages(this.images_alert);   // 👈 WICHTIG
        this.x = 2200;
        this.loadImage(this.images_alert[0]);

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.images_alert);
        }, 200);
    }

    playAnimation(images) {
        this.currentImage++;
        if (this.currentImage >= images.length) {
            this.currentImage = 0;
        }
        let path = images[this.currentImage];
        this.img = this.imageCache[path];
    }
}