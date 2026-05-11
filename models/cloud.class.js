/**
 * Represents a moving cloud in the background.
 * Creates a parallax effect by continuously moving left.
 */
class Cloud extends MovableObject {

    /** @type {number} vertical position of the cloud */
    y = 20;

    /** @type {number} width of the cloud image */
    width = 500;

    /** @type {number} height of the cloud image */
    height = 250;

    /** @type {number} horizontal movement speed */
    speed = 0.12;

    /**
     * Creates a Cloud instance with random starting position.
     */
    constructor() {
        super();

        this.loadImage(
            'img/5_background/layers/4_clouds/1.png'
        );

        // Cloud starts at a random visible position
        this.x = Math.random() * 712 * 2;

        this.animate();
    }

    /**
     * Moves the cloud continuously to the left.
     * Resets position when it moves off screen.
     */
    animate() {

        setInterval(() => {

            this.moveLeft();

            // reset position when cloud leaves screen
            if (this.x < -500) {
                this.x = 712 * 3;
            }

        }, 1000 / 60);
    }
}