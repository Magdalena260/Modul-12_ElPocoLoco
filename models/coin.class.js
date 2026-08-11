/**
 * Represents a collectible coin.
 */
class Coin extends MovableObject {

    /**
     * Coin animation images.
     * @type {string[]}
     */
    IMAGES = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png'
    ];

    /**
     * Collision offset.
     * Smaller hitbox = fairer pickup.
     *
     * Marco feedback:
     * Pepe collected coins too early.
     *
     * @type {{
     * top:number,
     * left:number,
     * right:number,
     * bottom:number
     * }}
     */
    offset = {
        top: 35,
        left: 35,
        right: 35,
        bottom: 35
    };

    /**
     * Animation interval id.
     * @type {number}
     */
    animationInterval;

    /**
     * Creates a collectible coin.
     *
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        super();

        this.x = x;
        this.y = y;

        this.width = 120;
        this.height = 120;

        this.loadImages(this.IMAGES);
        this.loadImage(this.IMAGES[0]);

        this.animate();
    }

    /**
     * Starts coin animation.
     *
     * @returns {void}
     */
    animate() {

        this.animationInterval = setSafeInterval(() => {

            if (!this.world || this.world.state !== "running") {
                return;
            }

            this.playAnimation(this.IMAGES);

        }, 200);
    }

    /**
     * Stops all active intervals.
     *
     * @returns {void}
     */
    stopIntervals() {

        clearInterval(this.animationInterval);
    }
}