class DrawableObject {

    img;
    imageCache = {};
    currentImage = 0;

    x = 0;
    y = 0;
    width = 100;
    height = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        if (!this.img) return;
        if (!this.img.complete) return;
        if (this.img.naturalWidth === 0) return;

        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}