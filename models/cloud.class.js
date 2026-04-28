class Cloud extends MovableObject {

    y = 50;
    width = 500;
    height = 200;
    speed = 0.2;

    constructor() {
        super();

        this.loadImage('img/5_background/layers/4_clouds/1.png');

        // ☁️ WICHTIG: Start über GANZEN sichtbaren + späteren Bereich verteilen
        this.x = Math.random() * 3000 - 500;

        this.animate();
    }

    animate() {

        setInterval(() => {

            this.x -= this.speed;

            // ☁️ Endlos-Loop (kommt wieder von rechts rein)
            if (this.x < -600) {
                this.x = 3000;
            }

        }, 1000 / 60);
    }
}