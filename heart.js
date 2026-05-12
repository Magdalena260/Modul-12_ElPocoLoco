class Heart extends MovableObject {

    height = 30;
    width = 30;

    y = 320;

    collected = false;

    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
    };

    constructor(x, y = 320) {
        super();

        this.x = x;
        this.y = y;

        this.loadImage('img/heart_red.png');
    }

    /**
     * Optional: simple float animation (safe, no breaking changes)
     */
    animate() {

        let direction = 1;

        setInterval(() => {

            if (this.collected) return;

            // small floating effect
            this.y += direction * 0.3;

            if (this.y > 330) direction = -1;
            if (this.y < 310) direction = 1;

        }, 1000 / 60);
    }
}