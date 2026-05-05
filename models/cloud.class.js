class Cloud extends MovableObject {

    y = 20;
    width = 500;
    height = 250;

    speed = 0.15;

    constructor() {

        super();

        this.loadImage(
            'img/5_background/layers/4_clouds/1.png'
        );

        // Wolken starten sichtbar
        this.x = Math.random() * 712 * 2;

        this.animate();
    }

    animate() {

        setInterval(() => {

            this.moveLeft();

            // wenn links raus → wieder rechts rein
            if (this.x < -500) {

                this.x = 712 * 3;

            }

        }, 1000 / 60);

    }
}