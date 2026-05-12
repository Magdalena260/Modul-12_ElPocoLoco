class Coin extends MovableObject {

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
        'img/8_coin/coin_3.png'
    ];

    constructor(x, y) {
        super();

        this.x = x;
        this.y = y - 40;

        this.width = 200;
        this.height = 200;

        this.loadImages(this.IMAGES);
        this.currentImage = 0;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200);
    }
}