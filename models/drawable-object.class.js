/**
 * Base class for all drawable objects in the game.
 * Handles image loading, caching, and rendering to canvas.
 */
class DrawableObject {

    /** @type {HTMLImageElement} current image */
    img;

    /** @type {Object.<string, HTMLImageElement>} cache of loaded images */
    imageCache = {};

    /** @type {number} current animation frame index */
    currentImage = 0;

    /** @type {number} x position on canvas */
    x = 0;

    /** @type {number} y position on canvas */
    y = 0;

    /** @type {number} width of the object */
    width = 100;

    /** @type {number} height of the object */
    height = 100;

    /**
     * Loads a single image.
     * @param {string} path - path to image file
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images into the image cache.
     * @param {string[]} arr - array of image paths
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - canvas rendering context
     */
    draw(ctx) {

        if (!this.img) return;

        ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}