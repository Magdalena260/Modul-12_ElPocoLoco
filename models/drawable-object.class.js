<<<<<<< HEAD
class DrawableObject {

    img;
    imageCache = {};
    currentImage = 0;

    x = 0;
    y = 0;
    width = 100;
    height = 100;

=======
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
>>>>>>> aa281ad (Update)
    loadImage(path) {

        this.img = new Image();
        this.img.src = path;

    }

<<<<<<< HEAD
=======
    /**
     * Loads multiple images into cache.
     * @param {string[]} arr
     * @returns {void}
     */
>>>>>>> aa281ad (Update)
    loadImages(arr) {

        arr.forEach(path => {

            let img = new Image();

            img.src = path;

            this.imageCache[path] = img;

        });

    }

<<<<<<< HEAD
=======
    /**
     * Draws object on canvas.
     * @param {CanvasRenderingContext2D} ctx
     * @returns {void}
     */
>>>>>>> aa281ad (Update)
    draw(ctx) {

        if (!this.img) return;
        if (!this.img.complete) return;
        if (this.img.naturalWidth === 0) return;

        ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        );

    }

<<<<<<< HEAD
=======
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
>>>>>>> aa281ad (Update)
}