<<<<<<< HEAD
class BackgroundObject extends MovableObject {

=======
/**
 * Represents a background layer object in the game.
 * Used for parallax scrolling scenery.
 */
class BackgroundObject extends MovableObject {

    /**
     * Creates a background object.
     *
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - X position of the background layer.
     */
>>>>>>> aa281ad (Update)
    constructor(imagePath, x) {

        super();

        this.loadImage(imagePath);

        this.x = x;
        this.y = 0;

        this.width = 720;
        this.height = 480;

        /**
         * Background should NOT move via physics.
         * Prevents accidental gravity/movement bugs.
         */
        this.speed = 0;
        this.speedY = 0;
    }
}