class World {

    character = new Character();
    level = level1;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    statusBar = new StatusBar();

    constructor(canvas, keyboard) {

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;

        this.setWorld();
        this.run();
        this.draw();

    }

    setWorld() {

        this.character.world = this;

    }

    run() {

        setInterval(() => {

            this.checkCollisions();

        }, 200);

    }

    checkCollisions() {

        this.level.enemies.forEach((enemy) => {

            if (this.character.isColliding(enemy)) {

                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);

                console.log("Collision detected");

            }

        });

    }

    draw() {

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);

        this.ctx.restore();

        this.addToMap(this.statusBar);

        requestAnimationFrame(() => this.draw());

    }

    addObjectsToMap(objects) {

        objects.forEach(o => {
            this.addToMap(o);
        });

    }

    addToMap(mo) {

        if (mo.otherDirection) {

            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;

        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {

            mo.x = mo.x * -1;
            this.ctx.restore();

        }

    }

}