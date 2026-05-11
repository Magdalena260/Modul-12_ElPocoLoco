/**
 * StatusBar
 * Displays a visual status indicator (health, coins, bottles, boss health).
 */
class StatusBar extends DrawableObject {

    percentage = 100;

    constructor(images, x, y) {
        super();

        this.images = images;
        this.loadImages(images);

        this.x = x;
        this.y = y;

        this.width = 200;
        this.height = 60;

        this.setPercentage(100);
    }

    setPercentage(p) {
        this.percentage = p;

        let path = this.images[this.resolve()];

        if (this.imageCache && this.imageCache[path]) {
            this.img = this.imageCache[path];
        }
    }

    resolve() {
        if (this.percentage >= 100) return 5;
        if (this.percentage > 80) return 4;
        if (this.percentage > 60) return 3;
        if (this.percentage > 40) return 2;
        if (this.percentage > 20) return 1;
        return 0;
    }
}