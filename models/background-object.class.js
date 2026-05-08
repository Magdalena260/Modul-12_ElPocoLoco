/**
 * Represents a background layer object in the game.
 * Used to create parallax scrolling scenery.
 * Extends MovableObject.
 */
class BackgroundObject extends MovableObject {

    /**
     * Creates a background object.
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - X position of the background layer.
     */
    constructor(imagePath, x) {
        super();

        this.loadImage(imagePath);

        this.x = x;
        this.y = 0;

        this.width = 720;
        this.height = 480;
    }
}