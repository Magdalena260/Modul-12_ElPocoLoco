/**
 * Represents a collectible coin in the game.
 * Extends MovableObject and handles animation.
 */
class Coin extends MovableObject {

    /** @type {string[]} animation frames for the coin */
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    /**
     * Creates a Coin at a specific position.
     * @param {number} x - x position of the coin
     * @param {number} y - y position of the coin
     */
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

    /**
     * Starts coin animation loop.
     * Cycles through animation frames.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200);
    }
}