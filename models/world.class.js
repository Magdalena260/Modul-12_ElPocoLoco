class World {

    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    character;
    level;

    statusBar = new StatusBar();

    constructor(canvas, keyboard) {

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;

        this.character = new Character();
        this.level = level1;

        this.character.world = this;

        this.draw();
        this.checkCollisionsLoop();
    }

    checkCollisionsLoop() {
        setInterval(() => {

            this.level.enemies.forEach(enemy => {

                if (this.character.isColliding(enemy)) {

                    if (this.character.speedY < 0) {
                        enemy.energy = 0;
                    } else {
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                    }
                }
            });

        }, 200);
    }

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);

        this.addObjects(this.level.backgroundObjects);
        this.addObjects(this.level.clouds);
        this.addObjects(this.level.enemies);

        this.addToMap(this.character);

        this.ctx.restore();

        this.addToMap(this.statusBar);

        requestAnimationFrame(() => this.draw());
    }

    addObjects(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    addToMap(mo) {
        if (!mo) return;
        mo.draw(this.ctx);
    }
}