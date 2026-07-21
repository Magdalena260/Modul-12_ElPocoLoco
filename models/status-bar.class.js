/**
 * Displays visual status information.
 * Used for health, coins, bottles
 * and endboss energy bars.
 */
class StatusBar extends DrawableObject {

    /** @type {number} */
    percentage = 100;

    /**
     * Creates a status bar.
     */
    constructor(images, x, y) {
        super();

        this.images = images;
        this.loadImages(images);

        this.x = x;
        this.y = y;

        this.width = 200;
        this.height = 60;

        /**
         * FIX: sofort korrektes Startbild setzen
         */
        this.setPercentage(100);
    }

    /**
     * Updates displayed percentage.
     * @param {number} p
     */
    setPercentage(p) {
        this.percentage = Math.max(0, Math.min(100, p));

        const path = this.images[this.resolve()];

        if (this.imageCache && this.imageCache[path]) {
            this.img = this.imageCache[path];
        }
    }

    /**
     * SMOOTH FIX:
     * keine 20%-Sprünge mehr, sondern echte Abstufung
     */
    resolve() {
        const index = Math.round(
            (this.percentage / 100) * (this.images.length - 1)
        );

        return Math.max(0, Math.min(this.images.length - 1, index));
    }
}