class Coin extends MovableObject {

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
       
    ];

    constructor(x, y) {
        super();

        this.x = x;
        this.y = y - 60;

        this.width = 150;
        this.height = 150;

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