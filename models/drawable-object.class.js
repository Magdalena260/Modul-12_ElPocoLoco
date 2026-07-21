/**
 * Base class for all drawable objects in the game.
 * Handles image loading, caching and rendering.
 */
class DrawableObject {

    /** @type {HTMLImageElement} */
    img;

    /** @type {Object.<string, HTMLImageElement>} */
    imageCache = {};

    /** @type {number} */
    currentImage = 0;

    /** @type {number} */
    x = 0;

    /** @type {number} */
    y = 0;

    /** @type {number} */
    width = 100;

    /** @type {number} */
    height = 100;

    /** @type {boolean} */
    otherDirection = false;

    /**
     * Loads a single image.
     * @param {string} path
     * @returns {void}
     */
    loadImage(path) {

        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images into cache.
     * @param {string[]} arr
     * @returns {void}
     */
    loadImages(arr) {

        arr.forEach(path => {

            let img = new Image();

            img.src = path;

            this.imageCache[path] = img;
        });
    }

    /**
     * Draws object on canvas.
     * @param {CanvasRenderingContext2D} ctx
     * @returns {void}
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

    /**
     * Plays animation once without endless looping.
     * Important for jump animations.
     *
     * @param {string[]} images
     * @returns {void}
     */
    playAnimationOnce(images) {

        if (this.currentImage >= images.length) {
            return;
        }

        let path = images[this.currentImage];

        this.img = this.imageCache[path];

        if (!this.img) {

            this.img = new Image();

            this.img.src = path;

            this.imageCache[path] = this.img;
        }

        this.currentImage++;
    }

    /**
     * Resets animation frame counter.
     * @returns {void}
     */
    resetAnimation() {

        this.currentImage = 0;
    }
}