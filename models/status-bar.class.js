/**
 * StatusBar
 * Displays a visual status indicator (health, coins, bottles, boss health).
 * Changes image based on percentage value.
 */
class StatusBar extends DrawableObject {

    /** @type {number} Current percentage value (0–100) */
    percentage = 100;

    /**
     * Creates a status bar
     * @param {string[]} images - Array of image paths representing states
     * @param {number} x - X position on canvas
     * @param {number} y - Y position on canvas
     */
    constructor(images, x, y) {
        super();

        /** Image set for different percentage states */
        this.images = images;

        /** Preload all status bar images */
        this.loadImages(images);

        /** Position */
        this.x = x;
        this.y = y;

        /** Size of status bar */
        this.width = 200;
        this.height = 60;

        /** Initialize full status */
        this.setPercentage(100);
    }

    /**
     * Updates the status bar percentage and visual state
     * @param {number} p - New percentage value (0–100)
     */
    setPercentage(p) {
        this.percentage = p;

        let path = this.images[this.resolve()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves which image index should be shown
     * based on current percentage
     * @returns {number} image index
     */
    resolve() {
        if (this.percentage >= 100) return 5;
        if (this.percentage > 80) return 4;
        if (this.percentage > 60) return 3;
        if (this.percentage > 40) return 2;
        if (this.percentage > 20) return 1;
        return 0;
    }
}