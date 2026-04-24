class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 55;

    IMAGES = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
    ];

    currentImage = 0;

    constructor() {
        super();

        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);

        // 🔥 GANZ WICHTIG: am Ende der Welt
        this.x = 712 * 3 - 300;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200);
    }
}